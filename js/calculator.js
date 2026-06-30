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

const max = Math.max(...Object.values(values),1);

document.getElementById("formulaBars").innerHTML = `

<div class="formulaBar">

<div class="formulaTitle">
🔴 Red
<span>${values.red.toFixed(2)} ml</span>
</div>

<div class="progress">
<div class="progressFill red"
style="width:${values.red/max*100}%"></div>
</div>

</div>

<div class="formulaBar">

<div class="formulaTitle">
🟡 Yellow
<span>${values.yellow.toFixed(2)} ml</span>
</div>

<div class="progress">
<div class="progressFill yellow"
style="width:${values.yellow/max*100}%"></div>
</div>

</div>

<div class="formulaBar">

<div class="formulaTitle">
🔵 Blue
<span>${values.blue.toFixed(2)} ml</span>
</div>

<div class="progress">
<div class="progressFill blue"
style="width:${values.blue/max*100}%"></div>
</div>

</div>

<div class="formulaBar">

<div class="formulaTitle">
🟢 Green
<span>${values.green.toFixed(2)} ml</span>
</div>

<div class="progress">
<div class="progressFill green"
style="width:${values.green/max*100}%"></div>
</div>

</div>

<div class="formulaBar">

<div class="formulaTitle">
⚫ Black
<span>${values.black.toFixed(2)} ml</span>
</div>

<div class="progress">
<div class="progressFill black"
style="width:${values.black/max*100}%"></div>
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