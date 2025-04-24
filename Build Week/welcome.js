let proceedBtn = document.getElementById("proceed");
window.onload
document.getElementById("proceed").setAttribute("disabled", "true");

let controlCheckBox = document.getElementById("toCheck");

//event listener per il checkbox, se è flaggato, button abilitato
controlCheckBox.addEventListener("change", enableProceedButton);

//Abilita il button proceed solo se il checkbox è selezionato
function enableProceedButton() {
    if (controlCheckBox.checked) {
        proceedBtn.removeAttribute("disabled");
    } else {
        proceedBtn.setAttribute("disabled", "true");
    }
}

proceedBtn.addEventListener("click", showNextPage); 

function showNextPage() {
    window.location.href = "Pagina-esame.html";
}