document.addEventListener('DOMContentLoaded', function () {
  var leadForms = document.querySelectorAll('[data-lead-form]');

  if (!leadForms.length) {
    return;
  }

  function setStatus(form, type, html) {
    var status = form.querySelector('.form-status');
    if (!status) {
      return;
    }

    status.className = 'form-status is-visible is-' + type;
    status.innerHTML = html;
  }

  function clearStatus(form) {
    var status = form.querySelector('.form-status');
    if (!status) {
      return;
    }

    status.className = 'form-status';
    status.textContent = '';
  }

  function clearFieldError(field) {
    var group = field.closest('.form-group');
    if (!group) {
      return;
    }

    var error = group.querySelector('.form-error');
    if (error) {
      error.remove();
    }

    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  function showFieldError(field, message) {
    var group = field.closest('.form-group');
    if (!group) {
      return;
    }

    clearFieldError(field);

    var error = document.createElement('div');
    error.className = 'form-error';
    error.id = field.id + '-error';
    error.textContent = message;
    group.appendChild(error);

    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', error.id);
  }

  function validateForm(form) {
    var isValid = true;
    var nameField = form.querySelector('[name="name"]');
    var phoneField = form.querySelector('[name="phone"]');
    var emailField = form.querySelector('[name="email"]');

    form.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(function (field) {
      clearFieldError(field);
    });

    if (nameField && !nameField.value.trim()) {
      showFieldError(nameField, 'Please enter your full name.');
      isValid = false;
    }

    if (phoneField) {
      var phoneDigits = phoneField.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        showFieldError(phoneField, 'Please enter a valid phone number.');
        isValid = false;
      }
    }

    if (emailField && emailField.value.trim()) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }
    }

    return isValid;
  }

  function setSubmitting(form, isSubmitting) {
    var submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
      return;
    }

    if (!submitButton.dataset.defaultLabel) {
      submitButton.dataset.defaultLabel = submitButton.textContent;
    }

    form.classList.toggle('is-submitting', isSubmitting);
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Sending...' : submitButton.dataset.defaultLabel;
  }

  function buildAjaxEndpoint(form) {
    if (form.action.indexOf('formsubmit.co/ajax/') !== -1) {
      return form.action;
    }

    return form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
  }

  leadForms.forEach(function (form) {
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
        clearStatus(form);
      });

      field.addEventListener('change', function () {
        clearFieldError(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearStatus(form);

      var honeyField = form.querySelector('[name="_honey"]');
      if (honeyField && honeyField.value) {
        return;
      }

      if (!validateForm(form)) {
        return;
      }

      setSubmitting(form, true);

      var formData = new FormData(form);
      formData.set('_subject', 'New form submitted from dcncny.com');
      formData.set('page_url', window.location.href);

      fetch(buildAjaxEndpoint(form), {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Request failed');
          }

          return response.json();
        })
        .then(function (payload) {
          if (payload.success !== 'true' && payload.success !== true) {
            throw new Error('Unexpected response');
          }

          form.reset();
          setStatus(
            form,
            'success',
            'Thanks. Your request was sent successfully. If you need immediate help, call <a href="tel:5163248078">(516) 324-8078</a>.'
          );
        })
        .catch(function () {
          setStatus(
            form,
            'error',
            'We could not send your request automatically. Please call <a href="tel:5163248078">(516) 324-8078</a> or email <a href="mailto:info@dcncny.com?subject=New%20form%20submitted%20from%20dcncny.com">info@dcncny.com</a>.'
          );
        })
        .finally(function () {
          setSubmitting(form, false);
        });
    });
  });
});
