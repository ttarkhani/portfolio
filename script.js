(function () {
  var root = document.documentElement;
  var status = document.getElementById('copy-status');

  /* Theme: follows the system until the visitor picks one, then remembers it. */
  var toggle = document.getElementById('theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light');
  }
  function syncToggle() {
    toggle.setAttribute('aria-pressed', currentTheme() === 'dark' ? 'true' : 'false');
  }
  if (toggle) {
    toggle.hidden = false;
    syncToggle();
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggle();
    });
    systemDark.addEventListener('change', syncToggle);
  }

  /* Click-to-copy email. The mailto link still works on its own. */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!navigator.clipboard) return;
    btn.hidden = false;
    btn.setAttribute('aria-label', 'Copy email address');
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        btn.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to clipboard';
        setTimeout(function () {
          btn.textContent = 'Copy';
          if (status) status.textContent = '';
        }, 1800);
      }).catch(function () {});
    });
  });

  /* Resume: on wide screens swap the page image for the live PDF viewer.
     Phones keep the image, since most mobile browsers can't show a PDF inline. */
  var resumeView = document.querySelector('.resume-view');
  var wide = window.matchMedia('(min-width: 760px)');
  function syncResume() {
    if (!resumeView) return;
    var frame = resumeView.querySelector('iframe');
    if (wide.matches && !frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
    frame.hidden = !wide.matches;
    resumeView.classList.toggle('has-frame', wide.matches);
  }
  syncResume();
  wide.addEventListener('change', syncResume);

  /* Trace: move the "now" cursor to today, and grow the spans once on first view. */
  var trace = document.querySelector('.trace');
  if (trace) {
    var d = new Date();
    var daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    var months = (d.getFullYear() - 2025) * 12 + d.getMonth() + (d.getDate() - 1) / daysInMonth;
    trace.style.setProperty('--now', Math.max(0, Math.min(32, months)).toFixed(2));

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      var rect = trace.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        trace.classList.add('is-armed');
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            trace.classList.add('is-in');
            io.disconnect();
          }
        }, { rootMargin: '0px 0px -15% 0px' });
        io.observe(trace);
      }
    }
  }
})();
