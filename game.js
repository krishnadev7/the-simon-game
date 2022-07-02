var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0
var keypress = true

$(document).on(function(){
    if(keypress == true){
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        keypress = false
    }
})

 $('.btn').click(function () {
   var userChosenColour = $(this).attr('id');
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
 });

  function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(randomChosenColour);
   
  }



function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour){
   $('#'+ currentColour).addClass("pressed")
   setTimeout(function(){
    $('#'+ currentColour).removeClass("pressed");
   },100)
}

function checkAnswer(currentLevel){
       if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence()
            },1000);
        }
       }else{
        playSound('wrong')
        gameOver();
        startOver();
       }
}

function gameOver(){
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    },200);
    $('#level-title').text(`Game Over, Press Any Key to Restart`);
}

function startOver(){
    level = 0;
    gamePattern = [];
    keypress = true;
}