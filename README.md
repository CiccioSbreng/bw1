# DESCRIZIONE PROGETTO
**SPECIFICA:** creazione e gestione di una pagina di quiz, con timer e contatore per risposte corrette
## DESCRIZIONE FILE
### WELCOME
- #### [welcome.html]([url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/Welcome.html))
  Pagina di landing, con spiegazione e regole del test.
  Per cominciare, è necesario spuntare una checkbox: 
  - non flaggata: il bottone per cominicare il test non è abilitato e appare un popup che dice di spuntarla;
  - flaggata: il bottone è abilitato e fa partire la prova, il popup nonappare

- #### [styleWelcome.css]([url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/styleWelcome.css))
  Foglio che si occupa dello stile della pagina

- #### [welcome.js]([url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/welcome.js))
  Vari event listener che si occupano del comportamento della pagina. 
  - `function enableProceedButton()`  abilita il bottone per andare avanti solo se la checkbox è spuntata
  - `function alreadyFlagged()` mostra il popup solo se la checkbox non è spuntata

### PAGINA ESAME
- #### [Pagina-esame.html]([url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/Pagina-esame.html))
  Pagina che contiene sia il div delle domande che quello per la pagina finale; abbiamo preferito usare questo
  approccio per una questione di comodità, in quanto il passaggio delle variabili da una pagina all'altra si è
  rivelato particolarmente problematico. Poi con una funzione viene assegnato `display: none` o `display: flex`
  in abse a quale deve essere visualizzato. L'header invece è condiviso.
  - `div#contaier` è il div col contenuto delle domande e delle risposte.
    - Per le risposte sono stati usati dei radio button racchiusi in una label
    - A piè di pagina c'è l'indicatore della domanda corrente
    - Per l'animazione del timer è stato usato il tag `<svg>` e due tag `<circle>`, uno per il cerchio esterno e
      uno per l'avanzamento del tempo
  - `div#finalPage` è il div con il punteggio finale e un messaggio conseguente al risultato.
    - Il risultato appare solo a fine test
  - #### [paginaEsame.css]([url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/paginaEsame.css))
    Pagina di stile
  - #### [questions3.js](url](https://github.com/CiccioSbreng/bw1/blob/main/Build%20Week/quesitons3.js))
    - **TIMER**:
      Ad ogni secondo viene invocata setInterval per farlo aggiornare, sia il tempo rimanente che il colore
      del cerchio d'avanzamento in base al tempo rimasto (verde -> arancione -> rosso).
      Torna a zero se il tempo scade o se l'utente passa alla domanda succcessiva (solo se ha selezionato
      almeno una risposta).
      Quando si passa alla pagina finale invece viene fermato definitivamente e viene nascosto.
    - **RANDOM**:
      Sia le domande che le risposte ad esse associate vengono mostrate in ordine casuale. Questa funzione è
      implementata da `myRandomArray(length)` che ritorna un array con indici random di lunghezza _length_.
    - `fillPage()` riempie la pagina ogni volta che viene schiacciato il button o finisce il timer
    - `setQuestionRandom()` mostra una domanda in ordine random
    - `setAnswerRandom()` mostra le risposte alla domanda a cui sono associate tutte in ordine casuale, cambiando
      _value_ per i radio button e _.innerText_ per le label
    - `checkAnswer()` controlla se la risposta è giusta o sbagliata, e in caso incrementa il contatore
    - `myRandomArray(length)`
      - _length_: lunghezza dell'array da generare
      - usa un array di booleani di appoggio per verificare le posizioni libere
    - `showFinalPage()`
        - fa scomparire _div#container_
        - fa comparire _div#finalPage_ e lo popola col risultato ottenuto; di conseguenza appaiono una emoji e del
          testo rappresentativo del punteggio.
