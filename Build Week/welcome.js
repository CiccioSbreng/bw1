let proceedBtn = document.getElementById("proceed");
document.getElementById("proceed").setAttribute("disabled", "true");

//event listener per mettere di default il button disabled
window.addEventListener("load",enableProceedButton);

let controlCheckBox = document.getElementById("toCheck");
//event listener per il checkbox, se è flaggato, button abilitato e popup non visibile

controlCheckBox.addEventListener("change", alreadyFlagged);
controlCheckBox.addEventListener("change", enableProceedButton);
proceedBtn.addEventListener("click", showNextPage);
//messaggio di aiuto all'utente per procedere con l'esame



//Abilita il button proceed solo se il checkbox è selezionato
function enableProceedButton() {
    if (controlCheckBox.checked) {
        proceedBtn.classList.remove("disabled");
        proceedBtn.removeAttribute("disabled");
        document.getElementById("proceed").style.cursor = "pointer";
    } else {
        proceedBtn.classList.add("disabled");
        proceedBtn.setAttribute("disabled", "true");
        document.getElementById("proceed").style.cursor = "not-allowed";

    }  
}
//Mostra il popup se la checkbox non è selezionata
function alreadyFlagged() {
    if (controlCheckBox.checked) {
        document.getElementById("popupText").style.display = "none";
    } else {
        document.getElementById("popupText").style.display = "flex";
    }
}

function showNextPage() {
    window.location.href = "Pagina-esame.html";
}