/* ===========================
   SCROLL INTERACTIONS
   =========================== */
const ScrollManager = (function () {
    function init() {
        const scrollTopBtn = document.getElementById('scroll-top');
        const progressBar = document.getElementById('scroll-progress');

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
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    return { init };
})();
