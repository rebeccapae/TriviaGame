$(document).ready(function() {

var scoreCount = 0;
var questionCount = -1;
var clicked = false;
var seconds = 0;
var userChoice = "";

var triviaBank = [
    {
        question: "How many cocoa beans do you need to make one pound of chocolate?",
        correctAnswer: "400",
        answerChoices: ["600", "350", "400", "500"]
    },
    {
        question: "What is the most popular sweet sold in France?",
        correctAnswer: "Macaron",
        answerChoices: ["Macaron", "Gelato", "Tart", "Chocolate"]
    },
    {
        question: "Per NASA, what is the most missed item?",
        correctAnswer: "Ice Cream",
        answerChoices: ["Brownies", "Cake", "Ice Cream", "Pie"]
    },
    {
        question: "Where was the first macaron made?",
        correctAnswer: "Italy",
        answerChoices: ["France", "Italy", "United States", "England"]
    },
    {
        question: "What dessert combines espresso and ice cream?",
        correctAnswer: "Affogato",
        answerChoices: ["Sundae", "Latte", "Affogato", "Milkshake"]
    },
    {
        question: "What does the Italian word 'Gelato' mean?",
        correctAnswer: "Frozen",
        answerChoices: ["Creamy", "Cold", "Smooth", "Frozen"]
    },
];


$("#start-game").on("click", function() {
    $("#start-game").hide();
    showQuestion();
});


function startOver() {
    
};

function displayTimer() {
    $("#time-remaining").html("<img src='assets/images/timer2.gif' width='200px'/>");
}

function secondsCount(){
    seconds ++;
    console.log(seconds);
}

function stopTimer(){
    clearTimeout(displayTimer);
    clearInterval(secondsCount);
}



function showQuestion() {

    // Increase questionCount by 1
    questionCount ++;
    var question = $("<div>").text(triviaBank[questionCount].question)
    $("#question").append(question);

    var userChoice = ""
        
        // for every question, show the 4 answer choices as buttons
        for (var i = 0; i <4; i++){
            var answerButtons = $("<button>");
            answerButtons.addClass("answerChoiceButtons")
            answerButtons.text(triviaBank[questionCount].answerChoices[i]);
            $("#question").append(answerButtons);
        };

        // To run the timer gif and increase seconds count by 1 each second
        setTimeout(displayTimer, 0);
        setInterval(secondsCount, 1000);

        // If the user clicks a button within 10 seconds, evaluate. If not, show the next question.
        if (seconds < 10 && clicked == true) {
            if (userChoice === triviaBank[questionCount].correctAnswer) {
                scoreCount ++;
                console.log("user wins: " + scoreCount);
            }
            else {
                if (questionCount < triviaBank.length -1) {
                showQuestion(); }
                else {
                    stopGame();
                };
            }
        }
        else {
            alert("Out of Time");
            stopTimer();
           
        }

        // Store the user's choice into a variable
        $(".answerChoiceButtons").on("click", function() {
            clicked = true;
            userChoice = $(this).text();
            console.log(userChoice);

        // Compare the user's answer with the correct answer
        
        });
    

        
    };

function nextQuestion() {

}

function stopGame() {
    
}

});