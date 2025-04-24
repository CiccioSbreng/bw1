let proceedBtn = document.getElementById("proceed");
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

//messaggio di aiuto all'utente per procedere con l'esame
proceedBtn.addEventListener("mouseover", obbligoFlag);

function showNextPage() {
    window.location.href = "Pagina-esame.html";
}

//funzione per far apparire un messaggino di errore
function obbligoFlag() {
    if (controlCheckBox.checked) 
        proceedBtn.removeAttribute("title");
    
    else
        proceedBtn.setAttribute("title", "Devi confermare che eseguirai l'esame senza aiuti esterni!");
    
}   