/* ===========================
   LANGUAGE SWITCHER COMPONENT
   =========================== */
const LangSwitcher = (function() {
    const FLAGS = { id: '🇮🇩', en: '🇬🇧', ja: '🇯🇵' };
    const LABELS = { id: 'ID', en: 'EN', ja: '日本語' };

    function init() {
        const nav = document.getElementById('drop-menu');
        if (!nav) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'lang-switcher';
        wrapper.innerHTML = `
            <div class="lang-label">> LANGUAGE.cfg</div>
            <div class="lang-buttons">
                ${I18N.SUPPORTED_LANGS.map(lang => `
                    <button class="pixel-btn lang-btn ${I18N.getLang() === lang ? 'active' : ''}"
                            data-lang="${lang}" aria-label="Switch to ${LABELS[lang]}">
                        ${FLAGS[lang]} ${LABELS[lang]}
                    </button>
                `).join('')}
            </div>
        `;

        nav.insertBefore(wrapper, nav.firstChild);

        wrapper.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                I18N.setLang(lang);
                wrapper.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        document.addEventListener('langChanged', () => {
            wrapper.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-lang') === I18N.getLang());
            });
        });
    }

    return { init };
})();
