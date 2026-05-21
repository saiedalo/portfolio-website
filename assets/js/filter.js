// filter.js — project filter tabs (projekte.html only)
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var tabs  = document.querySelectorAll('[data-filter-btn]');
  var cards = document.querySelectorAll('[data-category]');

  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter-btn');

      // Update active tab
      tabs.forEach(function (t) { t.classList.remove('filter-btn--active'); });
      this.classList.add('filter-btn--active');

      // Show / hide cards
      cards.forEach(function (card) {
        var categories = card.getAttribute('data-category').split(' ');
        var match = filter === 'alle' || categories.indexOf(filter) !== -1;

        if (match) {
          card.style.display = '';
          // Trigger reflow so transition runs
          void card.offsetWidth;
          card.classList.remove('card-hidden');
        } else {
          card.classList.add('card-hidden');
          // Hide from layout after transition
          setTimeout(function () {
            if (card.classList.contains('card-hidden')) {
              card.style.display = 'none';
            }
          }, 320);
        }
      });
    });
  });
});
