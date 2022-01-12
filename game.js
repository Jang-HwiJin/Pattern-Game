var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var randomChosenColor;
var level = 0;
var started = false;

// Will run the next part of the game
function nextSequence() {
  userClickedPattern = [];
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

//Actions it takes when buttons are pressed
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


$(document).keydown(function() {
  if (!started) { //Checks to see if it is starting a new round
    nextSequence();
    started = true;
  }
});

//Compares the user's answer to the answer
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success!");
    if(gamePattern.length == userClickedPattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong!");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Your score is " + level + ". Press Any Key To Restart!");
    startOver();
  }
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}

//Minified JS
//var randomNumber,randomChosenColor,buttonColors=["red","blue","green","yellow"],gamePattern=[],userClickedPattern=[],level=0,started=!1;function nextSequence(){userClickedPattern=[],randomNumber=Math.floor(4*Math.random()),randomChosenColor=buttonColors[randomNumber],gamePattern.push(randomChosenColor),$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100),playSound(randomChosenColor),level++,$("h1").text("Level "+level)}function playSound(e){new Audio("sounds/"+e+".mp3").play()}function animatePress(e){$("#"+e).addClass("pressed"),setTimeout(function(){$("#"+e).removeClass("pressed")},100)}function checkAnswer(e){gamePattern[e]==userClickedPattern[e]?(console.log("Success!"),gamePattern.length==userClickedPattern.length&&setTimeout(function(){nextSequence()},1e3)):(console.log("Wrong!"),new Audio("sounds/wrong.mp3").play(),$("body").addClass("game-over"),setTimeout(function(){$("body").removeClass("game-over")},200),$("h1").text("Game Over. Your score is "+level+". Press Any Key To Restart!"),startOver())}function startOver(){started=!1,gamePattern=[],level=0}$(".btn").click(function(){var e=this.id;userClickedPattern.push(e),playSound(e),animatePress(e),checkAnswer(userClickedPattern.length-1)}),$(document).keydown(function(){started||(nextSequence(),started=!0)});
