let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let target = $("#target-letter");
let sentence = $("#sentence");
let sentenceCounter = 0;
let letterCounter = 0;
let letterString = sentences[sentenceCounter].toString();
let letterStringLength = letterString.length
let numberOfMistakes = 0;
let startTime;
let endTime;
let minutes;
let wordsPerMinute;
let gameActiveCount = false;


sentence.html(letterString);

target.html(letterString[letterCounter])

$( document ).ready(function() {
      $("#button-group").hide();
      $("#keyboard-upper-container").hide();
      

});
$( document).keydown(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    }
  });

$( document ).keyup(function (e) {
    if (e.keyCode == 16) {
        $("#keyboard-lower-container").show();
        $("#keyboard-upper-container").hide();
    }
  });

function refreshSentence(){
  sentenceCounter += 1

  if (sentenceCounter < 5) {

     $( "#feedback" ).empty()
     letterString = sentences[sentenceCounter].toString();
     letterStringLength = letterString.length
     sentence.html(letterString);
     target.html(letterString[0])
     letterCounter = 0;
     $('#yellow-block').animate({left: "20px"});


  } else {
    //calculate end time and words per minute
    gameActiveCount = false;
    endTime = Date.now();
    minutes = (endTime - startTime) / 1000 / 60;
    wordsPerMinute = 54 / minutes - 2 * numberOfMistakes;
    console.log(wordsPerMinute);
     $('#yellow-block').animate({opacity: "0%"}, 1500);
     $( "#sentence" ).empty()
     $( "#target-letter" ).empty()
     $("#button-group").show();
     $( "#sentence" ).html("<p>Your words per minute: " +  wordsPerMinute + " </p>")
  }
 
}

function wrongLetter(){
  numberOfMistakes += 1
  $('#yellow-block').animate({left: "+=18px"}, 10);
  $('#feedback').append('<span class="glyphicon glyphicon glyphicon-remove"></span>');
if (letterCounter > letterStringLength - 2) {refreshSentence();
  } else {
 
     letterCounter += 1;
     target.html(letterString[letterCounter]); 
  };
  };


function checknextLetter() {
  $('#yellow-block').animate({left: "+=18px"}, 10);
  $('#feedback').append('<span class="glyphicon glyphicon glyphicon-ok"></span>');

if (letterCounter > letterStringLength - 2) {
  refreshSentence();
  } else {
     letterCounter += 1;
     target.html(letterString[letterCounter]); 
  };
}
    

function inputKey(e) {
  if (gameActiveCount === true) {
        let currentLetter = target.html();
        let currentKey = e.which;
        let expectedKey = currentLetter.charCodeAt();
        if (currentKey == expectedKey) { checknextLetter() } else { wrongLetter() };
  }
      };

$(document).keypress(function (e) {
        
        let currentKey = e.which;
        
        if (gameActiveCount === false) {
          startTime = Date.now();
          gameActiveCount = true;
        }
        
        inputKey(e)
        // yellow color
        $('#' + currentKey).css("background-color", "yellow")
        setTimeout(function () {
          $('#' + currentKey).css("background-color", "")
        }, 120);
        
      });
      

function resetGame() {
  second = 0;
  counter = setInterval(function(){
    second++;
  }, 1000);
  $("#button-group").hide();
  $( "#feedback" ).empty()
}