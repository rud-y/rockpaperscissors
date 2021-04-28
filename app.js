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
  ///////////////////////

  app.onmouseover = function () {
    document.body.style.transition = "1s all ease-in-out";
    document.body.style.backgroundColor = "var(--the-blue)";
    app.style.backgroundColor = "white";
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
    //PLAYER
    let playerSelection = e.target.innerText;
    if (playerSelection === "ROCK") {
      playerIcon.setAttribute("src", images.rock);
      // playerIcon.style.maxWidth = "100px";
      playerIcon.style.margin = "0 auto";
    }
    if (playerSelection === "PAPER") {
      playerIcon.setAttribute("src", images.paper);
    }
    if (playerSelection === "SCISSORS") {
      playerIcon.setAttribute("src", images.scissors);
    }

    //OPPONENT
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

    // Result as a String (either Player, Opponent or Draw)
    let result = checkWinner(playerSelection, opponentSelection);

    if (result == "Player") {
      result += " wins!";
      tempScore[0]++;
    } else if (result == "Opponent") {
      result += " wins!";
      tempScore[1]++;
    } else {
      result;
    }

    // Display the score on webpage
    score.style.padding = "10px";
    score.innerHTML = `Player <b>${tempScore[0]} : ${tempScore[1]}</b> Opponent`;

    // Score - VISUAL DIFFERENCE throughout the rounds of a game(GREEN=winning, RED=losing, GREY=draw)
    if (tempScore[0] > tempScore[1]) {
      score.style.color = "green";
    } else if (tempScore[0] < tempScore[1]) {
      score.style.color = "red";
    } else {
      score.style.color = "rgb(131,130,130)";
    }

    // calling endGame function when one of the scores reaches 5
    tempScore.forEach((score) => {
      if (score === 5) {
        endGame(tempScore);
      }
    });

    // Text output for each round
    messageOutput(
      playerSelection +
        " vs " +
        opponentSelection +
        "<br><b>" +
        result +
        "</b>" +
        "<br>"
    );
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

  // END GAME /////////////
  // At the end of a game displays feedback div with final result message + Replay btn
  function endGame(scoreArray) {
    // Removing replayBtn from prev. round
    app.lastChild.remove();

    // OVERALL SET SCORE set after each round
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
      btnWrapper.textContent = "😉 You WON the round! 😉";
      btnWrapper.style.fontWeight = "bold";
      btnWrapper.style.color = "rgb(248, 234, 206)";
      btnWrapper.style.width = "fit-content";
      btnWrapper.style.fontSize = "25px";
      btnWrapper.style.padding = "10px";
      btnWrapper.style.margin = "auto";
      btnWrapper.style.borderRadius = "5px";
      if (scoreArray[0] == 5 && scoreArray[1] == 0) {
        btnWrapper.style.backgroundColor = "#8dc9ad";
        btnWrapper.textContent = "😎 5:0 ? WOW! AMAZING! 😎";
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
      this.style.backgroundColor = "rgb(217, 223, 230)";
      this.style.color = "rgb(12, 116, 180)";
    };

    //Replay event
    replayBtn.addEventListener("click", () => {
      removeChildren(btnWrapper);

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
      score.innerHTML = `Player ${tempScore[0]} : ${tempScore[1]} Opponent`;
      score.style.color = "darkgray";
      score.style.border = "1px black solid";
      messageOutput("<b>LET'S START AGAIN</b>");
      playerIcon.setAttribute("src", images.undefined);
      opponentIcon.setAttribute("src", images.undefined);
    });
  }

  // Returns Player, Opponent or Draw String
  function checkWinner(player, opponent) {
    if (player === opponent) {
      return "Draw";
    }
    if (player === "ROCK") {
      if (opponent === "PAPER") {
        return "Opponent";
      } else {
        return "Player";
      }
    }
    if (player === "PAPER") {
      if (opponent === "SCISSORS") {
        return "Opponent";
      } else {
        return "Player";
      }
    }
    if (player === "SCISSORS") {
      if (opponent === "ROCK") {
        return "Opponent";
      } else {
        return "Player";
      }
    }
    return;
  }
};
