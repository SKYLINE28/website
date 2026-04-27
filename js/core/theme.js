/* ===========================
   THEME MANAGEMENT
   =========================== */
const ThemeManager = (function () {
    function init() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        if (themeToggle) {
            if (currentTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
            }

            themeToggle.addEventListener('click', () => {
                let theme = document.documentElement.getAttribute('data-theme');
                if (theme === 'dark') {
                    theme = 'light';
                    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
                } else {
                    theme = 'dark';
                    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
                }
                document.documentElement.setAttribute('data-theme', theme);
                try { localStorage.setItem('theme', theme); } catch (e) { }
            });
        }

        /* URL Parameter intercept to persist theme across file:// pages */
        document.addEventListener("click", function (e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.startsWith('http') && !link.href.includes('#') && !link.href.startsWith('mailto')) {
                const theme = document.documentElement.getAttribute('data-theme');
                if (theme) {
                    if (link.hasAttribute('download')) return;
                    e.preventDefault();
                    try {
                        const url = new URL(link.href, window.location.href);
                        url.searchParams.set('theme', theme);
                        window.location.href = url.toString();
                    } catch (error) {
                        window.location.href = link.href;
                    }
                }
            }
        });
    }

    /** Set theme programmatically (used by terminal.js) */
    function setTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') return false;
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (e) { }

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark'
                ? '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>'
                : '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
        }
        return true;
    }

    return { init, setTheme };
})();
