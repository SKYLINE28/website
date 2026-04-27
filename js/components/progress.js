document.addEventListener("DOMContentLoaded", function () {
    const loadingText = document.getElementById("loading-text");
    const loadingBar = document.getElementById("loading-bar");
    const percentageText = document.getElementById("loading-percentage");

    if (!loadingBar || !percentageText) return;

    let progress = 0;
    const maxProgress = 100;
    const barLength = 20;

    function updateLoading() {
        progress += Math.floor(Math.random() * 5); // Add random speed to simulate loading
        if (progress > maxProgress) {
            progress = 0; // Loop progress forever as an "under construction" loop
        }

        const filledBars = Math.floor((progress / 100) * barLength);
        const emptyBars = barLength - filledBars;

        const filledString = "█".repeat(filledBars);
        const emptyString = "░".repeat(emptyBars);

        loadingBar.textContent = `[${filledString}${emptyString}]`;
        percentageText.textContent = `${progress}%`;

        // Retro janky load speed simulation
        setTimeout(updateLoading, Math.random() * 300 + 50);
    }

    updateLoading();

    // Simple blinking cursor effect for text
    setInterval(() => {
        if (loadingText) {
            if (loadingText.textContent.endsWith("_")) {
                loadingText.textContent = "> SYSTEM_UPGRADING";
            } else {
                loadingText.textContent = "> SYSTEM_UPGRADING_";
            }
        }
    }, 600);
});
