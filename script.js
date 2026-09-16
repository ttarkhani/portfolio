(function() {
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var sunIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="5.1" y1="5.1" x2="6.8" y2="6.8"/><line x1="17.2" y1="17.2" x2="18.9" y2="18.9"/><line x1="5.1" y1="18.9" x2="6.8" y2="17.2"/><line x1="17.2" y1="6.8" x2="18.9" y2="5.1"/></svg>';
  var moonIcon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>';

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function renderIcon() {
    if (!toggle) return;
    toggle.innerHTML = currentTheme() === 'dark' ? moonIcon : sunIcon;
  }
  renderIcon();
  if (toggle) {
    toggle.addEventListener('click', function() {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      renderIcon();
    });
  }

  var emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function() {
      var email = 'ttarkhani111@gmail.com';
      if (navigator.clipboard) { navigator.clipboard.writeText(email).catch(function() {}); }
      var original = emailLink.textContent;
      emailLink.textContent = 'Copied!';
      setTimeout(function() { emailLink.textContent = original; }, 1500);
    });
  }

  function setupTabs(sectionSelector) {
    var section = document.querySelector(sectionSelector);
    if (!section) return;
    var buttons = section.querySelectorAll('.tab-btn');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        section.querySelectorAll('.tab-btn').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        section.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var target = document.getElementById(btn.getAttribute('data-target'));
        if (target) {
          target.classList.add('active');
          var dot = target.querySelector('.orbit-dot');
          if (dot) {
            dot.style.animation = 'none';
            void dot.offsetWidth;
            dot.style.animation = '';
          }
        }
      });
    });
  }
  setupTabs('.experience');
  setupTabs('.projects');

  var resumeModal = document.getElementById('resumeModal');
  var resumeModalClose = document.getElementById('resumeModalClose');
  var resumeIframe = document.getElementById('resumeIframe');
  var resumeLoaded = false;

  function openResumeModal(e) {
    if (e) e.preventDefault();
    if (!resumeLoaded && resumeIframe) {
      resumeIframe.src = 'tahatarkhaniresume.pdf';
      resumeLoaded = true;
    }
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
  }
  function closeResumeModal() {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
  }
  document.querySelectorAll('.resume-trigger').forEach(function(el) {
    el.addEventListener('click', openResumeModal);
  });
  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', function(e) {
      if (e.target === resumeModal) closeResumeModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeResumeModal();
  });
})();