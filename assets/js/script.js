/* Code Quiz Challenge application */
/* DOM references common to all pages */
var quizPageEl = document.querySelector("#quiz-page");
var viewHighscoreButtonEl = document.querySelector("#view-highscore");
var timerEl = document.querySelector("#timer");
var mainContentEl = document.querySelector("#main-content");
var instructions = "This is a timed quiz on JavaScript.  The goal is to answer four multiple choice questions correctly in the least amount of time.  Your score is the time remaining on the clock once all the questions are answered.  The clock will start at 90 seconds.  You will loose 20 seconds for each incorrect answer.  Click the Start button to begin the test.  Good Luck!";
var questionObjArray = {
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
                ]
            };
        


/* Create Start page */     
var instructionsEl = document.createElement("p");
    instructionsEl.className = "instructions";
    instructionsEl.textContent = instructions;
    mainContentEl.appendChild(instructionsEl);

var startButtonEl = document.createElement("button");
    startButtonEl.id = "start-btn";
    startButtonEl.textContent = "START";
    mainContentEl.appendChild(startButtonEl);
    
/* Function to load and run quiz */
var startQuiz = function () {

    console.log("Start Quiz function was run");

    if (document.querySelector(".instructions")) {
        instructionsEl.remove();
        startButtonEl.remove();
    }

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
        questionEl.textContent=questionObjArray.text;
        questionSectionEl.appendChild(questionEl);

      
    /* If code is a part of the question, create the elements and append them */
    if (questionObjArray.code) {
        var codeSectionEl = document.createElement("div");
        codeSectionEl.className = "code-section";
        questionSectionEl.appendChild(codeSectionEl);

        for ( i = 0; i < questionObjArray.codesnips.length; i++) {
            var codeSnipEl = document.createElement("code");
            codeSnipEl.textContent = questionObjArray.codesnips[i];
            var breakEl = document.createElement("br");
            codeSectionEl.appendChild(codeSnipEl);
            codeSectionEl.appendChild(breakEl);
        }
    }
    /* Create the list item elements for the answers */
    for (i = 0; i < questionObjArray.answers.length; i++) {
        var answerListItemEl = document.createElement("li");
        answerListItemEl.className = "answer";
        answerListItemEl.id = "answer" + i;
        answerListItemEl.textContent = questionObjArray.answers[i];
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

/* Load listener for High Score button */
viewHighscoreButtonEl.addEventListener("click", loadHighScores);

/* Load listener for Start button */
startButtonEl.addEventListener("click", startQuiz);

/* Load listener for Quiz ansers */
mainContentEl.addEventListener("click", answerHandler);



