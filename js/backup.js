// =======================================
// TintMaster Pro Backup System
// =======================================

// Export all colours

function exportDatabase(){

    const data = JSON.stringify(window.colours, null, 2);

    const blob = new Blob([data], {

        type: "application/json"

    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "TintMaster_Backup.json";

    link.click();

    URL.revokeObjectURL(url);

}