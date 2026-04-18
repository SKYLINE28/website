/* ===========================
   PROJECT EXPLORER
   =========================== */
let PROJECTS_DATA = [];

const FILTER_NAMES = {
    all: 'ALL_FILES.sh',
    web: 'WEB_APPS.exe',
    game: 'GAMES.bin'
};

const PROJECTS_PER_PAGE = 3; // cards shown per page
let projectCurrentPage = 1;

async function loadProjectsData() {
    try {
        const response = await fetch('data/projects.json');
        PROJECTS_DATA = await response.json();
        document.dispatchEvent(
            new CustomEvent('projectsLoaded', { detail: PROJECTS_DATA })
        );
        renderProjects('all', '');
    } catch (error) {
        console.error('Error loading projects data:', error);
        const grid = document.getElementById('projects-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="no-results">
                    <p>&gt; ERROR: Failed to load project data.</p>
                    <button class="pixel-btn mt-2" id="retry-btn" style="width:auto">
                        <i class="fa-solid fa-rotate-right"></i> RETRY
                    </button>
                </div>`;
            document.getElementById('retry-btn')
                ?.addEventListener('click', loadProjectsData);
        }
    }
}

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

    // Touch swipe to close overlay (mobile UX)
    const inner = overlay.querySelector('.project-overlay-inner');
    let touchStartY = 0;

    function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function onTouchEnd(e) {
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (deltaY > 60) { // swipe down more than 60px
            closeProjectOverlay();
            inner.removeEventListener('touchstart', onTouchStart);
            inner.removeEventListener('touchend', onTouchEnd);
        }
    }

    inner.addEventListener('touchstart', onTouchStart, { passive: true });
    inner.addEventListener('touchend', onTouchEnd, { passive: true });
}

function closeProjectOverlay() {
    const overlay = document.getElementById('project-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
}

const ProjectExplorer = (function () {
    function init() {
        // Initial render — show all projects
        loadProjectsData();

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

        // Search clear button
        const clearBtn = document.getElementById('search-clear-btn');

        if (searchInput && clearBtn) {
            searchInput.addEventListener('input', () => {
                clearBtn.hidden = searchInput.value.length === 0;
            });

            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                clearBtn.hidden = true;
                searchInput.focus();
                const activeFilter = document.querySelector(
                    '.filter-btn.active'
                )?.dataset.filter || 'all';
                renderProjects(activeFilter, '');
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
    }

    return { init };
})();
