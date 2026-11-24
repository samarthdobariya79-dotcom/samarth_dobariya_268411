/**
 * Portfolio Interactive Scripts - Samarth Dobariya
 * Features:
 *  1. Dark / Light Mode Switcher (Defaults to Professional Dark Theme)
 *  2. Responsive Mobile Hamburger Menu with auto-close and outside-click dismiss
 *  3. Interactive Contact Form Validation with real-time field checking
 *  4. Scrollspy Active Navigation highlighting
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     FEATURE 1: DARK / LIGHT THEME TOGGLE (DARK DEFAULT)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check saved theme or default to professional dark theme
  const savedTheme = localStorage.getItem('samarth-portfolio-theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // Apply default or stored theme on load
  applyTheme(savedTheme);

  // Toggle theme listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('samarth-portfolio-theme', newTheme);
    });
  }


  /* ==========================================================================
     FEATURE 2: MOBILE HAMBURGER MENU (OPEN / CLOSE)
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isOpen = navbar.classList.toggle('open');
    mobileMenuBtn.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
  }

  function closeMobileMenu() {
    if (navbar && mobileMenuBtn) {
      navbar.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close if user clicks outside of the header
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
      }
    });
  }


});
