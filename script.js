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

  /* Resume viewer. Without JS (or <dialog>), the links open the PDF directly. */
  var dialog = document.getElementById('resume-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    var frame = dialog.querySelector('iframe');
    var opener = null;
    document.querySelectorAll('[data-resume]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        opener = link;
        if (!frame.getAttribute('src')) frame.setAttribute('src', link.getAttribute('href'));
        dialog.showModal();
      });
    });
    dialog.querySelector('[data-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });
  }

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
