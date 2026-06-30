// ======================================
// TintMaster Pro Storage System
// ======================================

const STORAGE_KEY = "tintmasterColours";

// Save colours

function saveColours(colours){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(colours)

    );

}

// Load colours

function loadSavedColours(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(data){

        return JSON.parse(data);

    }

    return null;

}

// Delete saved data

function resetColours(){

    localStorage.removeItem(STORAGE_KEY);

}