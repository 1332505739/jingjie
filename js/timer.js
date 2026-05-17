/* ============================================
   静界 · 实修计时器
   Web Audio 企口声 | 倒计时 | 三模式 | localStorage
   ============================================ */

(function() {
  'use strict';

  // ========== Audio Engine: 企口声合成 ==========
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playWoodenFish(when, count, interval) {
    var ctx = ensureAudio();
    if (!ctx) return;
    count = count || 1;
    interval = interval || 0.8;
    for (var i = 0; i < count; i++) {
      var t = ctx.currentTime + (when || 0) + i * interval;
      woodSingle(ctx, t, i === count - 1 ? 1 : 0.6);
    }
  }

  function woodSingle(ctx, t, vol) {
    // Short percussive hit — 企口声模拟
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(800, t);
    o.frequency.exponentialRampToValueAtTime(200, t + 0.12);
    g.gain.setValueAtTime(vol * 0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.3);
    // Add a subtle noise click for wood texture
    var buf = ctx.createBuffer(1, ctx.sampleRate * 0.02, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.003)) * vol * 0.25;
    }
    var noise = ctx.createBufferSource();
    var ng = ctx.createGain();
    noise.buffer = buf;
    ng.gain.setValueAtTime(vol * 0.3, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    noise.connect(ng);
    ng.connect(ctx.destination);
    noise.start(t);
  }

  function playTempleBell(ctx, t, vol) {
    // Low sustained bell for session end
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(180, t + 1.5);
    g.gain.setValueAtTime(vol * 0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + 3);

    var o2 = ctx.createOscillator();
    var g2 = ctx.createGain();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(440, t);
    o2.frequency.exponentialRampToValueAtTime(360, t + 2);
    g2.gain.setValueAtTime(vol * 0.15, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
    o2.connect(g2);
    g2.connect(ctx.destination);
    o2.start(t);
    o2.stop(t + 3);
  }

  // ========== Timer State ==========
  var state = {
    mode: 'buddhist',
    totalSeconds: 15 * 60,
    remaining: 15 * 60,
    running: false,
    startTime: null,
    pausedAt: null,
    completed: false,
    intervalId: null
  };

  // ========== Mode config ==========
  var modes = {
    buddhist: {
      name: '禅坐',
      icon: '☸',
      desc: '闭目静坐，观息出入。不计时间长短，只在每一息中安住。',
      presets: [15, 20, 30, 45]
    },
    daoist: {
      name: '站桩/吐纳',
      icon: '☯',
      desc: '松腰敛臀，气沉丹田。站桩如松，吐纳如潮。',
      presets: [5, 10, 15, 20]
    },
    confucian: {
      name: '省身',
      icon: '📜',
      desc: '吾日三省吾身。静坐反思今日所言所行，诚于中，形于外。',
      presets: [5, 10, 15]
    }
  };

  // ========== DOM refs ==========
  function $(id) { return document.getElementById(id); }

  var el = {
    circle: $('timerCircle'),
    display: $('timerDisplay'),
    label: $('timerLabel'),
    progress: $('timerProgress'),
    btnStart: $('btnStart'),
    btnReset: $('btnReset'),
    btnSkip: $('btnSkip'),
    modeDesc: $('modeDesc'),
    summary: $('sessionSummary'),
    summaryMode: $('summaryMode'),
    summaryDuration: $('summaryDuration'),
    summaryToday: $('summaryToday'),
    summaryStreak: $('summaryStreak'),
    streakBadge: $('streakBadge')
  };

  var CIRCUMFERENCE = 2 * Math.PI * 120; // ≈ 754

  // ========== Render ==========
  function fmtTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function updateDisplay() {
    var s = state.remaining;
    el.display.textContent = fmtTime(s);
    var pct = s / state.totalSeconds;
    el.progress.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);

    if (state.completed) {
      el.label.textContent = '修行圆满 ✦';
      el.circle.classList.remove('running', 'paused');
      el.circle.classList.add('finished');
    } else if (state.running) {
      el.label.textContent = '修行中…';
      el.circle.classList.add('running');
      el.circle.classList.remove('paused', 'finished');
    } else if (state.remaining < state.totalSeconds) {
      el.label.textContent = '已暂停';
      el.circle.classList.add('paused');
      el.circle.classList.remove('running', 'finished');
    } else {
      el.label.textContent = '准备开始';
      el.circle.classList.remove('running', 'paused', 'finished');
    }
  }

  function updateControls() {
    if (state.completed) {
      el.btnStart.textContent = '▶';
      el.btnStart.classList.remove('primary');
      el.btnStart.style.width = '48px'; el.btnStart.style.height = '48px'; el.btnStart.style.fontSize = '1.2rem';
      el.btnSkip.style.display = 'none';
    } else if (state.running) {
      el.btnStart.textContent = '⏸';
      el.btnStart.classList.add('primary');
      el.btnStart.style.width = '56px'; el.btnStart.style.height = '56px'; el.btnStart.style.fontSize = '1.4rem';
      el.btnSkip.style.display = '';
    } else {
      el.btnStart.textContent = '▶';
      el.btnStart.classList.add('primary');
      el.btnStart.style.width = '56px'; el.btnStart.style.height = '56px'; el.btnStart.style.fontSize = '1.4rem';
      el.btnSkip.style.display = state.remaining < state.totalSeconds ? '' : 'none';
    }
  }

  function renderAll() { updateDisplay(); updateControls(); updateStreakBadge(); }

  // ========== Timer Logic ==========
  function tick() {
    if (!state.running) return;
    var elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    state.remaining = Math.max(0, state.totalSeconds - elapsed);
    updateDisplay();

    // 1-minute warning: gentle fish tap
    if (state.totalSeconds - elapsed === 60) {
      playWoodenFish(0, 1);
    }

    if (state.remaining <= 0) finish();
  }

  function start() {
    if (state.completed) { reset(); return; }
    if (!state.running) {
      // Resume audio context
      ensureAudio();
      state.running = true;
      if (state.pausedAt !== null) {
        state.startTime = Date.now() - ((state.totalSeconds - state.remaining) * 1000);
      } else {
        state.startTime = Date.now();
      }
      // Initial fish — 3 taps to mark the start
      playWoodenFish(0.1, 3, 0.7);
      state.intervalId = setInterval(tick, 250);
      tick();
    } else {
      pause();
    }
    updateControls();
    updateDisplay();
  }

  function pause() {
    state.running = false;
    state.pausedAt = Date.now();
    if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
    updateControls();
    updateDisplay();
  }

  function finish() {
    state.running = false;
    state.remaining = 0;
    state.completed = true;
    if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
    updateDisplay();
    updateControls();
    // End sound: wooden fish + bell
    playWoodenFish(0, 1, 0);
    playTempleBell(ensureAudio(), 0.3, 1);
    saveSession();
    showSummary();
  }

  function reset() {
    state.running = false;
    state.completed = false;
    state.remaining = state.totalSeconds;
    state.startTime = null;
    state.pausedAt = null;
    if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
    el.summary.classList.remove('visible');
    renderAll();
  }

  function skip() {
    // Mark remaining time as skipped, record what was done
    if (state.running) {
      var elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      state.remaining = state.totalSeconds - elapsed;
      pause();
    }
    // Complete with current elapsed
    state.completed = true;
    if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
    updateDisplay();
    updateControls();
    var actualMin = Math.max(1, Math.floor((state.totalSeconds - state.remaining) / 60));
    playWoodenFish(0, 1);
    saveSession(actualMin);
    showSummary(actualMin);
    el.circle.classList.add('finished');
    el.label.textContent = '提前结束 · ' + actualMin + '分钟';
  }

  // ========== Storage ==========
  function getSessions() {
    try { return JSON.parse(localStorage.getItem('jingjie-sessions') || '[]'); } catch(e) { return []; }
  }

  function saveSession(actualMin) {
    var sessions = getSessions();
    var d = new Date();
    var dur = actualMin || Math.floor(state.totalSeconds / 60);
    sessions.push({
      date: d.toISOString().slice(0, 10),
      mode: state.mode,
      duration: dur,
      completed: state.totalSeconds - state.remaining >= state.totalSeconds * 0.5,
      ts: d.toISOString()
    });
    // Keep last 365 sessions
    if (sessions.length > 365) sessions = sessions.slice(-365);
    try { localStorage.setItem('jingjie-sessions', JSON.stringify(sessions)); } catch(e) {}
  }

  function getStreak() {
    var sessions = getSessions();
    if (!sessions.length) return 0;
    var days = new Set();
    sessions.forEach(function(s) { if (s.completed) days.add(s.date); });
    var sorted = Array.from(days).sort().reverse();
    if (!sorted.length) return 0;

    var today = new Date().toISOString().slice(0, 10);
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    // Check if today or yesterday has a session to maintain streak
    if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

    var streak = 0;
    var check = new Date(sorted[0] + 'T00:00:00');
    for (var i = 0; i < sorted.length; i++) {
      var expected = new Date(check.getTime() - i * 86400000).toISOString().slice(0, 10);
      if (sorted.indexOf(expected) !== -1) streak++;
      else break;
    }
    return streak;
  }

  function getTodayCount() {
    var today = new Date().toISOString().slice(0, 10);
    return getSessions().filter(function(s) { return s.date === today && s.completed; }).length;
  }

  function updateStreakBadge() {
    var s = getStreak();
    if (el.streakBadge) el.streakBadge.textContent = '🔥 连续 ' + s + ' 天';
  }

  function showSummary(actualMin) {
    var dur = actualMin || Math.floor(state.totalSeconds / 60);
    el.summaryMode.textContent = modes[state.mode].icon + ' ' + modes[state.mode].name + ' · ' + dur + ' 分钟';
    el.summaryDuration.textContent = dur + '分';
    el.summaryToday.textContent = getTodayCount();
    el.summaryStreak.textContent = getStreak() + '天';
    el.summary.classList.add('visible');
    updateStreakBadge();
  }

  // ========== Events ==========
  function setMode(mode) {
    state.mode = mode;
    state.totalSeconds = modes[mode].presets[0] * 60;
    state.remaining = state.totalSeconds;
    state.completed = false;
    state.running = false;
    state.startTime = null;
    state.pausedAt = null;
    if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
    el.modeDesc.textContent = modes[mode].desc;
    el.summary.classList.remove('visible');
    renderPresets(mode);
    renderAll();
  }

  function renderPresets(mode) {
    var presetsEl = $('durationPresets');
    var presets = modes[mode].presets;
    presetsEl.innerHTML = presets.map(function(m, i) {
      return '<button class="duration-btn' + (i === 0 ? ' active' : '') + '" data-min="' + m + '">' + m + '分</button>';
    }).join('');
    bindPresetClicks();
  }

  function bindPresetClicks() {
    $('durationPresets').querySelectorAll('[data-min]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        $('durationPresets').querySelectorAll('.duration-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.totalSeconds = parseInt(btn.dataset.min) * 60;
        state.remaining = state.totalSeconds;
        state.completed = false;
        state.running = false;
        state.startTime = null;
        state.pausedAt = null;
        if (state.intervalId) { clearInterval(state.intervalId); state.intervalId = null; }
        el.summary.classList.remove('visible');
        renderAll();
      });
    });
  }

  // Mode tabs
  $('modeTabs').querySelectorAll('.mode-tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      $('modeTabs').querySelectorAll('.mode-tab').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      setMode(btn.dataset.mode);
    });
  });

  // Timer controls
  el.btnStart.addEventListener('click', start);
  el.btnReset.addEventListener('click', reset);
  el.btnSkip.addEventListener('click', skip);

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); start(); }
    if (e.key === 'Escape') { e.preventDefault(); reset(); }
    if (e.key === 'ArrowRight' && !state.running && !state.completed) {
      e.preventDefault();
      state.remaining = Math.max(60, state.remaining - 60);
      state.totalSeconds = state.remaining;
      renderAll();
    }
    if (e.key === 'ArrowLeft' && !state.running && !state.completed) {
      e.preventDefault();
      state.remaining = Math.min(7200, state.remaining + 60);
      state.totalSeconds = state.remaining;
      renderAll();
    }
  });

  // ========== Init ==========
  bindPresetClicks();
  renderAll();
  el.progress.style.strokeDashoffset = '0';

})();
