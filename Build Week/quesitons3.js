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

const RANDOM_QUESTIONS_IDXS = myRandomArray(MAX_QUESTIONS);

window.addEventListener("load", fillPage);

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

function startTimer() {
  clearInterval(timer);  // Stoppa il timer precedente
  timeLeft = totalTime;   // Reset del tempo

  // Resettiamo la barra del timer
  progressCircle.style.strokeDashoffset = 0;
  updateUI();  // Funzione per aggiornare la UI del timer

  // Partiamo con il timer
  timer = setInterval(() => {
    timeLeft--;
    updateUI();  // Aggiorniamo la UI ogni secondo

    if (timeLeft <= 0) {  // Se il tempo è finito, passa alla prossima domanda
      nextQuestion();
    }
  }, 1000);
}

function updateUI() {
  timeText.innerText = `${timeLeft}s`;

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
  QUESTION_COUNTER++;
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
  QUESTION_COUNTER++;  // Passiamo alla domanda successiva

  if (QUESTION_COUNTER >= MAX_QUESTIONS) {
    showFinalPage(); // Se le domande sono finite, mostra la pagina finale
  } else {
    fillPage();  // Ricarichiamo la pagina con la nuova domanda
    startTimer();  // Avviamo il timer sulla nuova domanda
  }
});

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

// Funzione per popolare la pagina con la domanda random
function setQuestionRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;
  let toShow = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]].question;
  document.getElementById("questionText").innerText = toShow;
  document.getElementById("questionNumber").innerText = QUESTION_COUNTER + 1;
}

// Funzione per posizionare le risposte in modo casuale
function setAnswersRandom() {
  if (QUESTION_COUNTER > MAX_QUESTIONS - 1)
    return;

  const workingOn = questions[RANDOM_QUESTIONS_IDXS[QUESTION_COUNTER]];
  MAX_VAL = workingOn.type == "boolean" ? 2 : 4;

  // Se è una domanda boolean, nascondo i bottoni extra
  if (MAX_VAL == 2) hideBtn();
  else showBtn();

  const posRisposteRandom = myRandomArray(MAX_VAL);
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

// Funzione per generare un array di numeri casuali
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

// Funzione per resettare i radio button
function resetRadio() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.checked = false;
  });
}

// Funzione per ripristinare il colore di sfondo dei bottoni
function resetColor() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.parentElement.classList.remove('btnSelected');
  });
}

function showFinalPage() {
  document.getElementById("container").style.display = "none";
  document.getElementById("finalPage").style.display = "flex";
  document.getElementById("score").innerText = `Hai risposto correttamente a ${CORRECT_ANSWERS} su ${MAX_QUESTIONS} domande.`;
}
