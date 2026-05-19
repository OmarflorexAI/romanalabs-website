    (function() {
      var CAL_URL = 'https://cal.com/omar-flores/discovery';
      var form = document.querySelector('.lead-form');
      var formView = document.querySelector('[data-view="form"]');
      var successView = document.querySelector('[data-view="success"]');
      var errorEl = document.querySelector('.lead-error');
      var submitBtn = form.querySelector('.lead-submit');
      var submitBtnHTML = submitBtn.innerHTML;
      var inputs = Array.from(form.querySelectorAll('input[type=text], input[type=email], textarea'));
      var bottleneckTextarea = form.querySelector('#lf-bottleneck');
      var goalsField = form.querySelector('[data-goals-field]');
      var goalCheckboxes = Array.from(form.querySelectorAll('input[name="goals"]'));

      // Field-number color flip when populated (text/email/textarea)
      inputs.forEach(function(input) {
        input.addEventListener('input', function() {
          var field = input.closest('.lead-field');
          if (!field) return;
          field.classList.toggle('has-value', input.value.trim().length > 0);
        });
      });

      // Goals checkbox group — flip number color when any selected
      goalCheckboxes.forEach(function(cb) {
        cb.addEventListener('change', function() {
          var anyChecked = goalCheckboxes.some(function(c) { return c.checked; });
          if (goalsField) goalsField.classList.toggle('has-value', anyChecked);
        });
      });

      // Textarea auto-grow for the bottleneck field (single-line growable)
      if (bottleneckTextarea) {
        bottleneckTextarea.addEventListener('input', function() {
          bottleneckTextarea.style.height = 'auto';
          bottleneckTextarea.style.height = Math.min(bottleneckTextarea.scrollHeight, 160) + 'px';
        });
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        errorEl.textContent = '';

        if (form.botcheck && form.botcheck.checked) return;

        // Required: at least one goal checkbox
        var anyGoal = goalCheckboxes.some(function(c) { return c.checked; });
        if (!anyGoal) {
          errorEl.textContent = 'Please pick at least one area we can help with.';
          if (goalCheckboxes[0]) goalCheckboxes[0].focus();
          return;
        }

        if (!form.checkValidity()) {
          errorEl.textContent = 'Please fill every required field — it only takes a moment.';
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
              formView.style.display = 'none';
              successView.style.display = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(function() {
                window.open(CAL_URL, '_blank', 'noopener');
              }, 900);
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
    })();
