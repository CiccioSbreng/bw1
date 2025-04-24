// Collegamento agli elementi HTML
const welcomeSection = document.querySelector(".Welcome");
const instructionsSection = document.querySelector(".Instructions");
const listSection = document.querySelector(".list");
const proceedButton = document.querySelector("#proceedButton");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const questionText = document.getElementById("questionText");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("scoreText");
const timerDisplay = document.getElementById("timer");

// Variabili di stato
let currentQuestion = 0;
let score = 0;
let timerInterval;
let questionTime = 15; // Tempo massimo per ogni domanda
let currentTimer = questionTime; // Timer corrente

// Domande del quiz
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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

// Event listener per il bottone "PROCEED"
// Event listener per il bottone "PROCEED"
proceedButton.addEventListener("click", () => {
  if (document.getElementById("promiseCheckbox").checked) {
    welcomeSection.style.display = "none";
    instructionsSection.style.display = "none";
    listSection.style.display = "none";
    document.querySelector(".procedi").style.display = "none"; // Nasconde la sezione "proceed"
    quizSection.style.display = "block";
    showQuestion();
  } else {
    alert("You must accept the promise to proceed!");
  }
});

// Funzione per mostrare la domanda corrente
function showQuestion() {
  clearInterval(timerInterval);
  startQuestionTimer();

  const q = questions[currentQuestion];
  questionText.textContent = q.question;

  // Mescola le risposte
  const options = [...q.incorrect_answers];
  options.splice(Math.floor(Math.random() * (options.length + 1)), 0, q.correct_answer);

  // Genera i bottoni delle risposte
  answersDiv.innerHTML = "";
  options.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer, q.correct_answer);
    answersDiv.appendChild(btn);
  });

  nextBtn.style.display = "none"; // Nasconde il bottone "Next"
}

// Funzione per controllare la risposta selezionata
function checkAnswer(selected, correct) {
  clearInterval(timerInterval);
  if (selected === correct) score++; // Incrementa il punteggio se la risposta è corretta
  nextBtn.style.display = "inline"; // Mostra il bottone "Next"
}

// Funzione per passare alla domanda successiva
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Funzione per mostrare i risultati finali
function showResult() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  scoreEl.textContent = `You scored ${score} out of ${questions.length} points!`;
}

// Funzione per avviare il timer per la domanda corrente
function startQuestionTimer() {
  currentTimer = questionTime;
  timerDisplay.textContent = `${currentTimer}s`;

  timerInterval = setInterval(() => {
    currentTimer--;
    timerDisplay.textContent = `${currentTimer}s`;
    if (currentTimer <= 0) {
      clearInterval(timerInterval);
      nextBtn.style.display = "inline"; // Mostra il bottone "Next" se il tempo scade
    }
  }, 1000);
}

// Funzione per resettare il quiz
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultSection.style.display = "none";
  quizSection.style.display = "block";
  showQuestion();
});