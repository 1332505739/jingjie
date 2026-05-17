/* ============================================
   静界 · 环境音效
   Web Audio API: 雨声 / 溪流 / 钟声
   ============================================ */

(function() {
  'use strict';

  var audioCtx = null;
  function ctx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  var activeSounds = {};
  var gainNodes = {};

  // ========== Rain ==========
  function createRain() {
    var c = ctx();
    if (!c) return null;
    // Create a buffer of white-ish noise filtered to sound like rain
    var duration = 4;
    var sampleRate = c.sampleRate;
    var length = sampleRate * duration;
    var buffer = c.createBuffer(1, length, sampleRate);
    var data = buffer.getChannelData(0);
    // Rain: filtered noise with occasional louder drops
    for (var i = 0; i < length; i++) {
      var base = (Math.random() * 2 - 1) * 0.3;
      // Occasional drop
      if (Math.random() < 0.003) base += (Math.random() * 2 - 1) * 0.7;
      data[i] = base;
    }

    var source = c.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Low-pass filter to soften
    var filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 6000;
    filter.Q.value = 1;

    var gain = c.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    source.start();

    return { source: source, gain: gain, filter: filter };
  }

  // ========== Stream ==========
  function createStream() {
    var c = ctx();
    if (!c) return null;
    // Stream: filtered noise with modulation for burble
    var duration = 3;
    var sampleRate = c.sampleRate;
    var length = sampleRate * duration;
    var buffer = c.createBuffer(1, length, sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < length; i++) {
      // Modulate to create a gurgling effect
      var t = i / sampleRate;
      var mod = Math.sin(t * 2.5) * 0.3 + Math.sin(t * 5.7) * 0.15;
      data[i] = (Math.random() * 2 - 1) * (0.25 + mod * 0.5);
    }

    var source = c.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    var filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.7;

    var gain = c.createGain();
    gain.gain.value = 0;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    source.start();

    return { source: source, gain: gain, filter: filter };
  }

  // ========== Bell resonance ==========
  function createBellResonance() {
    var c = ctx();
    if (!c) return null;
    // Gentle sustained bell-like tone
    var duration = 8;
    var sampleRate = c.sampleRate;
    var length = sampleRate * duration;
    var buffer = c.createBuffer(1, length, sampleRate);
    var data = buffer.getChannelData(0);
    // Create a bell-like waveform: 3 partials that decay
    for (var i = 0; i < length; i++) {
      var t = i / sampleRate;
      var decay = Math.exp(-t * 0.15);
      data[i] =
        Math.sin(2 * Math.PI * 220 * t) * 0.4 +
        Math.sin(2 * Math.PI * 554 * t) * 0.15 +
        Math.sin(2 * Math.PI * 880 * t) * 0.08;
      data[i] *= decay;
      // Repeat every 8 seconds
      if (i >= sampleRate * 7.5) data[i] = 0;
    }

    var source = c.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    var gain = c.createGain();
    gain.gain.value = 0;

    source.connect(gain);
    gain.connect(c.destination);
    source.start();

    return { source: source, gain: gain };
  }

  // ========== Public API ==========
  var sounds = {
    rain: null,
    stream: null,
    bell: null
  };

  function fadeIn(gainNode, target, duration) {
    var c = ctx();
    if (!c) return;
    var now = c.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(target, now + duration);
  }

  function fadeOut(gainNode, duration) {
    var c = ctx();
    if (!c) return;
    var now = c.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
  }

  window.ambientSound = {
    start: function(name, vol) {
      vol = vol || 0.5;
      if (sounds[name]) {
        fadeIn(sounds[name].gain, vol, 2);
        return;
      }
      var s;
      if (name === 'rain') s = createRain();
      else if (name === 'stream') s = createStream();
      else if (name === 'bell') s = createBellResonance();
      if (!s) return;
      sounds[name] = s;
      fadeIn(s.gain, vol, 2);
    },
    stop: function(name) {
      if (!sounds[name]) return;
      fadeOut(sounds[name].gain, 1);
      var s = sounds[name];
      // Actually stop after fade
      setTimeout(function() {
        try { s.source.stop(); } catch(e) {}
      }, 1200);
      sounds[name] = null;
    },
    toggle: function(name, vol) {
      if (sounds[name]) {
        this.stop(name);
        return false;
      } else {
        this.start(name, vol);
        return true;
      }
    },
    stopAll: function() {
      for (var k in sounds) {
        if (sounds[k]) this.stop(k);
      }
    }
  };

})();
