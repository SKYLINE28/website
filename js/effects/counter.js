/* ===========================
   PROJECT COUNTER + VISITOR COUNTER
   =========================== */
const CounterAnimations = (function () {

    /** Animate a number from 0 to target over durationMs */
    function animateCount(el, target, durationMs) {
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }

    /** Project counter — counts from PROJECTS_DATA */
    function initProjectCounter() {
        const counterBar = document.getElementById('project-counter-bar');
        if (!counterBar || typeof PROJECTS_DATA === 'undefined') return;

        const total = PROJECTS_DATA.length;
        const wip = PROJECTS_DATA.filter(p => p.wip).length;
        const live = total - wip;

        const totalEl = counterBar.querySelector('[data-counter="total"]');
        const wipEl = counterBar.querySelector('[data-counter="wip"]');
        const liveEl = counterBar.querySelector('[data-counter="live"]');

        if (!totalEl || !wipEl || !liveEl) return;

        // Set initial values to 0
        totalEl.textContent = '0';
        wipEl.textContent = '0';
        liveEl.textContent = '0';

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(totalEl, total, 1200);
                    animateCount(wipEl, wip, 1200);
                    animateCount(liveEl, live, 1200);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(counterBar);
    }

    /** Visitor counter — localStorage aesthetic counter */
    function initVisitorCounter() {
        const counterEl = document.getElementById('visitor-count');
        if (!counterEl) return;

        // Increment visit count
        let count = 0;
        try {
            count = parseInt(localStorage.getItem('visitor_count') || '0', 10);
            count++;
            localStorage.setItem('visitor_count', String(count));
        } catch (e) {
            count = 1;
        }

        // Zero-pad to 8 digits
        const padded = String(count).padStart(8, '0');
        counterEl.textContent = '00000000'; // Initially zero

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Count-up animation
                    const duration = 1500;
                    const start = performance.now();
                    function step(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - (1 - progress) * (1 - progress);
                        const current = Math.floor(eased * count);
                        counterEl.textContent = String(current).padStart(8, '0');
                        if (progress < 1) requestAnimationFrame(step);
                        else counterEl.textContent = padded;
                    }
                    requestAnimationFrame(step);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterEl);
    }

    function init() {
        initProjectCounter();
        initVisitorCounter();
    }

    return { init };
})();
