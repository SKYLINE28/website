/* ===========================
   TYPEWRITER EFFECT
   =========================== */
const TypewriterEffect = (function () {
    const typingDelay = 100;
    const erasingDelay = 70;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function getTexts() {
        return [
            I18N.get('typewriter.0'),
            I18N.get('typewriter.1'),
            I18N.get('typewriter.2'),
            I18N.get('typewriter.3'),
        ];
    }

    function type() {
        const el = document.getElementById("typewriter");
        if (!el) return;
        const texts = getTexts();
        if (charIndex < texts[textArrayIndex].length) {
            el.textContent += texts[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        const el = document.getElementById("typewriter");
        if (!el) return;
        const texts = getTexts();
        if (charIndex > 0) {
            el.textContent = texts[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex = (textArrayIndex + 1) % getTexts().length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    function init() {
        if (document.getElementById("typewriter")) setTimeout(type, newTextDelay + 250);
        // Restart on lang change
        document.addEventListener('langChanged', () => {
            const el = document.getElementById("typewriter");
            if (el) { el.textContent = ''; textArrayIndex = 0; charIndex = 0; }
            setTimeout(type, 300);
        });
    }

    return { init };
})();
