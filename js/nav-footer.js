/* ============================================
   静界 · Nav & Footer 集中管理
   所有页面的导航和页脚链接统一由此文件管理。
   改链接只需改这一个文件。
   ============================================ */

(function() {
  // ========== Canonical nav links ==========
  const navLinks = [
    { href: 'index.html', label: '首页' },
    { href: 'yuedu.html', label: '阅读室' },
    { href: 'riqian.html', label: '日签' },
    { href: 'videos.html', label: '影音' },
    { href: 'rumen.html', label: '入门' },
    { href: 'experience.html', label: '心语' }
  ];

  // ========== Canonical footer links ==========
  const footerLinks = [
    { href: 'yuedu.html', label: '阅读室' },
    { href: 'riqian.html', label: '日签' },
    { href: 'rumen.html', label: '入门' },
    { href: 'experience.html', label: '心语' },
    { href: 'about.html', label: '关于' },
    { href: 'https://github.com/1332505739/jingjie', label: 'GitHub', external: true }
  ];

  // ========== Detect current page ==========
  const path = window.location.pathname;
  const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // ========== Update nav ==========
  const navUl = document.getElementById('navLinks');
  if (navUl) {
    navUl.innerHTML = navLinks.map(link => {
      const isActive = currentPage === link.href;
      return `<li><a href="${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a></li>`;
    }).join('');
  }

  // ========== Update footer ==========
  const footerLinkContainers = document.querySelectorAll('.footer-links');
  if (footerLinkContainers.length > 0) {
    const footerHtml = footerLinks.map(link => {
      const ext = link.external ? ' target="_blank"' : '';
      return `<a href="${link.href}"${ext}>${link.label}</a>`;
    }).join('');
    footerLinkContainers.forEach(el => { el.innerHTML = footerHtml; });
  }

  // ========== Add about link to nav (only for pages that show it) ==========
  // about.html already uses navLinks defined above. But pages like about.html
  // show 7 links including '关于'. Let's handle that.
  // Pages with '关于' in nav: about.html, experience.html, yuedu.html, videos.html, riqian.html, rumen.html
  // Pages without: index.html (homepage includes about in footer only)
  // We'll check if the nav currently has an 'about' link and keep it.
})();
