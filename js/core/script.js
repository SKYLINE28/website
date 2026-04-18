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
            if (currentUrl.includes('courses.html') || currentUrl.includes('support.html') || currentUrl.includes('system_menu.html')) {
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
    if (!typewriterElement) return;

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
    if (!typewriterElement) return;

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
   5. PIXEL FIREWORKS (ENHANCED — Gravity Physics)
   =========================== */
function createFireworks(x, y) {
    if (prefersReducedMotion) return;

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

document.addEventListener('click', function (e) {
    if (e.target.closest('button') || e.target.closest('a')) return;
    createFireworks(e.clientX, e.clientY);
});

/* ===========================
   6. BACKGROUND PARTICLES (ENHANCED — Parallax Depth)
   =========================== */
function createBackgroundPixels() {
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
});


/* ===========================
   8. INTERSECTION OBSERVER (Reveal)
   =========================== */
document.addEventListener("DOMContentLoaded", function () {
    if (prefersReducedMotion) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
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
            if (textToCopy) {
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

/* ===========================
   10. PROJECT EXPLORER
   =========================== */
const PROJECTS_DATA = [
    {
        id: 'pixel-portfolio',
        name: 'PIXEL_PORTFOLIO.exe',
        desc: 'A retro-themed brutalist portfolio built with vanilla HTML, CSS, and JS.',
        fullDesc: 'Personal portfolio website with a retro pixel-art/brutalist aesthetic. Features dark/light mode, gravity-physics fireworks, parallax pixel background, mouse trail effect, typewriter animation, and a dynamic project explorer. Zero dependencies — pure HTML, CSS, and JavaScript.',
        tags: ['HTML', 'CSS', 'JS'],
        category: 'web',
        codeUrl: 'https://github.com/SKYLINE28',
        demoUrl: null,
        wip: false
    },
    {
        id: 'unknown-game',
        name: 'UNKNOWN_GAME.exe',
        desc: 'An upcoming 2D platformer set in a cyber-dystopian world.',
        fullDesc: 'A 2D side-scrolling platformer set in a neon-drenched cyber-dystopian world. Planned features: procedural level generation, hand-crafted pixel-art sprites, a chiptune soundtrack, and a deep lore system. Currently in pre-production and early prototyping phase.',
        tags: ['C++', 'GameDev'],
        category: 'game',
        codeUrl: null,
        demoUrl: null,
        wip: true
    },
    {
        id: 'retro-quiz',
        name: 'RETRO_QUIZ.exe',
        desc: 'A terminal-styled quiz app with multiple categories and a local leaderboard.',
        fullDesc: 'Browser-based quiz game built entirely in vanilla JS with a retro terminal interface. Features 5 question categories, a time-pressure mechanic, and a persistent leaderboard stored in localStorage. Built as a deep-dive JavaScript learning exercise.',
        tags: ['JS', 'HTML', 'CSS'],
        category: 'web',
        codeUrl: null,
        demoUrl: null,
        wip: true
    },
    {
        id: 'task-runner',
        name: 'TASK_RUNNER.bat',
        desc: 'A CLI tool to automate repetitive developer workflow tasks.',
        fullDesc: 'Command-line utility written in Python 3. Automates common dev tasks: opinionated Git commit formatting, file & folder scaffolding, and project bootstrapping from YAML templates. Designed to eliminate boilerplate friction from the daily dev workflow.',
        tags: ['Python', 'CLI'],
        category: 'tool',
        codeUrl: null,
        demoUrl: null,
        wip: true
    },
    {
        id: 'platformer-2d',
        name: 'PLATFORMER_2D.bin',
        desc: 'A pixel-art 2D platformer prototype built in Godot 4.',
        fullDesc: 'Prototype 2D platformer built with Godot 4 Engine. Implements smooth coyote-time and jump-buffering mechanics, animated pixel-art sprites exported from Aseprite, tile-based level design, and a basic enemy AI using a state machine pattern. Currently exploring procedural dungeon room generation.',
        tags: ['GDScript', 'Godot', 'GameDev'],
        category: 'game',
        codeUrl: null,
        demoUrl: null,
        wip: true
    }
];

const FILTER_NAMES = {
    all: 'ALL_FILES.sh',
    web: 'WEB_APPS.exe',
    game: 'GAMES.bin',
    tool: 'TOOLS.dat'
};

const PROJECTS_PER_PAGE = 3; // cards shown per page
let projectCurrentPage = 1;

function renderProjects(filter = 'all', query = '', page = 1) {
    const grid = document.getElementById('projects-grid');
    const loadingEl = document.getElementById('project-loading');
    const filterLabel = document.getElementById('dir-filter-label');

    if (!grid) return;

    // Update path bar label
    if (filterLabel) filterLabel.textContent = FILTER_NAMES[filter] || 'ALL_FILES.sh';

    // Show loading, clear grid, remove any old pagination
    if (loadingEl) loadingEl.hidden = false;
    grid.innerHTML = '';
    grid.style.display = 'none';
    document.getElementById('project-pagination')?.remove();

    // Simulate disk read delay for retro feel
    setTimeout(() => {
        if (loadingEl) loadingEl.hidden = true;
        grid.style.display = '';

        const q = query.toLowerCase().trim();
        const allFiltered = PROJECTS_DATA.filter(p => {
            const matchFilter = filter === 'all' || p.category === filter;
            const matchQuery = !q ||
                p.name.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q));
            return matchFilter && matchQuery;
        });

        if (allFiltered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <p>&gt; FILE_NOT_FOUND: No results for "<span class="highlight">${query || filter}</span>"</p>
                    <p class="mt-1">Try a different filter or search term.</p>
                </div>`;
            return;
        }

        // --- Pagination math ---
        const totalPages = Math.max(1, Math.ceil(allFiltered.length / PROJECTS_PER_PAGE));
        const safePage = Math.max(1, Math.min(page, totalPages));
        projectCurrentPage = safePage;

        const startIdx = (safePage - 1) * PROJECTS_PER_PAGE;
        const paged = allFiltered.slice(startIdx, startIdx + PROJECTS_PER_PAGE);

        paged.forEach((project, index) => {
            const card = document.createElement('article');
            card.className = 'project-card card-enter';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for ${project.name}`);
            card.dataset.id = project.id;
            card.style.animationDelay = `${index * 80}ms`;

            const wipBadge = project.wip ? `<span class="wip-badge">[WIP]</span>` : '';
            const tagsHTML = project.tags.map(t => `<div class="tag highlight-tag">${t}</div>`).join('');

            const codeBtn = project.codeUrl
                ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-brands fa-github"></i> CODE</a>`
                : `<button class="pixel-btn" disabled title="Coming Soon"><i class="fa-brands fa-github"></i> CODE</button>`;
            const demoBtn = project.demoUrl
                ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> DEMO</a>`
                : `<button class="pixel-btn" disabled title="Coming Soon"><i class="fa-solid fa-arrow-up-right-from-square"></i> DEMO</button>`;

            card.innerHTML = `
                <div class="card-top">
                    <h4>&gt; ${project.name} ${wipBadge}</h4>
                    <span class="card-expand-hint">[CLICK]</span>
                </div>
                <p>${project.desc}</p>
                <div class="project-tags">${tagsHTML}</div>
                <div class="project-card-footer mt-2">
                    ${codeBtn}
                    ${demoBtn}
                </div>
            `;

            grid.appendChild(card);
        });

        // Bind card click for overlay
        grid.querySelectorAll('.project-card').forEach(card => {
            const handleOpen = (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;
                openProjectOverlay(card.dataset.id);
            };
            card.addEventListener('click', handleOpen);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectOverlay(card.dataset.id);
                }
            });
        });

        // --- Render PREV / NEXT controls (only when needed) ---
        if (totalPages > 1) {
            const pag = document.createElement('div');
            pag.id = 'project-pagination';
            pag.className = 'project-pagination';
            pag.innerHTML = `
                <button class="pixel-btn pag-btn" id="pag-prev"
                    ${safePage <= 1 ? 'disabled' : ''}
                    aria-label="Previous page">[&lt; PREV]</button>
                <span class="pag-status">PAGE&nbsp;${safePage}&nbsp;/&nbsp;${totalPages}</span>
                <button class="pixel-btn pag-btn" id="pag-next"
                    ${safePage >= totalPages ? 'disabled' : ''}
                    aria-label="Next page">[NEXT &gt;]</button>
            `;
            grid.insertAdjacentElement('afterend', pag);

            document.getElementById('pag-prev')?.addEventListener('click', () => {
                renderProjects(filter, query, safePage - 1);
            });
            document.getElementById('pag-next')?.addEventListener('click', () => {
                renderProjects(filter, query, safePage + 1);
            });
        }

    }, 380); // disk-read delay
}

function openProjectOverlay(id) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project) return;

    const overlay = document.getElementById('project-overlay');
    const titleEl = document.getElementById('overlay-title');
    const bodyEl = document.getElementById('overlay-body');
    if (!overlay || !titleEl || !bodyEl) return;

    const wipBadge = project.wip
        ? `<span class="wip-badge">[WIP]</span>`
        : `<span class="status-ok">[ACTIVE]</span>`;
    const tagsHTML = project.tags.map(t => `<div class="tag highlight-tag">${t}</div>`).join('');

    const codeBtn = project.codeUrl
        ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-brands fa-github"></i> VIEW CODE</a>`
        : `<button class="pixel-btn" disabled>NO REPO YET</button>`;
    const demoBtn = project.demoUrl
        ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE DEMO</a>`
        : `<button class="pixel-btn" disabled>NO DEMO YET</button>`;

    titleEl.textContent = `> ${project.name}`;
    bodyEl.innerHTML = `
        <div class="overlay-terminal">
            <p class="term-line"><span class="term-prompt">STATUS&nbsp;&nbsp;:</span>${wipBadge}</p>
            <p class="term-line"><span class="term-prompt">CATEGORY:</span><span>${project.category.toUpperCase()}</span></p>
            <p class="term-desc">${project.fullDesc}</p>
            <div class="term-tags">${tagsHTML}</div>
            <div class="term-actions">${codeBtn}${demoBtn}</div>
        </div>
    `;

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('overlay-close')?.focus();
}

function closeProjectOverlay() {
    const overlay = document.getElementById('project-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Initial render — show all projects
    renderProjects('all', '');

    // Filter button clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const query = document.getElementById('project-search')?.value.trim() || '';
            renderProjects(filter, query);
        });
    });

    // Search input (debounced 280ms)
    let searchTimer = null;
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
                renderProjects(activeFilter, searchInput.value.trim());
            }, 280);
        });
    }

    // Overlay: close button
    document.getElementById('overlay-close')?.addEventListener('click', closeProjectOverlay);

    // Overlay: backdrop click
    document.getElementById('project-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeProjectOverlay();
    });

    // Overlay: Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectOverlay();
    });
});

/* ===========================
   11. MOUSE TRAIL
   =========================== */
function initMouseTrail() {
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

window.addEventListener('load', initMouseTrail);
