/* ===========================
   PIXEL FIREWORKS (Gravity Physics)
   =========================== */
const FireworksManager = (function () {
    let _prefersReducedMotion = false;

    function createFireworks(x, y) {
        if (_prefersReducedMotion) return;

        const colors = [
            'var(--accent-color)',
            'var(--particle-1)',
            'var(--particle-3)',
            'var(--particle-4)',
            'var(--text-color)'
        ];
        const numParticles = 18;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            document.body.appendChild(particle);

            const size = Math.floor(Math.random() * 8 + 4); // 4–11px squares
            particle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
            `;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 4;
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed - (Math.random() * 6 + 3); // upward initial bias
            let px = x;
            let py = y;
            let opacity = 1;
            const gravity = 0.38;
            let frame = 0;
            const maxFrames = 42;

            function animateParticle() {
                frame++;
                vx *= 0.96;    // horizontal friction
                vy += gravity; // gravity pulls down
                px += vx;
                py += vy;
                opacity = 1 - (frame / maxFrames);

                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = opacity;

                if (frame < maxFrames) {
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            }

            // Staggered start for a more natural burst feel
            setTimeout(() => requestAnimationFrame(animateParticle), i * 18);
        }
    }

    /** Massive burst — used by konami.js */
    function createMassiveBurst(durationMs) {
        if (_prefersReducedMotion) return;
        const endTime = Date.now() + durationMs;
        function burst() {
            if (Date.now() >= endTime) return;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFireworks(x, y);
            setTimeout(burst, 80);
        }
        burst();
    }

    function init(prefersReducedMotion) {
        _prefersReducedMotion = prefersReducedMotion;

        document.addEventListener('click', function (e) {
            if (e.target.closest('button') || e.target.closest('a')) return;
            createFireworks(e.clientX, e.clientY);
        });
    }

    return { init, createFireworks, createMassiveBurst };
})();
