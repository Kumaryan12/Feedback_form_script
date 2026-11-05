
(() => {
    const groups = new Map();

    // Collect radio buttons, grouped by question
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (!radio.name || radio.disabled) return;

        if (!groups.has(radio.name)) {
            groups.set(radio.name, []);
        }

        groups.get(radio.name).push(radio);
    });

    let filled = 0;
    let skipped = 0;

    groups.forEach((radios, question) => {
        if (radios.length !== 5) {
            skipped++;
            return;
        }

        // Find the option representing rating 5
        let target = radios.find(r => {
            const label = Array.from(r.labels || [])
                .map(l => l.textContent.trim());

            return r.value === "5" || label.includes("5");
        });

        // Fallback only if labels confirm the 1-5 order
        if (!target) {
            const labels = radios.map(r =>
                Array.from(r.labels || [])
                    .map(l => l.textContent.trim())
                    .join("")
            );

            if (labels.every((v, i) => v === String(i + 1))) {
                target = radios[4];
            }
        }

        if (target) {
            target.click();
            filled++;
        } else {
            skipped++;
        }
    });

    console.log("✅ Rating questions filled:", filled);
    console.log("⚠️ Groups skipped:", skipped);
    console.log("Review the answers before submitting.");
})();
