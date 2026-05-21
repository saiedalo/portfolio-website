// nav.js — sticky nav scroll state + active link highlighting
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Sticky nav: add .nav-scrolled when hero is scrolled past
  var nav = document.getElementById('site-nav');
  var sentinel = document.getElementById('nav-sentinel');

  if (nav && sentinel && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        nav.classList.toggle('nav-scrolled', !entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    navObserver.observe(sentinel);
  } else if (nav) {
    // Fallback: listen to scroll
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Active nav link — match current page filename
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .site-nav__link--mobile').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });
});
