window.onload = () => {
  let app = document.querySelector(".app");
  let message = document.querySelector(".message");
  const score = document.querySelector(".score");
  const buttons = document.querySelectorAll(".btn");
  let btnWrapper = document.querySelector(".buttonWrapper");
  let tempScore = [0, 0];
  let overallSetScore = [0, 0];
  const overallSetScoreDiv = document.querySelector(".overall-set-score");
  const playerIcon = document.querySelector(".img1");
  const opponentIcon = document.querySelector(".img2");
  
  const images = {
   rock: "images/rock.png",
   paper: "images/paper.png",
   scissors: "images/scissors.gif",
   undefined: "images/handsup.png",
  };
  
  playerIcon.setAttribute("src", images.undefined);
  opponentIcon.setAttribute("src", images.undefined);
  
  let numberOfRoundsElement = document.getElementById("number_of_rounds");
  const roundStats = document.getElementById("round_stats");
  
  ///////////////////////
  
  app.onmouseover = function () {
    document.body.style.transition = "1s all ease-in-out";
    document.body.style.backgroundColor = "var(--the-blue)";
    app.style.backgroundColor = "white";
    // app.style.boxShadow = "blue 2px 2px 25px 8px";
   };
   
   function showButtons() {
    let buttonWrapper = document.querySelector(".buttonWrapper");
    buttonWrapper.classList.remove("hidden");
    startHeader = document.querySelector(".start-header");
    app.removeChild(startHeader);
   }
   
   let start = document.querySelector(".start-btn");
   start.addEventListener("click", showButtons);
   
   for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", playGame);
   }
   
   // START THE GAME ///////// ///
   // by clicking one of the three options (r, p, s buttons)
   function playGame(e) {
    score.classList.remove("hidden");
    roundStats.classList.remove("hidden");
    numberOfRoundsElement.classList.add("hidden");
    
    // PLAYER
    let playerSelection = e.target.innerText;
    if (playerSelection === "ROCK") {
      playerIcon.setAttribute("src", images.rock);
      playerIcon.style.margin = "0 auto";
    }
    if (playerSelection === "PAPER") {
      playerIcon.setAttribute("src", images.paper);
    }
    if (playerSelection === "SCISSORS") {
      playerIcon.setAttribute("src", images.scissors);
    }

    // OPPONENT
    let opponentSelection = Math.random();
    if (opponentSelection < 0.34) {
      opponentSelection = "ROCK";
      opponentIcon.setAttribute("src", images.rock);
      opponentIcon.style.margin = "0 auto";
    } else if (opponentSelection <= 0.67) {
      opponentSelection = "PAPER";
      opponentIcon.setAttribute("src", images.paper);
    } else {
      opponentSelection = "SCISSORS";
      opponentIcon.setAttribute("src", images.scissors);
    }

    // Each round result as a string (either You, Opponent or Draw)
    // Adding roundOutput stats ('WIN', 'LOSS', or 'DRAW')
    let result = checkWinner(playerSelection, opponentSelection);
    let roundOutput = document.createElement("span");
    roundOutput.classList.add("small-font");

    if (result == "You") {
      result += " win!";
      tempScore[0]++;
      roundOutput.textContent = "W ";
    } else if (result == "Opponent") {
      result += " wins!";
      tempScore[1]++;
      roundOutput.textContent = "L ";
    } else if (result == "Draw") {
      roundOutput.textContent = "D ";
    } else {
      result;
    }

    roundStats.appendChild(roundOutput);
    let numberOfRounds = roundStats.children.length;
    numberOfRoundsElement.textContent = `${numberOfRounds} rounds`;
   
    // roundStats.appendChild(numberOfRoundsElement);

    // Display the score on webpage
    score.style.padding = "10px";
    score.innerHTML = `You <b>${tempScore[0]} : ${tempScore[1]}</b> Opponent`;

    // Score - Visual difference throughout the rounds of a game based on the current score (GREEN=winning, RED=losing, GREY=draw)
    if (tempScore[0] > tempScore[1]) {
      score.style.color = "green";
    } else if (tempScore[0] < tempScore[1]) {
      score.style.color = "red";
    } else {
      score.style.color = "rgb(131,130,130)";
    }

    // Text output for each round of a game
    messageOutput(
      playerSelection +
        " vs " +
        opponentSelection +
        "<br><b>" +
        result +
        "</b>" +
        "<br>"
    );

    // Calling endGame function when one of the scores reaches 5
    tempScore.forEach((score) => {
      if (score === 5) {
        messageOutput("<b>ANOTHER GAME?</b>");
        endGame(tempScore);
      }
    });
  }

  // General message of each round
  function messageOutput(mes) {
    message.innerHTML = mes;
  }

  // Removing childNodes
  const removeChildren = (parent) => {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };

  // END GAME - final result message + Replay btn
  function endGame(scoreArray) {
   app.lastChild.remove();
   numberOfRoundsElement.classList.remove("hidden");

    // Overall set score set after each game
    if (tempScore[0] > tempScore[1]) {
      overallSetScore[0]++;
      score.style.border = "3px green solid";
    }
    if (tempScore[0] < tempScore[1]) {
      overallSetScore[1]++;
      score.style.border = "3px red solid";
    }
    overallSetScoreDiv.innerHTML = `SETS [ ${overallSetScore[0]} : ${overallSetScore[1]} ]`;

    if (scoreArray[0] < scoreArray[1]) {
      btnWrapper.style.backgroundColor = "#ff5c5c";
      btnWrapper.textContent = `😯 You LOST! 😯`;
      btnWrapper.style.fontWeight = "bold";
      btnWrapper.style.color = "rgb(248, 234, 206)";
      btnWrapper.style.width = "fit-content";
      btnWrapper.style.fontSize = "25px";
      btnWrapper.style.padding = "10px";
      btnWrapper.style.margin = "auto";
      btnWrapper.style.borderRadius = "5px";
      if (scoreArray[0] == 0 && scoreArray[1] == 5) {
        btnWrapper.style.backgroundColor = "#ff5c5c";
        btnWrapper.textContent = `😭 OOH! You LOST terribly! 😭`;
        btnWrapper.style.fontWeight = "bold";
        btnWrapper.style.color = "rgb(248, 234, 206)";
        btnWrapper.style.width = "fit-content";
        btnWrapper.style.fontSize = "25px";
        btnWrapper.style.padding = "10px";
        btnWrapper.style.margin = "auto";
        btnWrapper.style.borderRadius = "5px";
      }
    }

    if (scoreArray[0] > scoreArray[1]) {
      btnWrapper.style.backgroundColor = "#8dc9ad";
      btnWrapper.textContent = "😉 You WON this game! 😉";
      btnWrapper.style.fontWeight = "bold";
      btnWrapper.style.color = "rgb(248, 234, 206)";
      btnWrapper.style.width = "fit-content";
      btnWrapper.style.fontSize = "25px";
      btnWrapper.style.padding = "10px";
      btnWrapper.style.margin = "auto";
      btnWrapper.style.borderRadius = "5px";
      if (scoreArray[0] == 5 && scoreArray[1] == 0) {
        btnWrapper.style.backgroundColor = "#8dc9ad";
        btnWrapper.textContent = "😎 5:0? WOW, AMAZING! 😎";
        btnWrapper.style.fontWeight = "bold";
        btnWrapper.style.color = "rgb(248, 234, 206)";
        btnWrapper.style.width = "fit-content";
        btnWrapper.style.fontSize = "25px";
        btnWrapper.style.padding = "10px";
        btnWrapper.style.margin = "auto";
        btnWrapper.style.borderRadius = "5px";
      }
    }

    let replayBtn = document.createElement("button");
    replayBtn.classList.add("replay-btn");
    replayBtn.textContent = "Replay";
    replayBtn.style.display = "block";
    replayBtn.style.width = "210px";
    replayBtn.style.height = "40px";
    replayBtn.style.backgroundColor = "rgb(217, 223, 230)";
    replayBtn.style.color = "rgb(12, 116, 180)";
    replayBtn.style.fontWeight = "bold";
    replayBtn.style.fontSize = "25px";
    replayBtn.style.borderRadius = "18px";
    replayBtn.style.margin = " 24px auto";
    app.appendChild(replayBtn);

    replayBtn.onmouseover = function () {
      this.style.backgroundColor = "white";
      this.style.color = "var(--the-blue)";
      this.style.cursor = "pointer";
    };

    replayBtn.onmouseout = function () {
      this.style.backgroundColor = "var(--the-grey)";
      this.style.color = "var(--the-blue)";
    };

    //Replay event
    replayBtn.addEventListener("click", () => {
      removeChildren(btnWrapper);
      roundStats.innerHTML = "";

      ///////////////////////
      // btnWrapper.style.display = "grid";
      // btnWrapper.style.textAlign = "center";
      // btnWrapper.style.justifyContent = "center";
      // btnWrapper.style.alignItems = "center";
      btnWrapper.style.backgroundColor = "white";
      for (let i = 0; i < buttons.length; i++) {
        btnWrapper.appendChild(buttons[i]);
        buttons[i].classList.add(".btn");
      }
      replayBtn.classList.add("hidden");
      tempScore = [0, 0];
      score.innerHTML = `You  ${tempScore[0]} : ${tempScore[1]} Opponent`;
      score.style.color = "darkgray";
      score.style.border = "1px black solid";
      messageOutput("<br><br>");
      playerIcon.setAttribute("src", images.undefined);
      opponentIcon.setAttribute("src", images.undefined);
    });
  }

  // Returns You, Opponent or Draw String
  function checkWinner(player, opponent) {
    if (player === opponent) {
      return "Draw";
    }
    if (player === "ROCK") {
      if (opponent === "PAPER") {
        return "Opponent";
      } else {
        return "You";
      }
    }
    if (player === "PAPER") {
      if (opponent === "SCISSORS") {
        return "Opponent";
      } else {
        return "You";
      }
    }
    if (player === "SCISSORS") {
      if (opponent === "ROCK") {
        return "Opponent";
      } else {
        return "You";
      }
    }
    return;
  }
};
