/* ===========================
   PROJECT EXPLORER
   =========================== */
let PROJECTS_DATA = [];

const PROJECTS_PER_PAGE = 3; // cards shown per page
let projectCurrentPage = 1;

async function loadProjectsData() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    try {
        const response = await fetch('data/projects.json', { signal: controller.signal });
        clearTimeout(timeoutId);
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
                    <p>&gt; ${I18N.get('projects.error')}</p>
                    <button class="pixel-btn mt-2" id="retry-btn" style="width:auto">
                        <i class="fa-solid fa-rotate-right"></i> ${I18N.get('projects.retry')}
                    </button>
                </div>`;
            document.getElementById('retry-btn')
                ?.addEventListener('click', loadProjectsData);
        }
    }
}

function getProjectDesc(project) {
    const lang = I18N.getLang();
    return project[`desc_${lang}`] || project.desc || '';
}

function getProjectFullDesc(project) {
    const lang = I18N.getLang();
    return project[`fullDesc_${lang}`] || project.fullDesc || '';
}

function getProjectName(project) {
    const lang = I18N.getLang();
    return project[`name_${lang}`] || project.name || '';
}

function renderProjects(filter = 'all', query = '', page = 1) {
    const grid = document.getElementById('projects-grid');
    const loadingEl = document.getElementById('project-loading');
    const filterLabel = document.getElementById('dir-filter-label');

    if (!grid) return;

    // Update path bar label using i18n
    if (filterLabel) {
        const labelKey = `projects.filter_${filter}`;
        filterLabel.textContent = I18N.get(labelKey) || 'ALL_FILES.sh';
    }

    // Show loading, clear grid, remove any old pagination
    if (loadingEl) {
        loadingEl.hidden = false;
        loadingEl.className = 'projects-grid';
        loadingEl.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        `;
    }
    grid.innerHTML = '';
    grid.style.display = 'none';
    document.getElementById('project-pagination')?.remove();

    setTimeout(() => {
        if (loadingEl) {
            loadingEl.hidden = true;
            loadingEl.innerHTML = '';
            loadingEl.className = '';
        }
        grid.style.display = '';

        const q = query.toLowerCase().trim();
        const allFiltered = PROJECTS_DATA.filter(p => {
            const matchFilter = filter === 'all' || p.category === filter;
            const name = getProjectName(p).toLowerCase();
            const desc = getProjectDesc(p).toLowerCase();
            const matchQuery = !q ||
                name.includes(q) ||
                desc.includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q));
            return matchFilter && matchQuery;
        });

        if (allFiltered.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <p>&gt; ${I18N.get('projects.not_found')} "<span class="highlight">${query || filter}</span>"</p>
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
            card.setAttribute('aria-label', `View details for ${getProjectName(project)}`);
            card.dataset.id = project.id;
            card.style.animationDelay = `${index * 80}ms`;

            const wipBadge = project.wip ? `<span class="wip-badge">[${I18N.get('projects.wip')}]</span>` : '';
            const tagsHTML = project.tags.map(t => `<div class="tag highlight-tag">${t}</div>`).join('');

            const codeBtn = project.codeUrl
                ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-brands fa-github"></i> ${I18N.get('projects.code')}</a>`
                : `<button class="pixel-btn" disabled title="Coming Soon"><i class="fa-brands fa-github"></i> ${I18N.get('projects.code')}</button>`;
            const demoBtn = project.demoUrl
                ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${I18N.get('projects.demo')}</a>`
                : `<button class="pixel-btn" disabled title="Coming Soon"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${I18N.get('projects.demo')}</button>`;

            card.innerHTML = `
                <div class="card-top">
                    <h4>&gt; ${getProjectName(project)} ${wipBadge}</h4>
                    <span class="card-expand-hint">[CLICK]</span>
                </div>
                <p>${getProjectDesc(project)}</p>
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
                    aria-label="Previous page">${I18N.get('projects.prev')}</button>
                <span class="pag-status">${I18N.get('projects.page')}&nbsp;${safePage}&nbsp;/&nbsp;${totalPages}</span>
                <button class="pixel-btn pag-btn" id="pag-next"
                    ${safePage >= totalPages ? 'disabled' : ''}
                    aria-label="Next page">${I18N.get('projects.next')}</button>
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
        ? `<span class="wip-badge">[${I18N.get('projects.wip')}]</span>`
        : `<span class="status-ok">${I18N.get('overlay.active')}</span>`;
    const tagsHTML = project.tags.map(t => `<div class="tag highlight-tag">${t}</div>`).join('');

    const codeBtn = project.codeUrl
        ? `<a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-brands fa-github"></i> ${I18N.get('overlay.view_code')}</a>`
        : `<button class="pixel-btn" disabled>${I18N.get('overlay.no_repo')}</button>`;
    const demoBtn = project.demoUrl
        ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="pixel-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${I18N.get('overlay.live_demo')}</a>`
        : `<button class="pixel-btn" disabled>${I18N.get('overlay.no_demo')}</button>`;

    titleEl.textContent = `> ${getProjectName(project)}`;
    bodyEl.innerHTML = `
        <div class="overlay-terminal">
            <p class="term-line"><span class="term-prompt">${I18N.get('overlay.status')}&nbsp;&nbsp;:</span>${wipBadge}</p>
            <p class="term-line"><span class="term-prompt">${I18N.get('overlay.category')}:</span><span>${project.category.toUpperCase()}</span></p>
            <p class="term-desc">${getProjectFullDesc(project)}</p>
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

        // Re-render on lang change
        document.addEventListener('langChanged', () => {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
            const query = document.getElementById('project-search')?.value.trim() || '';
            renderProjects(activeFilter, query, projectCurrentPage);
        });
    }

    return { init };
})();
