// theme.js — loaded synchronously in <head> to prevent flash of wrong theme
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-theme';

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  function updateIcon(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var icon = btn.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln');
  }

  function toggle() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    apply(next);
    updateIcon(next);
  }

  // Apply immediately — before CSS renders — to prevent FOUC
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', function () {
    // Wire toggle button
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
    // Sync icon state
    updateIcon(document.documentElement.getAttribute('data-theme'));
  });

  // Expose for programmatic use if needed
  window.__themeToggle = toggle;
})();
