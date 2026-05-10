// js/components/support-form.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('span') || submitBtn;
    const originalHTML = submitText.innerHTML;

    let statusEl = document.getElementById('form-status');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'form-status';
        statusEl.className = 'form-status mt-2 text-center';
        statusEl.style.display = 'none';
        contactForm.insertBefore(statusEl, submitBtn.parentElement);
    }

    // Focus effects
    contactForm.querySelectorAll('.pixel-input').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
    });

    // Re-apply i18n on lang change
    document.addEventListener('langChanged', () => {
        const nameLabel = document.querySelector('label[for="name"]');
        const emailLabel = document.querySelector('label[for="email"]');
        const msgLabel = document.querySelector('label[for="message"]');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');
        const btn = contactForm.querySelector('button[type="submit"] span') || contactForm.querySelector('button[type="submit"]');
        
        if (nameLabel) nameLabel.textContent = I18N.get('support.name_label');
        if (emailLabel) emailLabel.textContent = I18N.get('support.email_label');
        if (msgLabel) msgLabel.textContent = I18N.get('support.msg_label');
        if (nameInput) nameInput.placeholder = I18N.get('support.name_placeholder');
        if (emailInput) emailInput.placeholder = I18N.get('support.email_placeholder');
        if (msgInput) msgInput.placeholder = I18N.get('support.msg_placeholder');
        if (btn && !submitBtn.disabled) btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${I18N.get('support.submit')}`;
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name || !email || !message) {
            showStatus(I18N.get('support.error_fields'), 'error');
            if (!name) shake(nameInput);
            if (!email) shake(emailInput);
            if (!message) shake(messageInput);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus(I18N.get('support.error_email'), 'error');
            shake(emailInput);
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${I18N.get('support.sending')}`;
        statusEl.style.display = 'none';
        contactForm.style.opacity = '0.7';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showStatus(I18N.get('support.success'), 'success');
                contactForm.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                const errMsg = data?.errors?.map(e => e.message).join(', ') || I18N.get('support.error_send');
                showStatus(`> ERROR: ${errMsg}`, 'error');
            }
        } catch {
            showStatus(I18N.get('support.error_connect'), 'error');
        } finally {
            submitBtn.disabled = false;
            submitText.innerHTML = originalHTML;
            contactForm.style.opacity = '1';
        }
    });

    function shake(el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
    }

    function showStatus(message, type) {
        statusEl.textContent = message;
        statusEl.className = `form-status mt-2 text-center ${type}`;
        statusEl.style.display = 'block';
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});
