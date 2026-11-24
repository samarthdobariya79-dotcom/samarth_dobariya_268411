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


  /* ==========================================================================
     FEATURE 3: CONTACT FORM VALIDATION & INTERACTIVE FEEDBACK
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  function setError(inputElement, errorElementId, message) {
    const errorEl = document.getElementById(errorElementId);
    const parentGroup = inputElement ? inputElement.closest('.form-group') : null;

    if (errorEl) errorEl.textContent = message;
    if (parentGroup) parentGroup.classList.add('has-error');
  }

  function clearError(inputElement, errorElementId) {
    const errorEl = document.getElementById(errorElementId);
    const parentGroup = inputElement ? inputElement.closest('.form-group') : null;

    if (errorEl) errorEl.textContent = '';
    if (parentGroup) parentGroup.classList.remove('has-error');
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Real-time error clearance
  if (nameInput) nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));
  if (subjectInput) subjectInput.addEventListener('input', () => clearError(subjectInput, 'subject-error'));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, 'message-error'));

  // Form submission handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        setError(nameInput, 'name-error', 'Please enter your full name.');
        isValid = false;
      } else if (nameVal.length < 2) {
        setError(nameInput, 'name-error', 'Name must contain at least 2 characters.');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        setError(emailInput, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        setError(emailInput, 'email-error', 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectVal) {
        setError(subjectInput, 'subject-error', 'Please enter a subject or inquiry topic.');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        setError(messageInput, 'message-error', 'Please write your message.');
        isValid = false;
      } else if (messageVal.length < 10) {
        setError(messageInput, 'message-error', 'Message should be at least 10 characters long.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      // If validation fails
      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields correctly.';
        }
        return;
      }

      // If valid, simulate transmission
      if (submitBtn) {
        submitBtn.disabled = true;
        const textSpan = submitBtn.querySelector('.btn-text');
        if (textSpan) textSpan.textContent = 'Sending Message...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          const textSpan = submitBtn.querySelector('.btn-text');
          if (textSpan) textSpan.textContent = 'Send Message to Samarth';
        }

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = `Thank you, ${nameVal}! Your message has been sent to Samarth Dobariya. I will respond to ${emailVal} soon.`;
        }

        contactForm.reset();

        setTimeout(() => {
          if (formStatus) {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
          }
        }, 7000);
      }, 600);
    });
  }


  /* ==========================================================================
     FEATURE 4: SCROLLSPY (ACTIVE NAV HIGHLIGHT ON SCROLL)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 130;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
});
