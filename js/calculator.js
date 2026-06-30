// ======================================
// TintMaster Pro
// Calculator Engine
// ======================================

let currentColour = null;

// Set the active colour when the modal opens
function setCurrentColour(colour) {
    currentColour = colour;
    updateFormula(20);
}

// Calculate and display the formula
function updateFormula(litres) {

    if (!currentColour) return;

    const factor = litres / 20;

    document.getElementById("redFormula").textContent =
        (currentColour.formula20L.red * factor).toFixed(2) + " ml";

    document.getElementById("yellowFormula").textContent =
        (currentColour.formula20L.yellow * factor).toFixed(2) + " ml";

    document.getElementById("blueFormula").textContent =
        (currentColour.formula20L.blue * factor).toFixed(2) + " ml";

    document.getElementById("greenFormula").textContent =
        (currentColour.formula20L.green * factor).toFixed(2) + " ml";

    document.getElementById("blackFormula").textContent =
        (currentColour.formula20L.black * factor).toFixed(2) + " ml";
}

// Standard bucket size selector
document.addEventListener("change", function (e) {

    if (e.target.id === "bucketSize") {

        const litres = Number(e.target.value);

        document.getElementById("customLitres").value = "";

        updateFormula(litres);

    }

});

// Custom litre input
document.addEventListener("input", function (e) {

    if (e.target.id === "customLitres") {

        const litres = Number(e.target.value);

        if (litres > 0) {

            updateFormula(litres);

        }

    }

});