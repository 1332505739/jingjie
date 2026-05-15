/* ============================================
   静界 · Realm of Stillness
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 0. Theme toggle
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('jingjie-theme');
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '☽';
  }

  // Toggle on click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'light') {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☽';
        localStorage.setItem('jingjie-theme', 'light');
      } else {
        html.removeAttribute('data-theme');
        themeToggle.textContent = '☀';
        localStorage.setItem('jingjie-theme', 'dark');
      }
    });
  }

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

// ==========================================
// 5. Scroll-to-top button
// ==========================================
(function() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', '回到顶部');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  let showTimeout;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ==========================================
// 6. Navbar smart hide/show on scroll
// ==========================================
(function() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const current = window.pageYOffset;
        if (current > 50) {
          navbar.classList.add('scrolled');
          if (current > lastScroll + 10 && current > 200) {
            navbar.classList.add('nav-hidden');
          } else if (current < lastScroll - 5) {
            navbar.classList.remove('nav-hidden');
          }
        } else {
          navbar.classList.remove('scrolled');
          navbar.classList.remove('nav-hidden');
        }
        lastScroll = current;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
