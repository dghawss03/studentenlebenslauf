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

// --- CONTACT FORM SUBMIT (Formspree) ---
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('formSuccess');
  const button = form.querySelector('button[type="submit"]');

  // Disable button while sending
  button.disabled = true;
  button.style.opacity = '0.7';

  try {
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success: show message, reset form
      success.classList.add('visible');
      form.reset();
      setTimeout(() => success.classList.remove('visible'), 5000);
    } else {
      // Formspree returned an error
      const json = await response.json().catch(() => ({}));
      const msg = (json.errors || []).map(err => err.message).join(', ') || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.';
      alert(msg);
    }
  } catch (err) {
    alert('Netzwerkfehler. Bitte prüfe deine Verbindung und versuche es erneut.');
  } finally {
    button.disabled = false;
    button.style.opacity = '';
  }
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
