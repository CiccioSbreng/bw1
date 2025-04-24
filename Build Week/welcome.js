// recupero il bottone di proceed
const proceedButton = document.getElementById("proceed");

// disabilito il bottone di proceed inizialmente
proceedButton.setAttribute("disabled", true);
// recupero il checkbox, ogni volta che viene flaggato o de-flaggato
window.addEventListener("change", enableProceed); 

//funzione per abilitare o disabilitare il bottone di proceed
function enableProceed() {
    if (document.getElementById("toCheck").checked) {
        proceedButton.removeAttribute("disabled");
    }
    else 
        proceedButton.setAttribute("disabled", true);
    
}

proceedButton.addEventListener("click", proceed); //aggiungo l'evento al bottone di proceed

//funzione per il click del bottone di proceed
function proceed() {
    window.location.href = "Pagina-esame.html";
}