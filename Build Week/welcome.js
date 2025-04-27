let proceedBtn = document.getElementById("proceed");
document.getElementById("proceed").setAttribute("disabled", "true");


let controlCheckBox = document.getElementById("toCheck");

//event listener per mettere di default il button disabled
window.addEventListener("load",enableProceedButton);

//event listener per la checkbox, se è flaggato, button abilitato e popup non visibile
controlCheckBox.addEventListener("change", alreadyFlagged);
controlCheckBox.addEventListener("change", enableProceedButton);
//event listener per collegare la pagina del test
proceedBtn.addEventListener("click", () => {
    window.location.href = "Pagina-esame.html";
});


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

