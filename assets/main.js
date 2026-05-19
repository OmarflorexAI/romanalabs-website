
    // === High-performance smooth scroll ===
    (function() {
      const DURATION = 900; // ms

      function easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function smoothScrollTo(targetY) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        if (Math.abs(diff) < 1) return;
        const startTime = performance.now();

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1);
          const easedProgress = easeInOutCubic(progress);
          window.scrollTo(0, startY + diff * easedProgress);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
      }

      // Intercept all anchor clicks that point to #sections
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerOffset = 80;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        smoothScrollTo(targetY);
      });
    })();

    // Header scroll effect
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Mobile menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      mobileNavPanel.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileNavPanel.classList.remove('open');
      });
    });

    // Glowing border effect on cards (RAF-throttled)
    (function() {
      const cards = document.querySelectorAll('.card');
      if (!cards.length) return;

      const PROXIMITY = 100;
      let mouseX = 0, mouseY = 0;
      let rafPending = false;
      let targetAngles = new Map();

      function lerp(start, end, factor) {
        return start + (end - start) * factor;
      }

      function angleDiff(a, b) {
        return ((b - a + 180) % 360) - 180;
      }

      function updateCards() {
        rafPending = false;
        cards.forEach(function(card) {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width * 0.5;
          const cy = rect.top + rect.height * 0.5;

          const isNear =
            mouseX > rect.left - PROXIMITY &&
            mouseX < rect.right + PROXIMITY &&
            mouseY > rect.top - PROXIMITY &&
            mouseY < rect.bottom + PROXIMITY;

          if (!isNear) {
            card.style.setProperty('--glow-active', '0');
            targetAngles.delete(card);
            return;
          }

          card.style.setProperty('--glow-active', '1');
          const targetAngle = Math.atan2(mouseY - cy, mouseX - cx) * (180 / Math.PI) + 90;
          const currentAngle = parseFloat(card.style.getPropertyValue('--glow-start')) || 0;
          const diff = angleDiff(currentAngle, targetAngle);
          const newAngle = lerp(currentAngle, currentAngle + diff, 0.18);
          card.style.setProperty('--glow-start', String(newAngle));
        });
      }

      function scheduleUpdate() {
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(updateCards);
        }
      }

      document.body.addEventListener('pointermove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        scheduleUpdate();
      }, { passive: true });
    })();

    // Scroll reveal (multiple animation types)
    const revealTypes = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    revealTypes.forEach(type => {
      document.querySelectorAll(type).forEach(el => observer.observe(el));
    });

    // Animated number counter
    const countEls = document.querySelectorAll('.count-up');
    let countTriggered = false;

    function animateCount(el) {
      const target = parseInt(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutExpo(progress) * target);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countTriggered) {
          countTriggered = true;
          countEls.forEach((el, i) => {
            setTimeout(() => animateCount(el), i * 150);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('results');
    if (statsSection) statsObserver.observe(statsSection);

    // Process group scroll animation
    (function() {
      const groups = document.querySelectorAll('.process-group');
      if (!groups.length) return;
      const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Stagger card reveals after the phase text appears
            setTimeout(function() {
              entry.target.classList.add('cards-visible');
            }, 400);
            processObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      groups.forEach(function(g) { processObserver.observe(g); });
    })();

    // Keep marquee animation running when tab is inactive
    (function() {
      var marqueeTrack = document.querySelector('.marquee-track');
      if (!marqueeTrack) return;
      var startTime = null;
      var lastOffset = 0;
      var paused = false;
      var totalWidth = marqueeTrack.scrollWidth / 2;

      // On visibility change, resync animation to avoid jump
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          // Reset animation to prevent stutter on return
          marqueeTrack.style.animation = 'none';
          marqueeTrack.offsetHeight; // force reflow
          marqueeTrack.style.animation = '';
        }
      });
    })();


    // ===== Process Section — IntersectionObserver reveal (no scroll-jack) =====
    (function() {
      var panels = Array.from(document.querySelectorAll('.pss-panel'));
      if (panels.length === 0) return;

      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('pss-visible');
            io.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px'
      });

      panels.forEach(function(p) { io.observe(p); });
    })();

    // ===== Lead-capture Modal — Editorial Concierge =====
    (function() {
      var CAL_URL = 'https://cal.com/omar-flores/discovery';

      var overlay = document.getElementById('leadModal');
      if (!overlay) return;
      var form = overlay.querySelector('.lead-form');
      var formView = overlay.querySelector('[data-view="form"]');
      var successView = overlay.querySelector('[data-view="success"]');
      var errorEl = overlay.querySelector('.lead-error');
      var submitBtn = overlay.querySelector('.lead-submit');
      var submitBtnHTML = submitBtn.innerHTML;
      var closeBtn = overlay.querySelector('.lead-modal-close');
      var fields = Array.from(overlay.querySelectorAll('.lead-field'));
      var inputs = Array.from(overlay.querySelectorAll('.lead-field input, .lead-field textarea'));
      var textarea = overlay.querySelector('textarea');
      var lastFocus = null;

      function openModal(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        lastFocus = document.activeElement;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        formView.style.display = '';
        successView.style.display = 'none';
        errorEl.textContent = '';
        // Focus first field after the entrance animation has cleared
        setTimeout(function() {
          var first = form.querySelector('input:not([type=hidden]):not([name=botcheck]), textarea');
          if (first) first.focus({ preventScroll: true });
        }, 320);
      }
      function closeModal() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }

      // Intercept every cal.com link on the page — EXCEPT links inside the modal itself
      document.querySelectorAll('a[href*="cal.com"]').forEach(function(a) {
        if (overlay.contains(a)) return; // skip the modal's own "Book directly" + success link
        a.addEventListener('click', openModal);
      });

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
      });

      // Field-number color flip when populated
      inputs.forEach(function(input) {
        input.addEventListener('input', function() {
          var field = input.closest('.lead-field');
          if (!field) return;
          field.classList.toggle('has-value', input.value.trim().length > 0);
        });
      });

      // Textarea auto-grow
      if (textarea) {
        function autosize() {
          textarea.style.height = 'auto';
          textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
        }
        textarea.addEventListener('input', autosize);
        // Reset on open
        var origOpen = openModal;
      }

      // Focus trap (simple): keep tab cycling inside the modal
      overlay.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        var focusables = overlay.querySelectorAll(
          'button, [href], input:not([type=hidden]):not([style*="-9999"]), textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        errorEl.textContent = '';

        // Honeypot
        if (form.botcheck && form.botcheck.checked) return;

        // Native validity check
        if (!form.checkValidity()) {
          errorEl.textContent = 'Please fill every field — it only takes a moment.';
          form.reportValidity();
          return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending…';

        var data = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res && res.success) {
              showSuccessAndRedirect();
            } else {
              throw new Error((res && res.message) || 'Submission failed');
            }
          })
          .catch(function(err) {
            errorEl.textContent = 'Something went wrong. Please try again or book directly below.';
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtnHTML;
            console.error(err);
          });
      });

      function showSuccessAndRedirect() {
        formView.style.display = 'none';
        successView.style.display = '';
        // Open cal.com in a new tab after a brief moment so the user sees confirmation
        setTimeout(function() {
          window.open(CAL_URL, '_blank', 'noopener');
        }, 900);
        // Reset for next time
        setTimeout(function() {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnHTML;
          fields.forEach(function(f) { f.classList.remove('has-value'); });
          if (textarea) textarea.style.height = '';
        }, 1500);
      }
    })();

