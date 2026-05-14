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
  // 4. Video data store (for dynamic population)
  // ==========================================
  // This is where you'll add your actual video entries.
  // When you have real videos, uncomment and populate this list.
  // 
  // const videoData = [
  //   {
  //     id: 1,
  //     title: '视频标题',
  //     description: '视频描述',
  //     category: 'meditation',
  //     date: '2026-05',
  //     thumbnail: 'path/to/thumbnail.jpg',
  //     url: 'https://...'
  //   },
  //   ...
  // ];
  //
  // function renderVideos(filter = 'all') {
  //   const grid = document.getElementById('videoGrid');
  //   if (!grid) return;
  //   
  //   const filtered = filter === 'all' 
  //     ? videoData 
  //     : videoData.filter(v => v.category === filter);
  //   
  //   grid.innerHTML = filtered.map(v => `
  //     <div class="glass video-card">
  //       <div class="video-thumb">
  //         <img src="${v.thumbnail}" alt="${v.title}" style="width:100%;height:100%;object-fit:cover;">
  //         <div class="play-button">▶</div>
  //       </div>
  //       <div class="video-info">
  //         <h3>${v.title}</h3>
  //         <p>${v.description}</p>
  //         <div class="video-meta">
  //           <span>${v.date}</span>
  //         </div>
  //       </div>
  //     </div>
  //   `).join('');
  // }
  //
  // // Filter buttons
  // document.querySelectorAll('[data-filter]').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     document.querySelectorAll('[data-filter]').forEach(b => {
  //       b.className = b.className.replace('btn-primary', 'btn-glass');
  //     });
  //     btn.className = btn.className.replace('btn-glass', 'btn-primary');
  //     renderVideos(btn.dataset.filter);
  //   });
  // });

});
