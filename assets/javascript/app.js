$(document).ready(function() {

    var scoreCount = 0;
    var questionCount = -1;
    var clicked = false;
    var seconds = 0;
    var secondsCounter;
    var userChoice = ""
    var secondsRem = 10;
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

    $("#total-score").hide();

    $("#start-game").on("click", function() {
        $("#start-game").hide();
        showQuestion();   
    });

    function displayTimer() {
        $("#time-remaining").text("seconds remaining: " + secondsRem);
    };

    function secondsCount(){
        seconds ++;
        secondsRem --;
        console.log("seconds: " + seconds);
        if (seconds > 10) {
            console.log("seconds = 10")
            stopTimer();
            clicked = false;
            $("#question-box").text("Time's Up! The correct answer is: ");
            showAnswer();
            console.log("clicked: " + clicked);
            setTimeout(showQuestion, 2000);
        }
        else {
            console.log("under 10 seconds")
        };
    };

    function startTimer(){
        setTimeout(displayTimer, 0);
        secondsCounter = setInterval(secondsCount, 1000);
        secondsRemaining = setInterval(displayTimer, 1000);
    };

    function stopTimer(){
        clearInterval(secondsCounter);
        clearInterval(secondsRemaining);
        seconds = 0;
        secondsRem = 10;
        console.log("seconds stopped: " + seconds)
        
    };

    function endGame() {
        $("#total-score").show();
        $("#total-score").text("Good job for finishing this quiz. You got: " + scoreCount + "/6 questions right!");
        $("#question-box").empty();
        $("#answer").empty();
        $("#time-remaining").empty();
        var startOver = $("<button>");
        startOver.addClass("startover");
        startOver.text("Start Over?");
        $("#question-box").append(startOver);
        $(".startover").on("click", function(){
            scoreCount = 0;
            questionCount = -1;
            clicked = false;
            seconds = 0;
            secondsCounter;
            userChoice = ""
            secondsRem = 10;
            showQuestion();
            $("#total-score").hide();
        }); 
    };

    function showAnswer() {
        var correctAnswer = $("<div>");
        correctAnswer.text(triviaBank[questionCount].correctAnswer);
        $("#question-box").append(correctAnswer);
        console.log("correct answer: " + triviaBank[questionCount].correctAnswer)

        
    };

    function showQuestion() {

        // Increase questionCount by 1
        questionCount ++;

        if (questionCount == 6) {
            endGame();
        }

        console.log("questionCount: " + questionCount);
        $("#question-box").text(triviaBank[questionCount].question)

        
        
    
        // for every question, show the 4 answer choices as buttons
        $("#answer").empty();
        for (var i = 0; i <4; i++){
            var answerButtons = $("<button>");
            answerButtons.addClass("answerChoiceButtons");
            answerButtons.attr("buttonValue", triviaBank[questionCount].answerChoices[i])
            answerButtons.text(triviaBank[questionCount].answerChoices[i]);
            $("#answer").append(answerButtons);
        };

        startTimer();

        $(".answerChoiceButtons").on("click", function() {
            clicked = true;
            stopTimer();
            userChoice = $(this).text();
            console.log("user choice: " + userChoice);
            console.log("clicked: " + clicked)

            if (userChoice === triviaBank[questionCount].correctAnswer) {
                var rightAnswer = $("<p>").text("You got it right!")
                $("#question-box").append(rightAnswer);
                setTimeout(showQuestion, 2000);
                scoreCount ++;
            }
            else {
                var wrongAnswer = $("<p>").text("Wrong answer. The correct answer is :")
                $("#question-box").append(wrongAnswer);
                showAnswer();
                setTimeout(showQuestion, 2000);
            }
        
        });
    };

});