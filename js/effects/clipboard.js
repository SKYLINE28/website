/* ===========================
   COPY TO CLIPBOARD
   =========================== */
const ClipboardManager = (function () {
    function init() {
        const copyBtns = document.querySelectorAll('.copy-btn');

        copyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const textToCopy = btn.getAttribute('data-copy');
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalHTML = btn.innerHTML;
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> [COPIED!]';
                        btn.style.backgroundColor = 'var(--text-color)';
                        btn.style.color = 'var(--bg-color)';

                        setTimeout(() => {
                            btn.innerHTML = originalHTML;
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                        }, 2000);
                    });
                }
            });
        });
    }

    return { init };
})();
