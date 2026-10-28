(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-link');

  function closeMenu() {
    if (!menuButton || !navLinks) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navLinks?.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navAnchors.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = [...document.querySelectorAll('.portfolio-project-card')];
  const projectData = [{"name": "Natural Language Data Analyst", "category": "data", "kicker": "NATURAL LANGUAGE • DATA ANALYTICS", "description": "Explore datasets by asking questions in everyday language, making data analysis more approachable without needing to write every query manually."}, {"name": "Emoji Story Challenge", "category": "web", "kicker": "CREATIVE • INTERACTIVE GAME", "description": "A playful storytelling experience that turns emoji prompts into a creative challenge, encouraging users to interpret symbols and build their own stories."}, {"name": "Mini Netflix", "category": "web", "kicker": "WEB APP • ENTERTAINMENT", "description": "A compact movie-browsing experience inspired by streaming platforms, designed to make discovering and exploring titles simple and engaging."}, {"name": "English Every Day", "category": "web", "kicker": "LANGUAGE • DAILY PRACTICE", "description": "A learning experience focused on building a consistent English practice habit through small, approachable daily activities."}, {"name": "Guess the Movie", "category": "web", "kicker": "GAME • MOVIE TRIVIA", "description": "A movie-guessing game that challenges players to identify a film from clues and test their movie knowledge."}, {"name": "Hydro Buddy", "category": "web", "kicker": "WELLNESS • WATER TRACKER", "description": "A friendly hydration companion for tracking water intake, building daily streaks, and encouraging healthier drinking habits."}, {"name": "Fit Check Engine", "category": "web", "kicker": "STYLE • OUTFIT DISCOVERY", "description": "A style-focused tool designed to help users explore outfit choices and make getting dressed feel easier and more organized."}, {"name": "Genesis Ledger Pro", "category": "data", "kicker": "FINANCE • RECORD KEEPING", "description": "A ledger-oriented application concept for organizing financial entries and making records easier to review and manage."}, {"name": "Data Health Analyzer", "category": "data", "kicker": "DATA QUALITY • ANALYSIS", "description": "A data-quality tool concept for examining a dataset and helping users spot issues that may affect its reliability and usefulness."}, {"name": "Memory Card Challenge", "category": "web", "kicker": "GAME • MEMORY TRAINING", "description": "A memory-matching game that invites players to find matching pairs, practice recall, and improve their score through repeated rounds."}, {"name": "Decision Spinner", "category": "web", "kicker": "UTILITY • DECISION MAKING", "description": "A simple interactive decision helper that turns a list of choices into a spin-based selection when users need a quick way to decide."}, {"name": "PassEvolve", "category": "web", "kicker": "UTILITY • PASSWORD MANAGEMENT", "description": "A password-focused project concept centered on helping users create or improve stronger password habits."}, {"name": "Industrial Edge-Based Predictive Maintenance", "category": "data", "kicker": "INDUSTRY • PREDICTIVE MAINTENANCE", "description": "A predictive-maintenance project focused on using equipment-related data to help identify possible issues earlier and support proactive maintenance decisions."}, {"name": "AI Escape Room", "category": "web", "kicker": "GAME • PUZZLE SOLVING", "description": "An interactive escape-room experience where players solve clues and puzzles step by step to progress through the challenge."}, {"name": "AI Resume Screening and ATS Analyzer", "category": "data", "kicker": "CAREER • RESUME ANALYSIS", "description": "A resume-analysis application designed to compare resume content with job requirements and help users understand alignment with an applicant-tracking workflow."}, {"name": "AI Career and Resume Mentor", "category": "data", "kicker": "CAREER • GUIDANCE", "description": "A career-support application concept that helps users review resume and career-related information and identify practical next steps."}];
  const projectModal = document.querySelector('#project-modal');
  const projectModalPanel = projectModal?.querySelector('.project-modal-panel');
  const projectModalTitle = document.querySelector('#project-modal-title');
  const projectModalKicker = document.querySelector('#project-modal-kicker');
  const projectModalDescription = document.querySelector('#project-modal-description');
  const projectGithubLink = document.querySelector('#project-github-link');
  let lastProjectTrigger = null;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      projectCards.forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  function closeProjectModal() {
    if (!projectModal || projectModal.hidden) return;
    projectModal.hidden = true;
    document.body.classList.remove('project-modal-open');
    lastProjectTrigger?.focus();
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const item = projectData[Number(card.dataset.projectIndex)];
      if (!item || !projectModal) return;
      lastProjectTrigger = card;
      projectModalTitle.textContent = item.name;
      projectModalKicker.textContent = item.kicker;
      projectModalDescription.textContent = item.description;
      const query = encodeURIComponent(`user:likithabn14 ${item.name}`);
      projectGithubLink.href = `https://github.com/search?q=${query}&type=repositories`;
      projectModal.hidden = false;
      document.body.classList.add('project-modal-open');
      projectModalPanel?.focus();
    });
  });
  projectModal?.querySelectorAll('[data-close-project]').forEach((control) => control.addEventListener('click', closeProjectModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeProjectModal();
  });

  const showEmailButton = document.querySelector('#show-email');
  const emailReveal = document.querySelector('#email-reveal');
  showEmailButton?.addEventListener('click', () => {
    const isVisible = showEmailButton.getAttribute('aria-expanded') === 'true';
    showEmailButton.setAttribute('aria-expanded', String(!isVisible));
    if (emailReveal) emailReveal.hidden = isVisible;
    showEmailButton.innerHTML = isVisible
      ? 'Email me <span aria-hidden="true">↗</span>'
      : 'Email shown <span aria-hidden="true">✓</span>';
  });

  const copyButton = document.querySelector('#copy-email');
  const copyFeedback = document.querySelector('#copy-feedback');
  copyButton?.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = 'Email address copied.';
    } catch {
      copyFeedback.textContent = `Email: ${email}`;
    }
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
