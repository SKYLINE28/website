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

const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typewriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
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
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

/* Pixel Fireworks Logic */
function createFireworks(x, y) {
    const colors = ['var(--accent-color)', 'var(--bg-color)', 'var(--text-color)']; // Automatically Theme matched
    const numParticles = 12;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('pixel-particle');
        document.body.appendChild(particle);

        const size = Math.floor(Math.random() * 8 + 4); // 4px to 11px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 20; // 20 to 70px spread
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// Trigger fireworks on any click anywhere!
document.addEventListener('click', function (e) {
    createFireworks(e.pageX, e.pageY);
});

/* Animated Background Pixels */
function createBackgroundPixels() {
    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-pixels';
    document.body.prepend(bgContainer);

    const colors = ['var(--particle-1)', 'var(--particle-2)', 'var(--particle-3)', 'var(--particle-4)']; // Adaptive theme background elements
    const numPixels = 25; // number of floating pixels

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

document.addEventListener("DOMContentLoaded", createBackgroundPixels);

/* Theme Toggle Setup */
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    if (themeToggle) {
        if (currentTheme === 'dark') themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';

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
            localStorage.setItem('theme', theme);
            // Fireworks are handled globally above now
        });
    }

    /* Floating Menu Logic */
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

    /* URL Parameter intercept to persist theme across file:// pages */
    document.addEventListener("click", function (e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.startsWith('http') && !link.href.includes('#')) {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme) {
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

/* Scroll To Top Logic */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
