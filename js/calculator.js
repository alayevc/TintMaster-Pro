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

    const values = {

    red: currentColour.formula20L.red * factor,

    yellow: currentColour.formula20L.yellow * factor,

    blue: currentColour.formula20L.blue * factor,

    green: currentColour.formula20L.green * factor,

    black: currentColour.formula20L.black * factor

};

const total = Object.values(values).reduce((sum, value) => sum + value, 0);

const percent = {

    red: total ? (values.red / total * 100).toFixed(0) : 0,

    yellow: total ? (values.yellow / total * 100).toFixed(0) : 0,

    blue: total ? (values.blue / total * 100).toFixed(0) : 0,

    green: total ? (values.green / total * 100).toFixed(0) : 0,

    black: total ? (values.black / total * 100).toFixed(0) : 0

};

document.getElementById("formulaBars").innerHTML = `

<div class="formulaBar">

    <div class="formulaTitle">

        <span>🔴 Red Pigment</span>

        <span>${values.red.toFixed(2)} ml • ${percent.red}%</span>

    </div>

    <div class="progress">

        <div
            class="progressFill red"
            style="width:${percent.red}%">
        </div>

    </div>

</div>

<div class="formulaBar">

    <div class="formulaTitle">

        <span>🟡 Yellow Pigment</span>

        <span>${values.yellow.toFixed(2)} ml • ${percent.yellow}%</span>

    </div>

    <div class="progress">

        <div
            class="progressFill yellow"
            style="width:${percent.yellow}%">
        </div>

    </div>

</div>

<div class="formulaBar">

    <div class="formulaTitle">

        <span>🔵 Blue Pigment</span>

        <span>${values.blue.toFixed(2)} ml • ${percent.blue}%</span>

    </div>

    <div class="progress">

        <div
            class="progressFill blue"
            style="width:${percent.blue}%">
        </div>

    </div>

</div>

<div class="formulaBar">

    <div class="formulaTitle">

        <span>🟢 Green Pigment</span>

        <span>${values.green.toFixed(2)} ml • ${percent.green}%</span>

    </div>

    <div class="progress">

        <div
            class="progressFill green"
            style="width:${percent.green}%">
        </div>

    </div>

</div>

<div class="formulaBar">

    <div class="formulaTitle">

        <span>⚫ Black Pigment</span>

        <span>${values.black.toFixed(2)} ml • ${percent.black}%</span>

    </div>

    <div class="progress">

        <div
            class="progressFill black"
            style="width:${percent.black}%">
        </div>

    </div>

</div>

`;
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