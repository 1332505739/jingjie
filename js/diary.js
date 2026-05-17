/* ============================================
   静界 · 修行日记
   localStorage 存写 | 逐日打卡 | 月度回顾
   ============================================ */

(function() {
  'use strict';

  // ========== Storage ==========
  function getEntries() {
    try { return JSON.parse(localStorage.getItem('jingjie-diary') || '[]'); } catch(e) { return []; }
  }
  function saveEntries(entries) {
    try { localStorage.setItem('jingjie-diary', JSON.stringify(entries)); } catch(e) {}
  }
  function getSessions() {
    try { return JSON.parse(localStorage.getItem('jingjie-sessions') || '[]'); } catch(e) { return []; }
  }

  // ========== Helpers ==========
  function todayStr() { return new Date().toISOString().slice(0,10); }
  function fmtDate(d) { var p=d.split('-'); return p[1]+'月'+parseInt(p[2])+'日'; }

  var $ = function(id) { return document.getElementById(id); };

  // ========== State ==========
  var calendarMonth = new Date().getMonth();
  var calendarYear = new Date().getFullYear();
  var selectedMood = '😌';

  // ========== Mood ==========
  var moodMap = { '😌':'平静', '😊':'愉悦', '🤔':'思考', '😤':'挣扎', '😶':'空灵' };

  $('moodBtns').querySelectorAll('.mood-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      $('moodBtns').querySelectorAll('.mood-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      selectedMood = btn.dataset.mood;
    });
  });

  // ========== Save Entry ==========
  $('btnSaveEntry').addEventListener('click', function() {
    var text = $('entryText').value.trim();
    if (!text) return;
    var entries = getEntries();
    entries.unshift({
      date: todayStr(),
      mood: selectedMood,
      text: text,
      ts: new Date().toISOString()
    });
    saveEntries(entries);
    $('entryText').value = '';
    if (window.a11yAnnounce) window.a11yAnnounce('心得已保存');
    renderAll();
  });

  // ========== Delete Entry ==========
  function deleteEntry(index) {
    var entries = getEntries();
    entries.splice(index, 1);
    saveEntries(entries);
    renderAll();
  }

  // ========== Stats ==========
  function calcStats() {
    var sessions = getSessions();
    var entries = getEntries();
    var now = new Date();
    var m = now.getMonth();
    var y = now.getFullYear();
    var monthSessions = sessions.filter(function(s) {
      var d = new Date(s.date + 'T00:00:00');
      return s.completed && d.getFullYear() === y && d.getMonth() === m;
    });
    var monthMinutes = monthSessions.reduce(function(sum, s) { return sum + (s.duration || 0); }, 0);
    var monthEntries = entries.filter(function(e) {
      var d = new Date(e.date + 'T00:00:00');
      return d.getFullYear() === y && d.getMonth() === m;
    }).length;

    // Streak from timer sessions
    var days = new Set();
    sessions.forEach(function(s) { if (s.completed) days.add(s.date); });
    var sorted = Array.from(days).sort().reverse();
    var streak = 0;
    if (sorted.length) {
      var today = todayStr();
      var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
      if (sorted[0] === today || sorted[0] === yesterday) {
        var check = new Date(sorted[0] + 'T00:00:00');
        for (var i = 0; i < sorted.length; i++) {
          var exp = new Date(check.getTime() - i * 86400000).toISOString().slice(0,10);
          if (sorted.indexOf(exp) !== -1) streak++;
          else break;
        }
      }
    }

    $('statStreak').textContent = streak;
    $('statSessions').textContent = monthSessions.length;
    $('statMinutes').textContent = monthMinutes;
    $('statEntries').textContent = monthEntries;

    // Monthly breakdown
    var modeCount = {};
    monthSessions.forEach(function(s) {
      var m = s.mode || 'buddhist';
      modeCount[m] = (modeCount[m] || 0) + 1;
    });
    var modeMap = { buddhist:'☸ 禅坐', daoist:'☯ 站桩/吐纳', confucian:'📜 省身' };
    var breakdownHtml = '';
    if (Object.keys(modeCount).length === 0) {
      breakdownHtml = '<p style="font-size:.85rem;color:var(--text-tertiary);">本月尚无实修记录</p>';
    } else {
      breakdownHtml = Object.keys(modeCount).map(function(k) {
        return '<div class="breakdown-item"><span>' + (modeMap[k] || k) + '</span><span style="color:var(--gold);">' + modeCount[k] + ' 次</span></div>';
      }).join('');
      breakdownHtml += '<div class="breakdown-item"><span>合计</span><span style="color:var(--gold);">' + monthMinutes + ' 分钟</span></div>';
    }
    $('monthlyBreakdown').innerHTML = breakdownHtml;
  }

  // ========== Calendar ==========
  var dayNames = ['日','一','二','三','四','五','六'];

  function renderCalendar() {
    $('monthTitle').textContent = calendarYear + '年' + (calendarMonth + 1) + '月';
    var sessions = getSessions();
    var entries = getEntries();
    var sessionDates = new Set();
    var entryDates = new Set();
    sessions.forEach(function(s) { if (s.completed) sessionDates.add(s.date); });
    entries.forEach(function(e) { entryDates.add(e.date); });

    var firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    var daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    var today = todayStr();

    var html = '';
    for (var i = 0; i < firstDay; i++) html += '<div class="calendar-day empty"></div>';
    for (var d = 1; d <= daysInMonth; d++) {
      var ds = calendarYear + '-' + String(calendarMonth + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      var classes = ['calendar-day'];
      if (ds === today) classes.push('today');
      if (entryDates.has(ds)) classes.push('has-entry');
      else if (sessionDates.has(ds)) classes.push('has-session');
      html += '<div class="' + classes.join(' ') + '" data-date="' + ds + '" title="' + ds + '">' + d + '</div>';
    }
    $('calendarGrid').innerHTML = html;

    // Click on a day to see entries
    $('calendarGrid').querySelectorAll('.calendar-day:not(.empty)').forEach(function(el) {
      el.addEventListener('click', function() {
        filterEntriesByDate(el.dataset.date);
      });
    });
  }

  function filterEntriesByDate(date) {
    var entries = getEntries().filter(function(e) { return e.date === date; });
    var sessions = getSessions().filter(function(s) { return s.date === date && s.completed; });
    if (entries.length === 0 && sessions.length === 0) return;

    // Highlight in list
    renderEntries(date);
  }

  // ========== Entries ==========
  function renderEntries(filterDate) {
    var entries = getEntries();
    var sessions = getSessions();
    var modeMap = { buddhist:'☸ 禅坐', daoist:'☯ 站桩/吐纳', confucian:'📜 省身' };

    if (filterDate) {
      entries = entries.filter(function(e) { return e.date === filterDate; });
    } else {
      entries = entries.slice(0, 30); // last 30 entries
    }

    if (entries.length === 0) {
      $('entriesList').innerHTML = '<div class="glass empty-state" style="padding:2rem;text-align:center;border-radius:var(--radius-lg);">' +
        '<div class="empty-icon">📝</div><h3>还没有修行日记</h3>' +
        '<p style="color:var(--text-secondary);margin-top:.5rem;">写下第一次修行心得吧。文字是另一种修行。</p></div>';
      return;
    }

    $('entriesList').innerHTML = entries.map(function(e, i) {
      var daySessions = sessions.filter(function(s) { return s.date === e.date && s.completed; });
      var sessionTags = daySessions.length ? '<span class="diary-entry-mode">' + daySessions.map(function(s) { return modeMap[s.mode] || s.mode; }).join(' + ') + '</span>' : '';
      return '<div class="diary-entry fade-in visible" style="cursor:pointer;position:relative;">' +
        '<div class="diary-entry-header">' +
          '<span class="diary-entry-date">' + fmtDate(e.date) + ' <span class="diary-entry-mood">' + e.mood + '</span></span>' +
          '<div style="display:flex;gap:.5rem;align-items:center;">' + sessionTags +
          '<button class="btn-timer" style="width:28px;height:28px;font-size:.7rem;" data-del="' + i + '" title="删除">✕</button></div>' +
        '</div>' +
        '<div class="diary-entry-body">' + e.text.replace(/\n/g, '<br>').replace(/</g, '&lt;') + '</div>' +
      '</div>';
    }).join('');

    $('entriesList').querySelectorAll('[data-del]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = getEntries().findIndex(function(en) {
          return en.date === entries[parseInt(btn.dataset.del)].date && en.text === entries[parseInt(btn.dataset.del)].text;
        });
        if (idx >= 0 && confirm('确定删除这条日记？')) deleteEntry(idx);
      });
    });
  }

  // ========== Navigation ==========
  $('btnPrevMonth').addEventListener('click', function() {
    if (calendarMonth === 0) { calendarMonth = 11; calendarYear--; }
    else calendarMonth--;
    renderCalendar();
  });
  $('btnNextMonth').addEventListener('click', function() {
    if (calendarMonth === 11) { calendarMonth = 0; calendarYear++; }
    else calendarMonth++;
    renderCalendar();
  });

  // ========== Init ==========
  function renderAll() {
    calcStats();
    renderCalendar();
    renderEntries();
  }

  renderAll();

})();
