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
            correct: 1 
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
            correct: 2 
            }];
var questionId = 0;

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
    var timeLeft = 99;

    var timeInterval = setInterval(function(){
        if ( timeLeft > 0 ) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        } else {
            clearInterval();
            quizOver();
        }
    }, 1000);

};

var clearPage =function () {
    if (instructionsEl) {
        instructionsEl.remove();
        startButtonEl.remove();
    } else {
        if (questionSectionEl) {
        questionSectionEl.remove();
        answerSectionEl.remove();
        }
    }

    // if (mainContentEl) {
    //     mainContentEl.remove();
    //     var mainContentEl = document.createElement("section");
    //     mainContentEl.id = "main-content";
    //     quizPageEl.appendChild(mainContentEl);
    //     console.log("#main-content section has been recreated");
    //     console.log(mainContentEl);
    // }

    return;
};
 
/* Function to load and run quiz */
var startQuiz = function () {

    /* randomly select a question from the question array */
    console.log(questionObjArray.length);
    questionId = Math.floor(Math.random() * questionObjArray.length);
    console.log("The question ID is " + questionId);

    /* clear the elements in the main content section */
    clearPage();

    /* start the timer */
   countDown();

   /* load the questions */
  
   loadQuestions(questionId);
  

   
    return;
};

var loadQuestions = function (questionId) {

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
 console.log(questionObjArray[questionId].answers.length);
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

    console.log("The answerHandler function was run");

    return;
};

var quizOvewr = function () {

    console.log("The quiz is over");

    return;
}



/* Load listener for High Score button */
viewHighscoreButtonEl.addEventListener("click", loadHighScores);

/* Load listener for Start button */
startButtonEl.addEventListener("click", startQuiz);

/* Load listener for Quiz ansers */
mainContentEl.addEventListener("click", answerHandler);



