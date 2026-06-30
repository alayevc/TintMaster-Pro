// ======================================
// TintMaster Pro v0.3
// App Logic
// ======================================

// Global colour database
window.colours = [];

const colourGrid = document.getElementById("colourGrid");
const searchInput = document.getElementById("search");

// ======================================
// Load colour database
// ======================================

async function loadColours() {

    try {

        const response = await fetch("data/colours.json");
        const data = await response.json();

        // Load saved formulas if they exist
        const saved = loadSavedColours();

        if (saved) {
            window.colours = saved;
        } else {
            window.colours = data;
        }

        displayColours(window.colours);

    } catch (error) {

        console.error(error);

        colourGrid.innerHTML = `
            <h2>Unable to load colour database.</h2>
        `;

    }

}

// ======================================
// Display Colour Cards
// ======================================

function displayColours(list) {

    colourGrid.innerHTML = "";

    if (list.length === 0) {

        colourGrid.innerHTML = `
            <h2>No colours found.</h2>
        `;

        return;

    }

    list.forEach(colour => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="preview"
                style="background:${colour.preview}">
            </div>

            <div class="info">

                <h3>${colour.name}</h3>

                <p><strong>Code:</strong> ${colour.code}</p>

                <span class="badge">
                    ${colour.family}
                </span>

            </div>

        `;

        card.onclick = () => openModal(colour);

        colourGrid.appendChild(card);

    });

}

// ======================================
// Search
// ======================================

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const filtered = window.colours.filter(colour =>

        colour.name.toLowerCase().includes(keyword) ||

        colour.code.toLowerCase().includes(keyword) ||

        colour.family.toLowerCase().includes(keyword)

    );

    displayColours(filtered);

});

// ======================================
// Start App
// ======================================

loadColours();