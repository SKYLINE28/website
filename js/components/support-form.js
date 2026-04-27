// js/components/support-form.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    // Ensure we are targeting the inner span for text replacement if it exists
    const submitText = submitBtn.querySelector('span') || submitBtn;
    const originalHTML = submitText.innerHTML;

    // Create status element if it doesn't exist
    let statusEl = document.getElementById('form-status');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'form-status';
        statusEl.className = 'form-status mt-2 text-center';
        statusEl.style.display = 'none';
        contactForm.insertBefore(statusEl, submitBtn.parentElement);
    }

    // Interactive focus effects (already handled partially by CSS, adding a class for potential JS-driven animations)
    const inputs = contactForm.querySelectorAll('.pixel-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Client-side validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showStatus('> ERROR: Semua bidang wajib diisi!', 'error');
            // Shake effect for empty inputs
            if (!name) nameInput.classList.add('shake');
            if (!email) emailInput.classList.add('shake');
            if (!message) messageInput.classList.add('shake');
            
            setTimeout(() => {
                nameInput.classList.remove('shake');
                emailInput.classList.remove('shake');
                messageInput.classList.remove('shake');
            }, 500);
            return;
        }

        // Email format validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatus('> ERROR: Format email tidak valid!', 'error');
            emailInput.classList.add('shake');
            setTimeout(() => emailInput.classList.remove('shake'), 500);
            return;
        }

        // Set Loading State
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> MENGIRIM_LOG...';
        statusEl.style.display = 'none';
        contactForm.style.opacity = '0.7';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showStatus('> SUKSES: Terima kasih atas laporan Anda!', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    const errors = data.errors.map(error => error.message).join(', ');
                    showStatus(`> ERROR: ${errors}`, 'error');
                } else {
                    showStatus('> ERROR: Terjadi kesalahan saat mengirim pesan.', 'error');
                }
            }
        } catch (error) {
            showStatus('> ERROR: Gagal terhubung ke server.', 'error');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitText.innerHTML = originalHTML;
            contactForm.style.opacity = '1';
        }
    });

    function showStatus(message, type) {
        statusEl.textContent = message;
        statusEl.className = `form-status mt-2 text-center ${type}`;
        statusEl.style.display = 'block';
    }
});
