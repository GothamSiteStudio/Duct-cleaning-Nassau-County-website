document.addEventListener('DOMContentLoaded', function () {

  /* ===== Mobile Menu Toggle ===== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  function closeMenu() {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  function openMenu() {
    navMenu.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Focus first link inside menu
    var firstLink = navMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Focus trap inside mobile menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      // Include the menu toggle button in the trap
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        menuToggle.focus();
      }
    });

    // When on toggle button and tab forward, go into menu
    menuToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey && navMenu.classList.contains('active')) {
        e.preventDefault();
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  }

  /* ===== Header Scroll Shadow ===== */
  const header = document.getElementById('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 60) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* ===== Smooth Scroll for Anchor Links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ===== Scroll Reveal Animation ===== */
  var revealElements = document.querySelectorAll('.service-card, .health-card, .review-card, .area-group, .faq-item');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  }
});
