"use strict";

let current1 = document.getElementById("current-1");
let current2 = document.getElementById("current-2");

let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");

let plyr1 = document.querySelector(".player1");
let plyr2 = document.querySelector(".player2");

let bDice = document.querySelector(".dice");
let bHold = document.querySelector(".hold");
let bReset = document.querySelector(".reset");

let dice = document.querySelector("img");

let playing, total, activePlayer, currentScore;

const init = function () {
  playing = true;
  total = [0, 0];
  activePlayer = 1;
  currentScore = 0;

  document.getElementById("current-1").textContent = "0";
  document.getElementById("current-2").textContent = "0";
  document.getElementById("score1").textContent = "0";
  document.getElementById("score2").textContent = "0";
  plyr1.classList.remove("winner");
  plyr2.classList.remove("winner");
  dice.classList.add("hidden");
  plyr1.classList.add("active");
  plyr2.classList.remove("active");
};

init();

bReset.addEventListener("click", init);

const switchPlayer = function () {
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  plyr1.classList.toggle("active");
  plyr2.classList.toggle("active");
};

bDice.addEventListener("click", function () {
  if (playing) {
    let roll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${roll}.png`;
    dice.classList.remove("hidden");

    if (roll !== 1) {
      currentScore += roll;
      document.querySelector(`#current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

bHold.addEventListener("click", function () {
  if (playing) {
    total[activePlayer - 1] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent =
      total[activePlayer - 1];
    if (total[activePlayer - 1] <= 10) {
      switchPlayer();
    } else {
      document.querySelector(`.player${activePlayer}`).classList.add("winner");
      playing = false;
      dice.classList.add("hidden");
    }
  }
});
