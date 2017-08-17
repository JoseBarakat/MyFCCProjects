$(document).ready(function() {

  var randColors = [];
  var round;
  var clickRound;
  var timeForEachPad = 400;
  // This variable will be used to check
  // if the game is powered on or off
  var powerCheck = 0;
  // This objects are going to be useful 
  // to identify and shorten many things.
  var greenPad = {
      color: "green",
      gradColor: "green-grad",
      audio: document.getElementById("audio1"),
      item: "greenCanvas"
    },
    redPad = {
      color: "red",
      gradColor: "red-grad",
      audio: document.getElementById("audio2"),
      item: "redCanvas"
    },
    yellowPad = {
      color: "yellow",
      gradColor: "yellow-grad",
      audio: document.getElementById("audio3"),
      item: "yellowCanvas"
    },
    bluePad = {
      color: "blue",
      gradColor: "blue-grad",
      audio: document.getElementById("audio4"),
      item: "blueCanvas"
    };

  // Illuminate pad and generate sound
  function illuminate(col) {
    if (col === "green") {
      console.log("color was green");
      greenPad.audio.play();
      $("#green").addClass("green-grad");
      setTimeout(function() {
        $("#green").removeClass("green-grad");
      }, timeForEachPad);
    }

    if (col === "blue") {
      console.log("color was blue");
      bluePad.audio.play();
      $("#blue").addClass("blue-grad");
      setTimeout(function() {
        $("#blue").removeClass("blue-grad");
      }, timeForEachPad);
    }

    if (col === "red") {
      console.log("color was red");
      redPad.audio.play();
      $("#red").addClass("red-grad");
      setTimeout(function() {
        $("#red").removeClass("red-grad");
      }, timeForEachPad);
    }

    if (col === "yellow") {
      console.log("color was yellow");
      yellowPad.audio.play();
      $("#yellow").addClass("yellow-grad");
      setTimeout(function() {
        $("#yellow").removeClass("yellow-grad");
      }, timeForEachPad);
    }
  }

  // Generate a random array of colors
  // This function is set for a 10 rounds game
  //  
  function randomColorsGenerator() {
    while (randColors.length < 10) {
      // If number is between
      if (Math.random() * 4 < 1) {
        randColors.push("red");
      } else
      if (Math.random() * 4 >= 1 && Math.random() * 4 < 2) {
        randColors.push("blue");
      } else
      if (Math.random() * 4 >= 2 && Math.random() * 4 < 3) {
        randColors.push("yellow");
      } else {
        randColors.push("green");
      }
    }
    console.log("Actual color sequence is (" + randColors + ")");
  }

  // Reproduce just one round
  function reproduceRound(round) {
    // Set round number in display
    $("#counter").text(round);
    // Delay between rounds (in milliseconds)
    var timeBetweenRounds = 1000;

    for (var i = 0; i < round; i++) {
      setTimeout(illuminate, (i + 1) * timeBetweenRounds, randColors[i]);
    }
  }

  
  function normal() {
    round = 1;
    
    // New random array of colors
    randColors = [];
    randomColorsGenerator();
    
    //Press Play to begin
    //$(".btn-danger").click(function() {
    reproduceRound(round);
    //});

    // clickRound: How many clicks per round.
    clickRound = 0;
    // Register clicks
    $("canvas").click(function(event) {
      //for(var i = 0; i<ronda; i++){
      illuminate(event.target.id);

      // Validate Clicks
      // If the user clicked in the right place
      if (randColors[clickRound] == event.target.id) {
        clickRound++;
        console.log("Good Job!");
        console.log("Right color. Round " + 
                    round + ". You have clicked " + 
                    clickRound + " times in this round");
        
        // Example: in 3rd round, user must click 3 times
        if (round == clickRound) {
          
          // round + 1 (go to next round)
          round++;
          
          // Reset click counter
          clickRound = 0;
          console.log("Right color. Round = " +
                      round + ". Clicks in this round = " + clickRound);
          
          // Reproduce next round
          reproduceRound(round);
          }
        
        } else {
          // User made a mistake
          // Missmatch!
          console.log("Wrong color ->" + event.target.id);
          console.log("Start from begining");
          
          // Error sound
          greenPad.audio.play();
          redPad.audio.play();
          yellowPad.audio.play();
          bluePad.audio.play();
          
          // New array of colors generated
          randomColorsGenerator();
          
          // Start from round 1
          // round = 1;
          clickRound = 0;
          $("#counter").text(round);
          
          // Reproduce actual round
          reproduceRound(round);
        }
      });
    
  }
  

  function strict() {
    round = 1;
    
    // New random array of colors
    randColors = [];
    randomColorsGenerator();
    
    //Press Play to begin
    //$(".btn-danger").click(function() {
    reproduceRound(round);
    //});

    // clickRound: How many clicks per round.
    clickRound = 0;
    // Register clicks
    $("canvas").click(function(event) {
      //for(var i = 0; i<ronda; i++){
      illuminate(event.target.id);

      // Validate Clicks
      // If the user clicked in the right place
      if (randColors[clickRound] == event.target.id) {
        clickRound++;
        console.log("Good Job!");
        console.log("Right color. Round " + 
                    round + ". You have clicked " + 
                    clickRound + " times in this round");
        
        // Example: in 3rd round, user must click 3 times
        if (round == clickRound) {
          
          // round + 1 (go to next round)
          round++;
          
          // Reset click counter
          clickRound = 0;
          console.log("Right color. Round = " +
                      round + ". Clicks in this round = " + clickRound);
          
          // Reproduce next round
          reproduceRound(round);
          }
        
        } else {
          // User made a mistake
          // Missmatch!
          console.log("Wrong color ->" + event.target.id);
          console.log("Start from begining");
          
          // Error sound
          greenPad.audio.play();
          redPad.audio.play();
          yellowPad.audio.play();
          bluePad.audio.play();
          
          // New array of colors generated
          randomColorsGenerator();
          
          // Start from round 1
          round = 1;
          clickRound = 0;
          $("#counter").text(round);
          
          // Reproduce actual round
          reproduceRound(round);
        }
      });
    
  }

  $(".onoffswitch-label").click(function() {
    powerCheck = powerCheck + 1;
    console.log("powerCheck = " + powerCheck);

    // If powerCheck is an odd number, it means
    // that the game has been powered on,
    // and now the user can start playing.
    if (powerCheck % 2 === 0) {
      console.log("Turned Off");
      randColors = [];
      round = 1;
      clickRound = 0;
      
      // Stop sound
      greenPad.audio.stop();
      redPad.audio.stop();
      yellowPad.audio.stop();
      bluePad.audio.stop();
          
      $(".count").removeClass("led-on");
      //Add "disabled" status to normal 
      //mode (Play) and strict mode buttons again.
      $(".btn").addClass("disabled");
      //$(".btn").prop( "disabled", true );
      $("canvas").prop("disabled", true);
      //$("canvas").addClass("disabled");
      //Reset counter to "00"
      $("#counter").text("00");
    } else {
      // The game has been turned on
      console.log("Turned On");
      randColors = [];

      // Change color of led display numbers
      $(".count").addClass("led-on");
      // Activating buttons
      $(".btn").removeClass("disabled");

      $(".btn-success").click(function() {
        console.log("Simon has started in Normal Mode");
        normal();
      });

      $(".btn-danger").click(function() {
        console.log("Simon has started in Strict Mode");
        strict();
      });

    }
  });
  // End of onoffswitch
});
