/* ============================================
   静界 · Realm of Stillness
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navbar scroll effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ==========================================
  // 2. Mobile menu toggle
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 3. Scroll reveal (Intersection Observer)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after reveal
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ==========================================
  // 4. Video data store & rendering
  // ==========================================
  const videoData = [
    // {id:1, title:'视频标题', description:'描述', category:'meditation', date:'2026-05', thumbnail:'', url:''},
  ];

  const videoGrid = document.getElementById('videoGrid');
  const videoEmpty = document.getElementById('videoEmptyState');
  const videoFilters = document.getElementById('videoFilters');

  function renderVideos(filter = 'all') {
    if (!videoGrid) return;

    const filtered = filter === 'all'
      ? videoData
      : videoData.filter(v => v.category === filter);

    // Toggle empty state vs videos
    if (filtered.length === 0) {
      if (videoEmpty) videoEmpty.style.display = '';
      if (videoFilters) videoFilters.style.display = 'none';
      videoGrid.innerHTML = '';
    } else {
      if (videoEmpty) videoEmpty.style.display = 'none';
      if (videoFilters) videoFilters.style.display = 'inline-flex';
      videoGrid.innerHTML = filtered.map(v => `
        <div class="glass video-card fade-in visible">
          <div class="video-thumb">
            ${v.thumbnail
              ? `<img src="${v.thumbnail}" alt="${v.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
              : `<span class="placeholder-icon">☸</span>`}
            <div class="play-button">▶</div>
          </div>
          <div class="video-info">
            <h3>${v.title}</h3>
            <p>${v.description}</p>
            <div class="video-meta">
              <span>${v.date}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Initialize videos page
  renderVideos('all');

  // Filter buttons
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-glass');
      });
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-glass');
      renderVideos(btn.dataset.filter);
    });
  });

});
