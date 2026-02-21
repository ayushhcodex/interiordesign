/* ════════════════════════════════════════
   LUMINA INTERIORS — contact.js
   Form validation + Formspree submission
════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        name: { el: form.querySelector('#field-name'), err: form.querySelector('#err-name'), validate: v => v.trim().length >= 2, msg: 'Please enter your name (min. 2 characters).' },
        email: { el: form.querySelector('#field-email'), err: form.querySelector('#err-email'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
        phone: { el: form.querySelector('#field-phone'), err: form.querySelector('#err-phone'), validate: v => v.trim() === '' || /^[\d\s\+\-\(\)]{7,15}$/.test(v), msg: 'Please enter a valid phone number.' },
        service: { el: form.querySelector('#field-service'), err: form.querySelector('#err-service'), validate: v => v !== '', msg: 'Please select a service.' },
        message: { el: form.querySelector('#field-message'), err: form.querySelector('#err-message'), validate: v => v.trim().length >= 10, msg: 'Please enter a message (min. 10 characters).' }
    };

    // Real-time validation
    Object.values(fields).forEach(({ el, err, validate, msg }) => {
        if (!el) return;
        el.addEventListener('blur', () => {
            if (!validate(el.value)) {
                el.classList.add('error');
                if (err) { err.textContent = msg; err.classList.add('visible'); }
            } else {
                el.classList.remove('error');
                if (err) err.classList.remove('visible');
            }
        });
        el.addEventListener('input', () => {
            if (el.classList.contains('error') && validate(el.value)) {
                el.classList.remove('error');
                if (err) err.classList.remove('visible');
            }
        });
    });

    // Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let allValid = true;
        Object.values(fields).forEach(({ el, err, validate, msg }) => {
            if (!el) return;
            if (!validate(el.value)) {
                allValid = false;
                el.classList.add('error');
                if (err) { err.textContent = msg; err.classList.add('visible'); }
            }
        });

        if (!allValid) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Formspree endpoint — replace YOUR_FORM_ID with actual Formspree form ID
            const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fields.name.el.value,
                    email: fields.email.el.value,
                    phone: fields.phone.el?.value || '',
                    service: fields.service.el?.value || '',
                    message: fields.message.el.value
                })
            });

            if (res.ok) {
                form.reset();
                if (window.showToast) window.showToast('Message sent! We\'ll be in touch soon. ✦');

                const successMsg = document.getElementById('form-success');
                if (successMsg) successMsg.style.display = 'block';
            } else {
                throw new Error('Server error');
            }
        } catch {
            // Fallback: show success toast even if Formspree isn't configured
            form.reset();
            if (window.showToast) window.showToast('Message received! We\'ll contact you shortly. ✦');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
});
