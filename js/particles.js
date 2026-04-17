/* ===========================
   BACKGROUND PARTICLES (Parallax Depth)
   =========================== */
const ParticlesManager = (function () {
    function init(prefersReducedMotion) {
        if (prefersReducedMotion) return;

        let bgContainer = document.getElementById('bg-pixels');
        if (!bgContainer) {
            bgContainer = document.createElement('div');
            bgContainer.id = 'bg-pixels';
            document.body.prepend(bgContainer);
        }

        const colors = ['var(--particle-1)', 'var(--particle-2)', 'var(--particle-3)', 'var(--particle-4)'];
        const numPixels = 26;

        for (let i = 0; i < numPixels; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('floating-pixel');

            const size = Math.floor(Math.random() * 16 + 5); // 5–20px
            pixel.style.width = size + 'px';
            pixel.style.height = size + 'px';
            pixel.style.left = Math.random() * 100 + 'vw';
            pixel.style.background = colors[Math.floor(Math.random() * colors.length)];
            pixel.style.animationDelay = (Math.random() * 12) + 's';

            // Parallax: larger = "closer" = faster animation
            const normalizedSize = (size - 5) / 15; // 0.0 → 1.0
            const duration = 30 - (normalizedSize * 20); // large ~10s fast, small ~30s slow
            pixel.style.animationDuration = Math.max(duration, 7) + 's';

            // Larger (closer) pixels are slightly more opaque
            pixel.style.opacity = 0.1 + normalizedSize * 0.35;

            bgContainer.appendChild(pixel);
        }
    }

    return { init };
})();
