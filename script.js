(function () {
  'use strict';

  // ========================================
  // 검색: 엔터 키로 티스토리 검색 URL 이동
  // ========================================
  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) {
        window.location.href = window.location.origin + '/search/' + encodeURIComponent(this.value.trim());
      }
    });
  }

  // ========================================
  // 모바일 사이드바 토글
  // ========================================
  var menuBtn = document.getElementById('mobile-menu-btn');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('translate-x-0');
    if (overlay) overlay.classList.remove('hidden');
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('translate-x-0');
    if (overlay) overlay.classList.add('hidden');
  }

  if (menuBtn) menuBtn.addEventListener('click', openSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // ========================================
  // 맨 위로 버튼
  // ========================================
  var scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  // 라이트/다크 모드 토글
  // ========================================
  var themeToggle = document.getElementById('theme-toggle');
  var iconSun = document.getElementById('icon-sun');
  var iconMoon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      if (iconSun) iconSun.classList.remove('hidden');
      if (iconMoon) iconMoon.classList.add('hidden');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      if (iconSun) iconSun.classList.add('hidden');
      if (iconMoon) iconMoon.classList.remove('hidden');
    }
  }

  // 저장된 테마 복원 (기본: dark)
  applyTheme(localStorage.getItem('theme') || 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ========================================
  // 목차 자동 생성 (TOC)
  // ========================================
  var tocContainer = document.getElementById('toc-container');
  var tocNav = document.getElementById('toc-nav');

  if (tocContainer && tocNav) {
    var articleContent = document.querySelector('.article-content');
    if (articleContent) {
      var headings = articleContent.querySelectorAll('h2, h3');
      if (headings.length > 1) {
        var fragment = document.createDocumentFragment();
        headings.forEach(function (heading, idx) {
          heading.id = 'toc-heading-' + idx;
          var a = document.createElement('a');
          a.href = '#toc-heading-' + idx;
          a.textContent = heading.textContent.replace(/^#\s*/, '');
          a.className = heading.tagName === 'H2'
            ? 'block text-gray-300 hover:text-accent transition-colors py-0.5'
            : 'block text-gray-400 hover:text-accent transition-colors py-0.5 pl-4';
          fragment.appendChild(a);
        });
        tocNav.appendChild(fragment);
        tocContainer.style.display = '';
      }
    }
  }


  // ========================================
  // 카테고리 페이지 헤더
  // ========================================
  var categoryMatch = window.location.pathname.match(/\/category\/(.+)/);
  if (categoryMatch) {
    var categoryHeader = document.getElementById('category-page-header');
    var categoryNameEl = document.getElementById('category-name-display');
    if (categoryHeader) categoryHeader.style.display = '';
    if (categoryNameEl) categoryNameEl.textContent = decodeURIComponent(categoryMatch[1]);
  }

})();
