/* ===========================
   MAIN — Entry Point
   =========================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Init i18n immediately (before DOM ready) to prevent flash
I18N.init();

document.addEventListener('DOMContentLoaded', function () {
    // i18n must be first
    LangSwitcher.init();
    I18N.applyTranslations();

    // Core modules
    ThemeManager.init();
    NavManager.init();
    ScrollManager.init();
    RevealManager.init(prefersReducedMotion);
    ClipboardManager.init();

    if (typeof TypewriterEffect !== 'undefined') TypewriterEffect.init();
    if (typeof ProjectExplorer !== 'undefined') ProjectExplorer.init();
    if (typeof CounterAnimations !== 'undefined') CounterAnimations.init();
    if (typeof TerminalEasterEgg !== 'undefined') TerminalEasterEgg.init();
    if (typeof KonamiCode !== 'undefined') KonamiCode.init();
});

window.addEventListener('load', function () {
    if (typeof ParticlesManager !== 'undefined') ParticlesManager.init(prefersReducedMotion);
    if (typeof MouseTrailManager !== 'undefined') MouseTrailManager.init(prefersReducedMotion);
    if (typeof FireworksManager !== 'undefined') FireworksManager.init(prefersReducedMotion);
});
