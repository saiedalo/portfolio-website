// main.js — scroll reveal + smooth scroll + contact form
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ---- Scroll Reveal ----
  var reveals = document.querySelectorAll('[data-reveal]');

  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
      // No IntersectionObserver support — just show everything
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // ---- Skill bar animation ----
  var skillFills = document.querySelectorAll('.skill-bar__fill');

  if (skillFills.length && 'IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    skillFills.forEach(function (fill) { skillObserver.observe(fill); });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Contact Form Validation ----
  var form = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      // Validate each required field
      form.querySelectorAll('[required]').forEach(function (field) {
        var isEmpty = field.value.trim() === '';
        field.classList.toggle('is-invalid', isEmpty);
        if (isEmpty) valid = false;
      });

      // Email format check
      var emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim() !== '') {
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
        if (!emailOk) {
          emailField.classList.add('is-invalid');
          valid = false;
        }
      }

      if (valid && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }
    });

    // Remove invalid state on input
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  }
});
