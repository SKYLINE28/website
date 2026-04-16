/* ===========================
   1. VARIABLES & UTILS
   =========================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===========================
   2. THEME MANAGEMENT
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    if (themeToggle) {
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
        }

        themeToggle.addEventListener('click', (e) => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                theme = 'light';
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
            } else {
                theme = 'dark';
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
            }
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('theme', theme); } catch(e){}
        });
    }

    /* URL Parameter intercept to persist theme across file:// pages */
    document.addEventListener("click", function (e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.startsWith('http') && !link.href.includes('#') && !link.href.startsWith('mailto')) {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme) {
                // Ensure we don't break download links
                if(link.hasAttribute('download')) return;
                
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
});

/* ===========================
   3. NAVIGATION MENU & ACTIVE STATE
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    const mainMenuBtn = document.getElementById('main-menu-btn');
    const dropMenu = document.getElementById('drop-menu');
    
    if (mainMenuBtn && dropMenu) {
        mainMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropMenu.classList.toggle('active');
        });

        // Close when clicking outside
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
        // Very simple matching: if the URL contains the href, mark active
        const href = item.getAttribute('href');
        if (href && href !== '#' && currentUrl.includes(href.replace('./', '').replace('../', ''))) {
            item.classList.add('active');
        }
        // Exact match for index
        if(href.includes('index.html') && (currentUrl.endsWith('/') || currentUrl.includes('index.html'))) {
             // Let's only mark index active if it's actually index
             if(currentUrl.includes('courses.html') || currentUrl.includes('support.html') || currentUrl.includes('system_menu.html')){
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
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // If mobile menu is open, close it
                if(dropMenu) dropMenu.classList.remove('active');
            }
        });
    });
});

/* ===========================
   4. TYPEWRITER EFFECT
   =========================== */
const textArray = [
    "Hallo welcome to my website profile",
    "Building websites and games...",
    "Leveling up my coding skills.",
    "Let's create something awesome!"
];

const typingDelay = 100;
const erasingDelay = 70;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    const typewriterElement = document.getElementById("typewriter");
    if(!typewriterElement) return;

    if (charIndex < textArray[textArrayIndex].length) {
        typewriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    const typewriterElement = document.getElementById("typewriter");
    if(!typewriterElement) return;

    if (charIndex > 0) {
        typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("typewriter") && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});

/* ===========================
   5. PIXEL FIREWORKS
   =========================== */
function createFireworks(x, y) {
    if (prefersReducedMotion) return; // Respect user preference

    const colors = ['var(--accent-color)', 'var(--bg-color)', 'var(--text-color)'];
    const numParticles = 12;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('pixel-particle');
        document.body.appendChild(particle);

        const size = Math.floor(Math.random() * 8 + 4); 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 20; 
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        setTimeout(() => particle.remove(), 600);
    }
}

document.addEventListener('click', function (e) {
    // Prevent fireworks on buttons to not distract from the action, unless it's body/background
    if (e.target.closest('button') || e.target.closest('a')) return;
    createFireworks(e.pageX, e.pageY);
});

/* ===========================
   6. BACKGROUND PARTICLES
   =========================== */
function createBackgroundPixels() {
    if (prefersReducedMotion) return;

    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-pixels';
    document.body.prepend(bgContainer);

    const colors = ['var(--particle-1)', 'var(--particle-2)', 'var(--particle-3)', 'var(--particle-4)'];
    const numPixels = 20; 

    for (let i = 0; i < numPixels; i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('floating-pixel');

        pixel.style.left = Math.random() * 100 + 'vw';
        pixel.style.animationDuration = (Math.random() * 20 + 10) + 's';
        pixel.style.animationDelay = (Math.random() * 10) + 's';
        pixel.style.background = colors[Math.floor(Math.random() * colors.length)];

        let size = Math.floor(Math.random() * 15 + 5);
        pixel.style.width = size + 'px';
        pixel.style.height = size + 'px';

        bgContainer.appendChild(pixel);
    }
}

// Lazy initialization for performance
window.addEventListener("load", createBackgroundPixels);


/* ===========================
   7. SCROLL INTERACTIONS 
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById('scroll-top');
    const progressBar = document.getElementById('scroll-progress');
    
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Scroll to top visibility
                if (scrollTopBtn) {
                    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
                }

                // Progress bar width
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
    }, { passive: true }); // passive listener for perf

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


/* ===========================
   8. INTERSECTION OBSERVER (Reveal)
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    if (prefersReducedMotion) {
        // If reduced motion, make reveals immediately visible
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); 
                observer.unobserve(entry.target); // Once revealed, stop observing
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});


/* ===========================
   9. COPY TO CLIPBOARD
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const textToCopy = btn.getAttribute('data-copy');
            if(textToCopy) {
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
});
