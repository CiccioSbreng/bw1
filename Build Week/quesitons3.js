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
const MAX_QUESTIONS = questions.length;
let MAX_VAL = 4; // boolean -> 2, multiple -> 4
let SELECTED_ANSWER = "";

//array di con gli indici di riposte in ordine random
const RANDOM_QUESTIONS_IDXS = myRandomArray(MAX_QUESTIONS);

window.addEventListener("load", fillPage);

//variabili e costanti per gestire il timer
let currentQuestion = 0;
let timeLeft = 15;
let timer;
const totalTime = 15;
const radius = 85;
const circumference = 2 * Math.PI * radius;
const progressCircle = document.getElementById('progressCircle');
const timeText = document.getElementById('timeLeft');
const answerButton = document.getElementById('answerButton');

// Imposta il cerchio iniziale
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;
progressCircle.style.stroke = "green";

// let timeout = null; 

function startTimer() {
  clearInterval(timer);  // Stoppa il timer precedente
  // clearTimeout(timeout);
  timeLeft = totalTime;   // Reset del tempo

  // Resettiamo la barra del timer
  progressCircle.style.strokeDashoffset = 0;
  updateUI();  // Funzione per aggiornare la UI del timer

  // Partiamo con il timer
  timer = setInterval(() => {
    timeLeft--;
    updateUI();  // Aggiorniamo la UI ogni secondo

    if (timeLeft <= -1) {  // Se il tempo è finito, passa alla prossima domanda
      nextQuestion();
    }
  }, 1000);
}

function updateUI() {
  timeText.innerText = `${timeLeft}`;
  
  const offset = circumference - (timeLeft / totalTime) * circumference;
  progressCircle.style.strokeDashoffset = offset;

  if (timeLeft > 10) {
    progressCircle.style.stroke = "green";
  } else if (timeLeft > 5) {
    progressCircle.style.stroke = "orange";
  } else {
    progressCircle.style.stroke = "red";
  }
}

function nextQuestion() {
  // Passiamo alla domanda successiva
  console.log("[nextQ]: changing question...")
  QUESTION_COUNTER++;
  console.log("[nextQ]: question counter: " + QUESTION_COUNTER);
  if (QUESTION_COUNTER >= MAX_QUESTIONS) {
    showFinalPage(); // Se le domande sono finite, mostra la pagina finale
  } else {
    fillPage();  // Ricarichiamo la pagina con la nuova domanda
    startTimer();  // Avviamo il timer sulla nuova domanda
  }
}

// Aggiungi il click su NEXT per avanzare alla domanda successiva
document.getElementById("nextBtn").addEventListener("click", () => {
  clearInterval(timer); // Fermiamo il timer
  QUESTION_COUNTER++;  // Passiamo alla domanda successiva (??)

  if (QUESTION_COUNTER >= MAX_QUESTIONS) {
    showFinalPage(); // Se le domande sono finite, mostra la pagina finale
  } else {
    fillPage();  // Ricarichiamo la pagina con la nuova domanda
    startTimer();  // Avviamo il timer sulla nuova domanda
  }
});
// Spiegazione del Timer+Quiz
// Inizio: si carica la prima domanda

// Parte il timer da 15 secondi
// Ogni secondo il tempo scende di 1

// Ad ogni secondo:
// - Aggiorniamo il cerchio (verde/arancione/rosso)
// - Aggiorniamo il numero dei secondi sullo schermo

// Se il tempo NON è finito:
// - Continuiamo a scalare il tempo

// Se il tempo È finito:
// - Passiamo automaticamente alla prossima domanda (nextQuestion())

// Se l'utente clicca "Next":
// - Fermiamo il timer
// - Passiamo subito alla prossima domanda

// Quando cambiamo domanda:
// - Incrementiamo il contatore delle domande
// - Carichiamo una nuova domanda
// - Facciamo ripartire il timer da 15 secondi

// Se abbiamo finito tutte le domande:
// - Mostriamo la pagina finale del quiz



function fillPage() {
  resetRadio();
  resetColor();
  hideNextBtn();
  setQuestionRandom();
  setAnswersRandom();

  if (QUESTION_COUNTER == MAX_QUESTIONS)
    showNextBtn();

  startTimer();  // Iniziamo il timer per la domanda corrente
}

// Funzione per popolare la pagina con la domanda random OK
function setQuestionRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;
  let toShow = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]].question;
  document.getElementById("questionText").innerText = toShow;
  document.getElementById("questionNumber").innerText = QUESTION_COUNTER +1;
}

// Funzione per posizionare le risposte in modo casuale OK
function setAnswersRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;

  const workingOn = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]];
  MAX_VAL = workingOn.type == "boolean" ? 2 : 4;

  // Se è una domanda boolean, nascondo i bottoni extra
  MAX_VAL == 2 ? hideBtn() : showBtn();

  const posRisposteRandom = myRandomArray(MAX_VAL);
  //spread operator: espande gli elementi di quell’array all’interno del nuovo array.
  let totalAnswers = [workingOn.correct_answer, ...workingOn.incorrect_answers];
  const radios = document.querySelectorAll('input[type="radio"]');
  const answerSpans = document.querySelectorAll('.btn');

  let appoggio = [];
  for (let i = 0; i < MAX_VAL; i++) appoggio[i] = totalAnswers[posRisposteRandom[i]];

  for (let i = 0; i < MAX_VAL; i++) {
    radios[i].value = appoggio[i];
    answerSpans[i].innerText = appoggio[i];
  }
}

//funzione per controllare le risposte OK
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

  //QUESTION_COUNTER++; //incremento la variabile globale (??)
  console.log("[checkAnswer]:final QUESTION_COUNTER: " + QUESTION_COUNTER);
  console.log("___________________________________________________");
  fillPage(); //ripopolo la pagina
}
// Funzione per generare un array di numeri casuali OK
function myRandomArray(length) {
  let toRet = [];
  let posLibere = new Array(length).fill(true);

  for (let i = 0; i < length; i++) {
    let valRandom;
    do {
      valRandom = Math.floor(Math.random() * length);
    } while (posLibere[valRandom] == false);
    posLibere[valRandom] = false;
    toRet[i] = valRandom;
  }
  return toRet;
}

function showBtn() {
  let container = document.getElementById("lbl");
  for (let i = 2; i < MAX_VAL; i++) {
    container.children[i].style.display = "";
  }
}

function hideBtn() {
  let container = document.getElementById("lbl");
  for (let i = 2; i < container.childElementCount; i++) {
    container.children[i].style.display = "none";
  }
}

function showNextBtn() {
  document.getElementById("nextBtn").style.display = "block";
}

function hideNextBtn() {
  document.getElementById("nextBtn").style.display = "none";
}

// Funzione per resettare i radio button OK
function resetRadio() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.checked = false;
  });
}

// Funzione per ripristinare il colore di sfondo dei bottoni OK
function resetColor() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.parentElement.classList.remove('btnSelected');
  });
}

//funzione per colorare la risposta selezinata OK
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

//funzione per far apparire l'ultimo div e scomparire tutto il resto (tranne logo) OK
function showFinalPage() {
  clearInterval(timer); // Fermiamo il timer
  document.getElementById("container").style.display = "none";
  document.querySelector(".contDomande").style.display = "none";
  document.querySelector(".container").style.display = "none";
  document.getElementById("finalPage").style.display = "flex";
  let emoji = document.getElementById("emoji");
  let outcome = document.getElementById("outcome"); 
  if (CORRECT_ANSWERS > 6) {
    emoji.innerText = "😎"; 
    outcome.innerText = "Good Job!";  
  } else {
    emoji.innerText = "😓";
    outcome.innerText = "Try again";
  }

  document.getElementById("scoreValue").innerText = CORRECT_ANSWERS;
  if(CORRECT_ANSWERS > 1)
  document.getElementById("plural").innerText += 's';

}
