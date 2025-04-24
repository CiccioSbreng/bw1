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
  
  
  var QUESTION_COUNTER = 0;
  var CORRECT_ANSWERS = 0;
  const MAX_QUESTIONS = questions.length; //numero totale di domande 
  const MIN_VAL = 1; // rimane sempre costante
  var MAX_VAL = 4; //boolean -> 2, multiple -> 4
  var SELECTED_ANSWER = ""; //stringa di appoggio per memo la risposta data

  window.addEventListener("load", fillPage);

  
  //funzione per popolare la pagina
  function fillPage() {
    console.log("*************** FILL PAGE *****************");
    hideNextBtn();
    //popolo il div con la domanda
    showQuestion();
    //popolo i bottoni con le risposte
    randomAnswersPos();
    //assegno la funzione per il click dei bottoni
    setNextButtonAttribute();
    //aggiorno il risultato
  }
  
  
  //funzione per popolare il div con la domanda
  function showQuestion() {
    if (QUESTION_COUNTER > MAX_QUESTIONS - 1) 
      return;
    console.log("*[showQuestion]: current question: " + QUESTION_COUNTER);
    let toShow = questions[QUESTION_COUNTER].question;
    let questionNumber = QUESTION_COUNTER + 1;
    document.getElementById("questionText").innerText = toShow;
    document.getElementById("questionNumber").innerText = QUESTION_COUNTER+1;
  }
  
  
  // funzione per posizionare le risposte in modo casuale
  function randomAnswersPos() {
    //controllo che ci siano ancora domande
    if (QUESTION_COUNTER > MAX_QUESTIONS - 1) 
      return;
    //controllo se il tipo della domanda è boolean e assegno MAX_VAL di conseguenza
    console.log(">[randomAnswersPos]: question number: " + QUESTION_COUNTER);
    questions[QUESTION_COUNTER].type == "boolean" ? MAX_VAL = 2 : MAX_VAL = 4;
    //se MAX_VAL == 2, rimuovo bottoni
    MAX_VAL == 2 ? hideBtn() : showBtn();
  
    console.log(">[randomAnswersPos]: MAX_VAL: " + MAX_VAL);
    //genero l'indice per la risposta giusta, che è l'unica che assegno direttamente
    let rightAnswer = myRandom();
    console.log(">[randomAnswersPos]: rightAnswer index: " + rightAnswer);
    console.log(">[randomAnswersPos]: toPlace: " + questions[QUESTION_COUNTER].correct_answer);

    //assegno la risposta giusta al button di indice rightAnswer
    document.getElementById("answer" + rightAnswer).innerText = questions[QUESTION_COUNTER].correct_answer;
    document.getElementById("risp"+rightAnswer).setAttribute("value", questions[QUESTION_COUNTER].correct_answer);
    let wrongAnswerIdx = 0; //wrongAnswerIdx -> questions[QUESTION_COUNTER].inCORRECT_ANSWERs[wrongAnswerIdx]

    //per le risposte sbagliate, uso un ciclo for
    for (let i = MIN_VAL; i < MAX_VAL + 1; i++) {
        console.log(">[randomAnswersPos]: i: " + i);
        console.log(">[randomAnswersPos]: wrongAnswerIdx: " + wrongAnswerIdx);
        //se i == rightAnswer, non faccio nulla
        if (i == rightAnswer)
            continue;
        //posiziono le risposte sbagliate, non serve randomizzarle
        //label innertext
        document.getElementById("answer" + i).innerText = questions[QUESTION_COUNTER].incorrect_answers[wrongAnswerIdx];
        //input value
        document.getElementById("risp"+i).setAttribute("value", questions[QUESTION_COUNTER].incorrect_answers[wrongAnswerIdx]);
        wrongAnswerIdx++;
    }
  }
  
  
  //funzoine di appoggio per generare numeri casuali tra min e max
  function myRandom() {
    let toRet = Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL);
    console.log(">>[myRandom]: " + toRet);
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

  //   // --------------------------- per getstire le risposte -------
  function checkAnswer() {
    console.log("@@@@@@@@@@ BUTTON CLICKED");
    console.log("![checkAnswer]: current question: " + QUESTION_COUNTER);
    let rightAnswer = questions[QUESTION_COUNTER].correct_answer;
    console.log("![checkAnswer]: right answer: " + rightAnswer);
    
    //recupero la risposta selezionata
    SELECTED_ANSWER = document.querySelector('input[name="options"]:checked').value;
    console.log("![checkAnswer]: selected answer: " + SELECTED_ANSWER);
    if (rightAnswer == SELECTED_ANSWER) {
      console.log("![checkAnswer]: right answer");
      CORRECT_ANSWERS++;
    }
    console.log("![checkAnswer]: current score: " + CORRECT_ANSWERS);
    
    console.log("[checkAnswer]:final QUESTION_COUNTER: " + QUESTION_COUNTER);
    console.log("___________________________________________________");
    
    QUESTION_COUNTER++; //incremento la variabile globale
    
    fillPage(); //ripopolo la pagina
  }
  
  function setNextButtonAttribute() {
    console.log("°[setNextButtonAttribute]: current question: " + QUESTION_COUNTER);
    if (QUESTION_COUNTER != MAX_QUESTIONS) {
      document.getElementById("nextBtn").setAttribute("onclick", "checkAnswer()");
    }
    else { //sono all'ultima domanda
      document.getElementById("nextBtn").setAttribute("onclick", showFinalPage());
    }
    console.log("°[setNextButtonAttribute]: nextBtn " + document.getElementById("nextBtn").getAttribute("onclick"));
  }
  
// ------------------------- pagina finale -------------------
  function showFinalPage() {
    console.log("*************** FINAL PAGE *****************");
    document.getElementById("container").style.display = "none"; //nascondo il div principale
    //popolo il div con il risultato
    document.getElementById("finalPage").style.display = "block"; //mostro il div finale
    document.getElementById("scoreValue").innerText = CORRECT_ANSWERS;
    console.log("^[showResult]: scoreValue: " + document.getElementById("scoreValue").innerText);
    if (CORRECT_ANSWERS > 1) {
      document.getElementById("plural").innerText = "s";
    } 
  }
  



