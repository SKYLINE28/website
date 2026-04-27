/* ===========================
   SCROLL INTERACTIONS
   =========================== */
const ScrollManager = (function () {
    function init() {
        const scrollTopBtn = document.getElementById('scroll-top');
        const progressBar = document.getElementById('scroll-progress');
        
        // Setup Section Indicator
        const sections = document.querySelectorAll('main > section, header.hero');
        const indicator = document.getElementById('section-indicator');
        if (indicator && sections.length > 0) {
            sections.forEach((sec, i) => {
                const dot = document.createElement('div');
                dot.className = 'indicator-dot';
                dot.dataset.num = i + 1;
                dot.onclick = () => {
                    const top = sec.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                };
                indicator.appendChild(dot);
            });
        }

        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (scrollTopBtn) {
                        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
                    }
                    if (progressBar) {
                        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                        const scrolled = (winScroll / height) * 100;
                        progressBar.style.width = scrolled + "%";
                    }
                    
                    // Update Section Indicator
                    if (indicator && sections.length > 0) {
                        let current = 0;
                        sections.forEach((sec, i) => {
                            const rect = sec.getBoundingClientRect();
                            if (rect.top <= window.innerHeight / 2.5) {
                                current = i;
                            }
                        });
                        const dots = indicator.querySelectorAll('.indicator-dot');
                        dots.forEach(d => d.classList.remove('active'));
                        if (dots[current]) dots[current].classList.add('active');
                    }
                    
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });
        
        // Initial call to set active states correctly if partially scrolled
        setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    return { init };
})();
