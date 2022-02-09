var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

//game-start if user presses any key
var firstKeypress = false;
var level = 0;
$(document).keypress(function(){
    if(!firstKeypress){
        $("#level-title").text("Level " + level)
        nextSequence();
        firstKeypress = true;
    }
    $("p").text("");
});

//game brain 
function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);  
    var randomChosenColor = buttonColors[randomNumber];  
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

//user input function
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//sound function
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation function 
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//main game logic
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        var count = 0 
        for (var i = 0; i < userClickedPattern.length; i++){
            if (userClickedPattern[i] === gamePattern[i]){
                count++;
            }
        }
        if (count === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
    }
}
    else{
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over");
        $("p").text("Press any key to restart");
        startover();
    }
}

//restarting the game
function startover(){
    level = 0;
    firstKeypress = false;
    gamePattern = [];
}