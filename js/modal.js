// ===================================
// TintMaster Pro
// Formula Modal
// ===================================

const modalHTML = `
<div id="formulaModal" class="modal hidden">

    <div class="modal-box">

        <button class="close-button" id="closeModal">
            ×
        </button>

        <div class="modal-header">

    <div id="modalColour" class="paint-card">

        <div class="paint-info">

            <h2 id="modalTitle"></h2>

            <p id="modalCode"></p>

        </div>

    </div>

    <span id="modalFamily" class="family-badge"></span>

</div>


        <p id="modalFamily"></p>

        <hr>

        <h3>Formula (20 Litres)</h3>

  
        <div id="formulaBars"></div>

        

<hr>

<h3>Mixing Calculator</h3>

<label for="bucketSize">
Bucket Size
</label>

<select id="bucketSize">

<option value="1">1 L</option>

<option value="4">4 L</option>

<option value="5">5 L</option>

<option value="10">10 L</option>

<option value="20" selected>20 L</option>

<option value="50">50 L</option>

<option value="100">100 L</option>

</select>

<p style="margin-top:15px;font-weight:bold;">
Or Custom Litres
</p>

<input
type="number"
id="customLitres"
placeholder="Example: 7.5"
min="0.1"
step="0.1">

<hr>

<h3>Notes</h3>

<p id="modalNotes"></p>

<div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">

<button id="editFormulaBtn">

✏ Edit Formula

</button>

<button id="copyFormulaBtn">

📋 Copy Formula

</button>

<button id="exportBtn">

📤 Export

</button>

</div>

    </div>

</div>
`;

document.body.insertAdjacentHTML("beforeend", modalHTML);

const modal = document.getElementById("formulaModal");

function openModal(colour){

    document.getElementById("modalColour").style.background =
        colour.preview;

    document.getElementById("modalTitle").textContent =
        colour.name;

    document.getElementById("modalCode").textContent =
        "Code: " + colour.code;

    const familyBadge = document.getElementById("modalFamily");

familyBadge.textContent = colour.family.toUpperCase();

// Give each family its own colour
const familyColours = {

    "RED":"#d32f2f",

    "BLUE":"#1976d2",

    "GREEN":"#43a047",

    "YELLOW":"#fbc02d",

    "ORANGE":"#f57c00",

    "BROWN":"#795548",

    "GREY":"#757575",

    "GRAY":"#757575",

    "BLACK":"#212121",

    "WHITE":"#9e9e9e",

    "PURPLE":"#7b1fa2",

    "PINK":"#e91e63"

};

// Default colour if family isn't listed
familyBadge.style.background =
    familyColours[colour.family.toUpperCase()] || "#1976d2";

// Reset calculator controls
document.getElementById("bucketSize").value = "20";
document.getElementById("customLitres").value = "";

// Load the colour into the calculator
setCurrentColour(colour);

document.getElementById("modalNotes").textContent =
    colour.notes;

// Store current colour for editing
window.currentColour = colour;

// Enable Edit button
document.getElementById("editFormulaBtn").onclick = enableEditing; document.getElementById("exportBtn").onclick =
    exportDatabase;

modal.classList.remove("hidden");

}

document.getElementById("closeModal").onclick = function(){

    modal.classList.add("hidden");

};

modal.onclick = function(e){

    if(e.target === modal){

        modal.classList.add("hidden");

    }

};

// =======================================
// Enable Formula Editing
// =======================================

function enableEditing(){

    const fields = [

        "red",
        "yellow",
        "blue",
        "green",
        "black"

    ];

    fields.forEach(colour=>{

        const td = document.getElementById(colour + "Formula");

        const value = parseFloat(td.textContent);

        td.innerHTML = `

        <input
            type="number"
            id="${colour}Input"
            value="${value}"
            step="0.5"
            min="0"
            style="
                width:70px;
                padding:4px;
                text-align:center;
            ">

        `;

    });

    document.getElementById("editFormulaBtn").innerHTML =
        "💾 Save Formula";

    document.getElementById("editFormulaBtn").onclick =
        saveFormula;

}

// =======================================
// Save Edited Formula
// =======================================

function saveFormula() {

    const colour = window.currentColour;

    // Read values from the input boxes
    colour.formula20L.red =
        Number(document.getElementById("redInput").value);

    colour.formula20L.yellow =
        Number(document.getElementById("yellowInput").value);

    colour.formula20L.blue =
        Number(document.getElementById("blueInput").value);

    colour.formula20L.green =
        Number(document.getElementById("greenInput").value);

    colour.formula20L.black =
        Number(document.getElementById("blackInput").value);

    // Refresh the calculator display
    setCurrentColour(colour);

    // Save all colours to Local Storage
    saveColours(window.colours);

    // Restore Notes
    document.getElementById("modalNotes").textContent =
        colour.notes;

    // Restore Edit button
    document.getElementById("editFormulaBtn").innerHTML =
        "✏ Edit Formula";

    document.getElementById("editFormulaBtn").onclick =
        enableEditing;

}