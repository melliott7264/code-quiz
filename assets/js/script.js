/* Code Quiz Challenge application */
/* DOM references common to all pages */
var quizPageEl = document.querySelector("#quiz-page");
var viewHighscoreButtonEl = document.querySelector("#view-highscore");
var timerEl = document.querySelector("#timer");
var mainContentEl = document.querySelector("#main-content");
var instructions = "This is a timed quiz on JavaScript.  The goal is to answer four multiple choice questions correctly in the least amount of time.  Your score is the time remaining on the clock once all the questions are answered.  The clock will start at 90 seconds.  You will loose 20 seconds for each incorrect answer.  Click the Start button to begin the test.  Good Luck!";
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
var timeInterval = 1;

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
        if ( timeLeft > 0 ) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval);
            quizOver();
        }
    }, 1000);

};

var clearPage =function () {
    // debugger;
    if (instructionsEl) {
        instructionsEl.remove();}
    if (startButtonEl) {
        startButtonEl.remove();}
    if (questionSectionEl=document.querySelector(".question-section")) {
    questionSectionEl.remove();}
    if (answerSectionEl=document.querySelector(".answer-section")){
    answerSectionEl.remove();}    

    return;
};
 
/* Function to load and run quiz */
var startQuiz = function () {
  
   /* reinitiallize the time left */
   timeLeft=60;

   /* start the timer */
   countDown();

   /* select and load the questions */
   runQuiz();
   
};

var runQuiz = function () {
 /* Select and load questions  */
var i = 0;

for  (i = 0; i < numQuestions; i++) {
    console.log("This is the  " + i + " time through the question loop" );
    /* randomly select a question from the question array */
    // questionId = Math.floor(Math.random() * questionObjArray.length);
    questionId = i;
    console.log("The question ID is " + questionId);
debugger;
    loadQuestions(questionId);

var isTrue = false;

    // while (!isTrue) {
    // /* Load listener for Quiz ansers */
    // isTrue = mainContentEl.addEventListener("click", answerHandler);
    // }
} 

quizOver();

};


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

var loadHighScores = function () {

    console.log("View Highscore button was clicked");

    return;
};

var answerHandler = function (event) {

    event.preventDefault;

    var answer = event.target.id;

    switch (answer) {
        case "answer0": 
            if ( questionObjArray[questionId].correct === 0) {
                return true;
            } else { 
                timeLeft = timeLeft - 20;
                return true;
            } 
        case "answer1":
            if ( questionObjArray[questionId].correct === 1) {
                return true;
            } else { 
                timeLeft = timeLeft - 20;
                return true;
            } 
        case "answer2":
            if ( questionObjArray[questionId].correct === 2) {
                return true;
            } else { 
                timeLeft = timeLeft - 20;
                return true;
            } 
        case "answer3":
            if ( questionObjArray[questionId].correct === 3) {
                return true;
            } else { 
                timeLeft = timeLeft - 20;
                return true;
            } 
        default:
            // timeLeft = timeLeft - 20;
            return false;
    }

};

var quizOver = function () {

    /* stop the clock if it is not already stoped */
    clearInterval(timeInterval);

    console.log("The quiz is over.  " + timeLeft + " seconds remaining");

    return;
}



/* Load listener for High Score button */
viewHighscoreButtonEl.addEventListener("click", loadHighScores);

/* Load listener for Start button */
startButtonEl.addEventListener("click", startQuiz);

mainContentEl.addEventListener("click", answerHandler);



