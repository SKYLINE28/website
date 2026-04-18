/* ===========================
   MOUSE TRAIL
   =========================== */
const MouseTrailManager = (function () {
    function init(prefersReducedMotion) {
        if (prefersReducedMotion) return;

        document.addEventListener('mousemove', (e) => {
            // Throttle: only spawn on ~40% of move events
            if (Math.random() > 0.4) return;

            const trail = document.createElement('div');
            trail.className = 'pixel-trail';

            const size = Math.floor(Math.random() * 5) + 4; // 4–8px squares
            trail.style.width = size + 'px';
            trail.style.height = size + 'px';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';

            // Use CSS vars so trail responds to dark/light toggle
            const trailColors = ['var(--accent-color)', 'var(--particle-3)', 'var(--particle-4)'];
            trail.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];

            document.body.appendChild(trail);
            setTimeout(() => trail.remove(), 400);
        });
    }

    return { init };
})();
