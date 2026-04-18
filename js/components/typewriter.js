/* ===========================
   TYPEWRITER EFFECT
   =========================== */
const TypewriterEffect = (function () {
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

    function init() {
        if (document.getElementById("typewriter") && textArray.length) {
            setTimeout(type, newTextDelay + 250);
        }
    }

    return { init };
})();
