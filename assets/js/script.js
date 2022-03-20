/* Code Quiz Challenge application */
/* DOM references common to all pages */
var quizPageEl = document.querySelector("#quiz-page");
var viewHighscoreButtonEl = document.querySelector("#view-highscore");
var timerEl = document.querySelector("#timer");
/* This defines the element holding all the dynamic content */
var mainContentEl = document.querySelector("#main-content");
/* The quiz instructions displayed on the Start page */
var instructions = "This is a timed quiz on JavaScript.  The goal is to answer four multiple choice questions correctly in the least amount of time.  Your score is the time remaining on the clock once all the questions are answered.  The clock will start at 90 seconds.  You will loose 20 seconds for each incorrect answer.  Click the Start button to begin the test.  Good Luck!";
/* The object array holding all the quiz questions and answers */
var questionObjArray = [{
            text: "In the following code, what would be logged to the console?",
            code: true,
            codesnips: [
                "if (5===5) {",
                "console.log('Hi!');",
                "} else {",
                "console.log('Hello!');",
                "}"
            ],
            answers: [ 
                "Hi!",
                "Hello!"
                ],
            correct: 0 
            }, {
            text: "Which of these is NOT considered false?",
            code: false,
            codesnips: [],
            answers: [ 
                "0",
                "'0'",
                "null",
                "''"
                ],
            correct: 1 
            }, {
                text: "Given the following code for the cars array, will the 'Stop' message ever be displayed?",
                code: true,
                codesnips: [
                    "for (var i = 0; i < cars.length; i++) {",
                    "  if ( cars[i] ) {",
                    "    console.log('Vroom');",
                    "  } else {",
                    "    console.log('Stop');",
                    "  }",
                    "}"
                ],
                answers: [ 
                    "Yes, at least once",
                    "No, never",
                    "It depends"
                    ],
                correct: 2
            }       
        ];
/* initializing the index for the question array */        
var questionId = 0;
/* The max time on the timer - allow 20s per question */
var timeLeft = 60;
/* The max questions in the quiz */
var numQuestions = 3;
/* The setInterval ID */
var timeInterval = 1;
/* Counter used to track the current question across functions */
var questionCounter = 0;
/* Initialized array of objects to store scores and initials */
var scoresObjArray = [{
                initials: "ABC",
                score:  0
                }, {
                initials: "DEF",
                score:  0    
                }];  
/* Current player initials - used across functions */
var initials = "";
                

/* Create Start page */

var instructionsEl = document.createElement("p");
    instructionsEl.className = "instructions";
    instructionsEl.textContent = instructions;
    mainContentEl.appendChild(instructionsEl);

var startButtonEl = document.createElement("button");
    startButtonEl.id = "start-btn";
    startButtonEl.textContent = "START";
    mainContentEl.appendChild(startButtonEl);
   
/* Timer Function */
var countDown = function () {
    
    timeInterval = setInterval(function(){
        console.log("timeInterval  " + timeInterval);
        /* The timer counts down changing the displayed seconds every second.  This runs in the background. */
        if ( timeLeft > 0 ) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            /* When the timer reaches 0, the timer is stopped, the timer is updated to reflect 0 seconds, and the game is ended */
            clearInterval(timeInterval);
            timerEl.textContent = timeLeft;
            quizOver();
        }
    }, 1000);

};

/* This function clears away the unneeded elementes between dynamic page updates */
var clearPage =function () {

    /* Start Page Elements to be cleared */
    if (instructionsEl) {
        instructionsEl.remove();}
    if (startButtonEl) {
        startButtonEl.remove();}

    /* Questions Page Elements to be cleared */
    if (questionSectionEl=document.querySelector(".question-section")) {
    questionSectionEl.remove();}
    if (answerSectionEl=document.querySelector(".answer-section")){
    answerSectionEl.remove();}    

    /* Done Page Elements to be cleared */
    if (doneHeadEl=document.querySelector("#main-heading")) {
        doneHeadEl.remove();}
    if (scoreDivEl=document.querySelector(".score-align")) {
        scoreDivEl.remove();}
    if (restartButtonEl=document.querySelector(".restart-btn")) {
        restartButtonEl.remove();}  

    /* High Score Page Elements to be cleared */
    if (highscoresHeadEl=document.querySelector(".highscore-heading")) {
        highscoresHeadEl.remove();}
    if (highscoresDivEl=document.querySelector(".high-scores")) {
        highscoresDivEl.remove();}
    if (highscoreButtonEl=document.querySelector(".highscore-btns")) {
        highscoreButtonEl.remove();}  

    return;
};
 
/* Function to load and run quiz */
var startQuiz = function () {
  
   /* reinitiallize the time left */
   timeLeft=60;

   /* reinitialize the question counter */
   questionCounter=0;

   /* start the timer */
   countDown();

   /* select and load the questions */
   runQuiz();
   
};

/* This function randomly selects a question and passes that question to the loadQuestions function */
var runQuiz = function () {

 /* Select and load questions  */
if (questionCounter < numQuestions){
    console.log("This is the  " + questionCounter + " time through the question loop" );
    /* randomly select a question from the question array */
    // questionId = Math.floor(Math.random() * questionObjArray.length);

    /* Just using the following expression while the question database is so limited */
    questionId = questionCounter;
    console.log("The question ID is " + questionId);

    loadQuestions(questionId);
} 
else {
    /* The quiz is over */
    quizOver();
}
return;
};

/* This function increments the question counter and ends the game when the specified number of questions has been answered */
var nextQuestion = function () {
    questionCounter++;
    /* end the game when the maximum number of question has been answered */
    if (questionCounter === numQuestions) {
        quizOver();
    }
    else 
    {
        /* Load another question */
        runQuiz();
    }
    return;
};

/* This function actually builds the question page for each new question */
var loadQuestions = function (questionId) {

  clearPage();

/* create and append question and answer sections */
var questionSectionEl = document.createElement("div");
     questionSectionEl.className="question-section";
     mainContentEl.appendChild(questionSectionEl);

 var answerSectionEl = document.createElement("ul");
     answerSectionEl.className="answer-section";
     mainContentEl.appendChild(answerSectionEl);

 /* create and append question */
 var questionEl = document.createElement("p");
     questionEl.className="question";
     questionEl.textContent=questionObjArray[questionId].text;
     questionSectionEl.appendChild(questionEl);
   
 /* If code is a part of the question, create the elements and append them */
 if (questionObjArray[questionId].code) {
     var codeSectionEl = document.createElement("div");
     codeSectionEl.className = "code-section";
     questionSectionEl.appendChild(codeSectionEl);

     for ( i = 0; i < questionObjArray[questionId].codesnips.length; i++) {
         var codeSnipEl = document.createElement("code");
         codeSnipEl.textContent = questionObjArray[questionId].codesnips[i];
         var breakEl = document.createElement("br");
         codeSectionEl.appendChild(codeSnipEl);
         codeSectionEl.appendChild(breakEl);
     }
 }
 /* Create the list item elements for the answers */
 for (i = 0; i < questionObjArray[questionId].answers.length; i++) {
     var answerListItemEl = document.createElement("li");
     answerListItemEl.className = "answer";
     answerListItemEl.id = "answer" + i;
     answerListItemEl.textContent = questionObjArray[questionId].answers[i];
     answerSectionEl.appendChild(answerListItemEl);
 }

    return;
};

/* This function needs to check the score against the high score for this player and update it in localStorage if it is higher */
var saveInitials = function () {
// debugger;

    /* initialize flags */
    var initialFlagSet = false;
    var highscoreFlagSet = false;

    /* Get the initials, button element  and heading element(if needed) */
    initials = document.getElementById("initials").value;
    var mainHeadingEl = document.getElementById("main-heading");

    /* Load the highscores database from localStorage */
    if (localStorage.getItem("scores")) {
        var highScores = localStorage.getItem("scores");
        scoresObjArray = JSON.parse(highScores);
            
        /* Find initials in database */
        for (i=0; i<scoresObjArray.length; i++) {
            if (scoresObjArray[i].initials === initials) {
                initialFlagSet = true;
                /* Compare current score to highscore and if current score is higher update it */
                var highScore = scoresObjArray[i].score;
                if (timeLeft > highScore) {
                    highscoreFlagSet = true;
                    mainHeadingEl.textContent="You have a new High Score!";
                    scoresObjArray[i].score = timeLeft;
                }
            } 
        }
    } 
    /* If the a local database does not exist or the initials not found in it add the initials to the scoresObjArray to be saved in the next step */
    if (!initialFlagSet || !localStorage.getItem("scores")) {
    highscoreFlagSet = true;
    mainHeadingEl.textContent="You have a new High Score!";
    var scoresObj = new Object();
    scoresObj.initials = initials;
    scoresObj.score = timeLeft;
    scoresObjArray.push(scoresObj);
    }

    /* Save scoresObjArray to localStorage */
    localStorage.setItem("scores", JSON.stringify(scoresObjArray));

    /* Display page without form */
    var initFormEl = document.querySelector(".form-initials");
    initFormEl.remove();
    var restartButtonEl = document.createElement("button");
    restartButtonEl.className="restart-btn";
    restartButtonEl.textContent="ReStart";
    mainContentEl.appendChild(restartButtonEl);


    if (highscoreFlagSet) {
        loadHighScores();
    }

 };

/* Placeholder for high scores page function */
var loadHighScores = function () {

/* Clear the main content area first */
clearPage();

/* Build High Scores page with scores */
var highscoresHeadEl=document.createElement("h2");
highscoresHeadEl.className="highscore-heading";
highscoresHeadEl.textContent="High Scores!";
mainContentEl.appendChild(highscoresHeadEl);

var highscoresDivEl=document.createElement("div");
highscoresDivEl.className="high-scores";
mainContentEl.appendChild(highscoresDivEl);

/* If a local scores database is present, print out all the scores sorted highest to lowest */
/* Read the local scores file and assign it to the scoresObjArray */
if (localStorage.getItem("scores")) {
    var highScores = localStorage.getItem("scores");
    scoresObjArray = JSON.parse(highScores);

    /* Sort array in decending order by score */
    scoresObjArray.sort(function(a, b){
        return b.score - a.score; 
    });

    /* Print ouf the list of initials and scores */
    for ( i = 0; i < scoresObjArray.length; i++){

        /* get initials and score */
        var sortedInitials = scoresObjArray[i].initials;
        var sortedScore = scoresObjArray[i].score;

        /* create paragraph elements with highscores */
        var highscoreEl=document.createElement("p");
        highscoreEl.className = "highscores";
        highscoreEl.textContent = sortedInitials + "  ...........  " + sortedScore;
        highscoresDivEl.appendChild(highscoreEl);
    }
}
else {
    /* If no local database file is present. print the initals and score of the current player */
      
    var highscoreEl=document.createElement("p");
    highscoreEl.className = "highscores";
    highscoreEl.textContent = initials + "  ...........  " + timeLeft;
    highscoresDivEl.appendChild(highscoreEl);
}


/* Create buttons to go back and clear the current players high score */

var highscoreButtonsEl=document.createElement("div");
highscoreButtonsEl.className="highscore-btns";
mainContentEl.appendChild(highscoreButtonsEl);

var backButtonEl=document.createElement("button");
backButtonEl.className="back-btn";
backButtonEl.textContent="Go Back";
highscoreButtonsEl.appendChild(backButtonEl);

var clearButtonEl=document.createElement("button");
clearButtonEl.className="clear-btn";
clearButtonEl.textContent="Clear High Score";
highscoreButtonsEl.appendChild(clearButtonEl);
 
};

/* Function called by Clear High Score button to clear the current players high score  from local storage */
var clearHighScore = function () {

loadHighScores();

};

/* This function evaluates clicks on the answer buttons as well as the intials submit, back and clear buttons */
var buttonHandler = function (event) {

    event.preventDefault;
    /* check for clicks on answer buttons id="answer#" */
    var answer = event.target.id;
    switch (answer) {
        case "answer0": 
           
            if ( questionObjArray[questionId].correct === 0) {
                 /* On a correct answer, just load a new question */
                nextQuestion();
                break;
            } else { 
                /* On an incorrect answer, subtract 20 seconds from the timer and load a new question */
                if (timeLeft >=20){
                    timeLeft = timeLeft - 20;
                } else { 
                    timeLeft = 0
                }
                nextQuestion();
                break;
            } 
        case "answer1":
            if ( questionObjArray[questionId].correct === 1) {
                nextQuestion();
                break;
            } else { 
                if (timeLeft >=20){
                    timeLeft = timeLeft - 20;
                } else { 
                    timeLeft = 0;
                }
                nextQuestion();
                break;
            } 
        case "answer2":
            if ( questionObjArray[questionId].correct === 2) {
                nextQuestion();
                break;
            } else { 
                if (timeLeft >=20){
                    timeLeft = timeLeft - 20;
                } else { 
                    timeLeft = 0;
                }
                nextQuestion();
                break;
            } 
        case "answer3":
            if ( questionObjArray[questionId].correct === 3) {
                nextQuestion();
                break;
            } else { 
                if (timeLeft >=20){
                    timeLeft = timeLeft - 20;
                } else { 
                    timeLeft = 0;
                }
                nextQuestion();
                break;
            } 
        default:
            break;
    }

    /* check for class names for other buttons */
    var classButtons=event.target.className;

    switch (classButtons) {
        case "init-btn":
            saveInitials();
            break;
        case "restart-btn":
            startQuiz();
            break;
        case "back-btn":
            startQuiz();
            break;
        case "clear-btn":
            clearHighScore();
            break;
        default:
            break;

    }

};

var quizOver = function () {

    /* stop the clock if it is not already stoped */
    clearInterval(timeInterval);
    timerEl.textContent = timeLeft;
    console.log("The quiz is over.  " + timeLeft + " seconds remaining");

    clearPage();

    /* Build All Done! page with score */
var doneHeadEl=document.createElement("h2");
    doneHeadEl.id="main-heading";
    doneHeadEl.textContent="All Done!";
    mainContentEl.appendChild(doneHeadEl);

var scoreDivEl=document.createElement("div");
    scoreDivEl.className="score-align";
    mainContentEl.appendChild(scoreDivEl);

var scoreLabelEl=document.createElement("p");
    scoreLabelEl.className="score-label";
    scoreLabelEl.textContent="Score:  ";
    scoreDivEl.appendChild(scoreLabelEl);

var scoreEl=document.createElement("span");
    scoreEl.id="score";
    scoreEl.textContent=timeLeft;
    scoreDivEl.appendChild(scoreEl);

var formInitialsEl=document.createElement("form");
    formInitialsEl.className="form-initials";
    mainContentEl.appendChild(formInitialsEl);

var labelInitialsEl=document.createElement("label");
    labelInitialsEl.className="init-label";
    labelInitialsEl.htmlFor="initials";
    labelInitialsEl.textContent="Initials:";
    formInitialsEl.appendChild(labelInitialsEl);

var inputInitialsEl=document.createElement("input");
    inputInitialsEl.id="initials";
    inputInitialsEl.name="initials";
    inputInitialsEl.type="text";
    formInitialsEl.appendChild(inputInitialsEl);

var inputButtonEl=document.createElement("input");
    inputButtonEl.className="init-btn";
    inputButtonEl.type="submit";
    inputButtonEl.value="Submit";
    formInitialsEl.appendChild(inputButtonEl);

    return;
};

/* Load listener for Start button */
startButtonEl.addEventListener("click", startQuiz);

/* Load listener for answer, initial submit, restart, back and clear buttons */
mainContentEl.addEventListener("click", buttonHandler);

/* Load listener for High Score button */
viewHighscoreButtonEl.addEventListener("click", loadHighScores);

