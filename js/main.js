// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav a, .services-trigger').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Services slide panel
  const trigger = document.querySelector('.services-trigger');
  const panel = document.getElementById('servicesPanel');
  const overlay = document.getElementById('servicesOverlay');
  const closeBtn = document.getElementById('servicesPanelClose');

  function openPanel() {
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', openPanel);
  if (closeBtn) closeBtn.addEventListener('click', closePanel);
  if (overlay) overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePanel();
  });

  // Header shadow on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Active nav highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // Fade-in animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Counter animation for stats
  const counters = document.querySelectorAll('.stat-item h3');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;
    const increment = target / 30;
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    const observer2 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer2.disconnect();
      }
    });
    observer2.observe(counter);
  });
});

// Carbon Calculator
function calculateCarbon() {
  const electricity = parseFloat(document.getElementById('electricity')?.value) || 0;
  const gas = parseFloat(document.getElementById('gas')?.value) || 0;
  const travel = parseFloat(document.getElementById('travel')?.value) || 0;
  const waste = parseFloat(document.getElementById('waste')?.value) || 0;

  const result = (electricity * 0.5) + (gas * 2.3) + (travel * 0.12) + (waste * 0.6);
  const tonnes = (result / 1000).toFixed(2);

  const resultDiv = document.getElementById('calculator-result');
  const resultNumber = document.getElementById('result-number');
  const resultText = document.getElementById('result-text');

  if (resultDiv && resultNumber && resultText) {
    resultNumber.textContent = tonnes + ' tCO₂e';
    const trees = Math.ceil(parseFloat(tonnes) * 45);
    resultText.textContent = `Equivalent to planting approximately ${trees} trees to offset this annually.`;
    resultDiv.classList.remove('hidden');
  }
}
