/* ===========================
   KONAMI CODE EASTER EGG
   =========================== */
const KonamiCode = (function () {
    const SEQUENCE = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    let current = 0;

    function showToast() {
        const toast = document.createElement('div');
        toast.className = 'konami-toast';
        toast.innerHTML = `
            <span class="toast-icon"><i class="fa-solid fa-trophy"></i></span>
            <div class="toast-body">
                <span class="toast-title">[CHEAT_ACTIVATED.exe]</span>
                <span class="toast-xp">+9999 EXP</span>
            </div>
        `;
        document.body.appendChild(toast);

        // Trigger reflow for animation
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    function init() {
        document.addEventListener('keydown', (e) => {
            const expected = SEQUENCE[current];
            if (e.key === expected || e.key.toLowerCase() === expected) {
                current++;
                if (current === SEQUENCE.length) {
                    current = 0;
                    // Trigger massive fireworks
                    if (typeof FireworksManager !== 'undefined') {
                        FireworksManager.createMassiveBurst(3000);
                    }
                    showToast();
                }
            } else {
                current = 0;
                // Check if it matches the first key
                if (e.key === SEQUENCE[0]) current = 1;
            }
        });
    }

    return { init };
})();
