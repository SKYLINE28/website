/* ===========================
   NAVIGATION MENU & ACTIVE STATE
   =========================== */
const NavManager = (function () {
    function init() {
        const mainMenuBtn = document.getElementById('main-menu-btn');
        const dropMenu = document.getElementById('drop-menu');

        if (mainMenuBtn && dropMenu) {
            mainMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropMenu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!dropMenu.contains(e.target) && !mainMenuBtn.contains(e.target)) {
                    dropMenu.classList.remove('active');
                }
            });
        }

        // Active Navigation State Matcher
        const currentUrl = window.location.href;
        const menuItems = document.querySelectorAll('.menu-item[href]');
        menuItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && currentUrl.includes(href.replace('./', '').replace('../', ''))) {
                item.classList.add('active');
            }
            if (href.includes('index.html') && (currentUrl.endsWith('/') || currentUrl.includes('index.html'))) {
                if (currentUrl.includes('courses.html') || currentUrl.includes('support.html') || currentUrl.includes('system_menu.html') || currentUrl.includes('now.html')) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            }
        });

        // Smooth Internal Scroll Offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (dropMenu) dropMenu.classList.remove('active');
                }
            });
        });
    }

    return { init };
})();
