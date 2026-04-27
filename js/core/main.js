/* ===========================
   MAIN — Entry Point
   =========================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function () {
    // Core modules — every page
    ThemeManager.init();
    NavManager.init();
    ScrollManager.init();
    RevealManager.init(prefersReducedMotion);
    ClipboardManager.init();

    // Page-specific: typewriter (only on index)
    if (typeof TypewriterEffect !== 'undefined') {
        TypewriterEffect.init();
    }

    // Page-specific: projects (only on index)
    if (typeof ProjectExplorer !== 'undefined') {
        ProjectExplorer.init();
    }

    // Page-specific: counter animations (only on index)
    if (typeof CounterAnimations !== 'undefined') {
        CounterAnimations.init();
    }

    // Easter eggs
    if (typeof TerminalEasterEgg !== 'undefined') {
        TerminalEasterEgg.init();
    }
    if (typeof KonamiCode !== 'undefined') {
        KonamiCode.init();
    }
});

window.addEventListener('load', function () {
    // Visual effects — load after page is fully ready
    if (typeof ParticlesManager !== 'undefined') {
        ParticlesManager.init(prefersReducedMotion);
    }
    if (typeof MouseTrailManager !== 'undefined') {
        MouseTrailManager.init(prefersReducedMotion);
    }
    if (typeof FireworksManager !== 'undefined') {
        FireworksManager.init(prefersReducedMotion);
    }
});
