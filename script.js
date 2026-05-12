/* ============================================================
   LEON HARTMANN – PORTFOLIO  |  script.js
   ============================================================ */

// --- NAV SCROLL EFFECT ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// --- MOBILE MENU TOGGLE ---
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile menu on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
  });
});

// --- REVEAL ON SCROLL ---
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = entry.target.closest('.projects-grid, .about-card-grid, .cert-grid, .edu-grid, .downloads-grid, .skills-grid, .about-stats');
      let delay = 0;
      if (siblings) {
        const all = Array.from(siblings.querySelectorAll('.reveal'));
        delay = all.indexOf(entry.target) * 80;
      }
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// --- LANGUAGE BARS ANIMATION ---
const langFills = document.querySelectorAll('.lang-fill');
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

langFills.forEach(bar => langObserver.observe(bar));

// --- CONTACT FORM SUBMIT ---
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('visible');
  e.target.querySelectorAll('input, textarea').forEach(f => f.value = '');
  setTimeout(() => success.classList.remove('visible'), 4000);
}

// --- SMOOTH ACTIVE NAV HIGHLIGHT ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--blue)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// --- SUBTLE HERO PARALLAX ---
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const blobs = hero.querySelectorAll('.hero-bg-blob');
    blobs.forEach((blob, i) => {
      blob.style.transform = `translateY(${scrolled * (i === 0 ? 0.15 : 0.08)}px)`;
    });
  }
}, { passive: true });
