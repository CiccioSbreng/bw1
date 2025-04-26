const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];


let QUESTION_COUNTER = 0;
let CORRECT_ANSWERS = 0;
const MAX_QUESTIONS = questions.length; //numero totale di domande 
const MIN_VAL = 1; // rimane sempre costante
let MAX_VAL = 4; //boolean -> 2, multiple -> 4
let SELECTED_ANSWER = ""; //stringa di appoggio per memo la risposta data
//Mod Federica
/*var timerInterval;
var questionTime = 30; //id del timer
var timer = questionTime; //tempo rimanente
//Fine Mod Fede 
*/
const RANDOM_QUESTIONS_IDXS = myRandomArray(MAX_QUESTIONS); //array di indici random

window.addEventListener("load", fillPage);



const semicircles = document.querySelectorAll('.semicircle');
const timer = document.querySelector('.timer');




const hr = 0; // Set the number of hours
const min = 0; // Set the number of minutes         
const sec = 15; // Set the number of seconds


const hours = hr * 3600000; // Convert hours to milliseconds
const minutes = min * 60000; // Convert minutes to milliseconds 
const seconds = sec * 1000; // Convert seconds to milliseconds   
const setTime = hours + minutes + seconds; // Total time in milliseconds     
const starTime = Date.now(); // Get the current time in milliseconds
const futureTime = starTime + setTime; // Calculate the future time in milliseconds

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now(); // Ottieni il tempo corrente in millisecondi
    let remainingTime = futureTime - currentTime; // Calcola il tempo rimanente in millisecondi
    const safeTime = Math.max(0, remainingTime); // Assicurati che il tempo rimanente non sia mai negativo
    const angle = (safeTime / setTime) * 360; // Calcola l'angolo per il semicerchio

    // 1. Prima aggiorniamo il grafico
    if (angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = `rotate(180deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    // 2. Poi calcoliamo il timer
    let hrs = Math.floor(safeTime / (1000 * 60 * 60)) % 24;
    let mins = Math.floor((safeTime / (1000 * 60)) % 60);
    let secs = Math.floor((safeTime / 1000) % 60);

    // 3. Formattiamo il tempo a due cifre
    hrs = hrs.toLocaleString('it-IT', { minimumIntegerDigits: 2, useGrouping: false });
    mins = mins.toLocaleString('it-IT', { minimumIntegerDigits: 2, useGrouping: false });
    secs = secs.toLocaleString('it-IT', { minimumIntegerDigits: 2, useGrouping: false });
    
    // 4. Visualizziamo il timer nel DOM
    timer.innerHTML = `
    <div> ${hrs} </div>
    <div class="colon">:</div>
    <div> ${mins} </div>
    <div class="colon">:</div>
    <div> ${secs} </div>
    `;

    // 5. Cambiamo il colore quando il timer è vicino a zero
    if (safeTime <= 10000) {
        semicircles[0].style.backgroundColor = "orange";
        semicircles[1].style.backgroundColor = "orange";
        timer.style.color = "orange";
    }

    if (safeTime <= 6000) {
        semicircles[0].style.backgroundColor = "red";
        semicircles[1].style.backgroundColor = "red";
        timer.style.color = "red";
    }

    // 6. Quando il timer arriva a zero, nascondiamo il grafico e fermiamo il timer
    if (safeTime <= 0) {
        clearInterval(timerLoop); // Ferma il timer quando il countdown arriva a zero
        semicircles.forEach(s => s.style.display = 'none'); // Nascondiamo tutti i semicircoli
        
        timer.innerHTML = `
        <div> 00 </div>
        <div class="colon">:</div>
        <div> 00 </div>
        <div class="colon">:</div>
        <div> 00 </div>`;
        timer.style.color = "lightgray"; // Cambiamo il colore del timer a grigio

    }
}







//funzione per popolare la pagina
function fillPage() {
  console.log("*************** FILL PAGE *****************");
  console.log("QUESTION COUNT: " +QUESTION_COUNTER + "/" + MAX_QUESTIONS);
  resetRadio(); //resetto i bottoni radio

  resetColor(); //resetto il colore dei bottoni

  hideNextBtn(); //nascondo il bottone next

  setQuestionRandom(); //popolo il div con la domanda

  setAnswersRandom(); //popolo i bottoni con le risposte
  
  if (QUESTION_COUNTER == MAX_QUESTIONS)
    goToFinal(); //setta il nextBtn

  //Mod Fede
  //startTimer(); //parto il timer
  //Fine Mod Fede
}



//////////////////////////////////////////////////////////////////////////
///////////////////////////////RANDOM/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//funzione per popolare il div con la domanda random
function setQuestionRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;
    console.log("*[showQuestion]: current question: " + QUESTION_COUNTER);
    let toShow = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]].question;
    // let showingNumber = QUESTION_COUNTER + 1;
    document.getElementById("questionText").innerText = toShow;
    document.getElementById("questionNumber").innerText = QUESTION_COUNTER + 1;
  
}

//////////////////////////////////////////////////////////////////////////
///////////////////////////////RANDOM/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// funzione per posizionare le risposte in modo casuale
function setAnswersRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;
  console.log("~~~~~~~~~~~~~[setAnswersRandom]: start");
  //isolo l'oggetto su cui sto lavorando
  const workingOn = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]];
  console.log(workingOn);
  console.log("~[setAnsewrsRandom]: workingOn prev id: " + RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]);
  //assegno MAX_VAL
  workingOn.type == "boolean" ? MAX_VAL = 2 : MAX_VAL = 4;
  //se MAX_VAL == 2, rimuovo bottoni delle risposte extra
  MAX_VAL == 2 ? hideBtn() : showBtn();
  //creo array di numeri da 0 a MAX_VAL in ordine casuale
  const posRisposteRandom = myRandomArray(MAX_VAL);
  //creo un array di appoggio con tutte le risposte
  let totalAnswers = [];
  //lo popolo
  totalAnswers.push(workingOn.correct_answer);
  for (let i = 0; i < workingOn.incorrect_answers.length; i++) //(?)MAX_VAL?
    totalAnswers.push(workingOn.incorrect_answers[i]);
  //recupero i radio button e gli span in cui insertire le risposte
  const radios = document.querySelectorAll('input[type="radio"]');
  const answerSpans = document.querySelectorAll('.btn');
  //array di appoggio per le risposte in ordine random
  let appoggio = [];
  for (let i = 0; i < MAX_VAL; i++)
    appoggio[i] = totalAnswers[posRisposteRandom[i]];
  //assegno le risposte ai radio e agli span
  for (let i = 0; i < MAX_VAL; i++) {
    radios[i].value = appoggio[i]; //assegno il valore alla radio
    answerSpans[i].innerText = appoggio[i]; //assegno il testo alla span
  }
}

//funzoine di appoggio per generare numeri casuali tra min e max
function myRandomArray(length) {
  let toRet = [];
  let valRandom;
  let posLibere = new Array(length); //array di appoggio per le posizioni libere
  for (let i = 0; i < length; i++)
    posLibere[i] = true; //inizializzo l'array a true
  for (let i = 0; i < length; i++) {
    do {
      valRandom = Math.floor(Math.random() * length); //numero random da 0 a length
    } while (posLibere[valRandom] == false); //finchè non trovo una posizione libera
    posLibere[valRandom] = false; //la posizione è ora occupata
    toRet[i] = valRandom; //inserisco il numero random nell'array
  }
  console.log("[myRandomArray]: toRet: ");
  for (let i = 0; i < toRet.length; i++) {
    console.log(toRet[i]);
  }
  console.log("[myRandomArray]: DONE");
  return toRet;
}

//funzione per creare i due bottoni extra nel caso di type == multiple
function showBtn() {
  console.log("§[showBtn]: ...");
  let container = document.getElementById("lbl");
  for (let i = 2; i < MAX_VAL; i++) {
    container.children[i].style.display = "";
  }
  console.log("§[showBtn]: DONE");
}

function hideBtn() {
  console.log("+[hideBtn]: ...");
  let container = document.getElementById("lbl");
  for (let i = 2; i < container.childElementCount; i++) {
    container.children[i].style.display = "none";
  }
  console.log("+[hideBtn]: DONE");
}


function showNextBtn() {
  document.getElementById("nextBtn").style.display = "block";
}

function hideNextBtn() {
  document.getElementById("nextBtn").style.display = "none";
}

//-------------------------- per getstire le risposte -------
function checkAnswer() {
    console.log("@@@@@@@@@@ BUTTON CLICKED");
    console.log("![checkAnswer]: current question: " + QUESTION_COUNTER);

    const workingOn = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]];
    const rightAnswer = workingOn.correct_answer;
    console.log("![checkAnswer]: right answer: " + rightAnswer);

    //recupero la risposta selezionata
    SELECTED_ANSWER = document.querySelector('input[name="options"]:checked').value;

    console.log("![checkAnswer]: selected answer: " + SELECTED_ANSWER);

    if (rightAnswer == SELECTED_ANSWER) {
      console.log("![checkAnswer]: congrats!");
      CORRECT_ANSWERS++;
    }
    console.log("![checkAnswer]: current score: " + CORRECT_ANSWERS);

    QUESTION_COUNTER++; //incremento la variabile globale
    console.log("[checkAnswer]:final QUESTION_COUNTER: " + QUESTION_COUNTER);
    console.log("___________________________________________________");
    fillPage(); //ripopolo la pagina
}


function goToFinal() {
  document.getElementById("nextBtn").setAttribute("onclick", showFinalPage());
}

//Mod Fede
// ------------------------- timer -------------------  
//funzione per il timer
function startTimer() {

  const timerId = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;
    if (timer <= 0) {
      clearInterval(timerId);
      showFinalPage();
    }
  }, 1000);
};
//Fine Mod Fede

//funzione per resettare il check dei radio button al ricaricamento della pagina
function resetRadio() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.checked = false;
  });
}

//funzione per colorare la risposta selezinata
function highlightSelected() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    if (radio.checked) {
      radio.parentElement.classList.add('btnSelected');
    } else {
      radio.parentElement.classList.remove('btnSelected');
    }
  });
}

//funzione che ripristina il colore di sfondo dei bottoni
function resetColor() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.parentElement.classList.remove('btnSelected');
  });
}


// ------------------------- pagina finale -------------------
function showFinalPage() {
  console.log("*************** FINAL PAGE *****************");
  document.getElementById("container").style.display = "none"; //nascondo il div principale


  ////////////////////////////// da abilitare timer ////////////////
  //document.getElementById("contTimer").style.display = "none"; //nascondo il div del timer


  //popolo il div con il risultato
  document.getElementById("finalPage").style.display = "flex"; //mostro il div finale
  let passed = (CORRECT_ANSWERS > 5);
  let emoji = document.getElementById("emoji");
  if (passed) {
    document.getElementById("emoji").innerText = "😎";
    document.getElementById("outcome").innerHTML = "You did it! Good job!";
  } else {
    document.getElementById("emoji").innerText = "😢";
    document.getElementById("outcome").innerHTML = "Sorry, you didn't pass the test.";
    document.getElementById("restartBtn").style.display = "block"; //mostro il bottone restart in caso di fallimento del test
  }

  document.getElementById("scoreValue").innerText = CORRECT_ANSWERS;
  console.log("^[showResult]: scoreValue: " + document.getElementById("scoreValue").innerText);
  if (CORRECT_ANSWERS > 1)
    document.getElementById("scoreValue").innerText = CORRECT_ANSWERS;
}

//funzione per resettare il punteggio e il contatore delle domande e ripartire
function restart() {
  QUESTION_COUNTER = 0;
  CORRECT_ANSWERS = 0;
  timer = questionTime;
  document.getElementById("contTimer").style.display = "block"; //mostro il div del timer
  document.getElementById("finalPage").style.display = "none"; //nascondo il div finale
  document.getElementById("container").style.display = "flex"; //mostro il div principale
  fillPage(); //ripopolamento della pagina
}


