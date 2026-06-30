// ======================================
// TintMaster Pro
// Calculator Engine
// ======================================

let currentColour = null;

let editing = false;

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

const pigments = [

    { key:"red", label:"🔴 Red Pigment", class:"red" },

    { key:"yellow", label:"🟡 Yellow Pigment", class:"yellow" },

    { key:"blue", label:"🔵 Blue Pigment", class:"blue" },

    { key:"green", label:"🟢 Green Pigment", class:"green" },

    { key:"black", label:"⚫ Black Pigment", class:"black" }

];

let html = "";

pigments.forEach(p=>{

    html += `

    <div class="formulaBar">

        <div class="formulaTitle">

            <span>${p.label}</span>

            <span>

                ${
                    editing
                    ?

                    `<input
                        id="${p.key}Input"
                        type="number"
                        value="${values[p.key].toFixed(2)}"
                        step="0.5"
                        min="0"
                        class="formulaInput">`

                    :

                    `${values[p.key].toFixed(2)} ml • ${percent[p.key]}%`

                }

            </span>

        </div>

        <div class="progress">

            <div
                class="progressFill ${p.class}"
                style="width:${percent[p.key]}%">
            </div>

        </div>

    </div>

    `;

});

document.getElementById("formulaBars").innerHTML = html;
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