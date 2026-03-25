let bux = localStorage.getItem("bux") || 0;
bux = parseInt(bux);
updateBux();

function updateBux() {
  document.getElementById("bux").innerText = bux;
  localStorage.setItem("bux", bux);
}

// MENU SYSTEM
function startGame(game) {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("gameArea").classList.remove("hidden");

  if (game === "clicker") loadClicker();
  if (game === "guess") loadGuess();
}

function backToMenu() {
  document.getElementById("menu").classList.remove("hidden");
  document.getElementById("gameArea").classList.add("hidden");
  document.getElementById("gameContent").innerHTML = "";
}

// GAME 1: CLICKER (Mobile Friendly)
function loadClicker() {
  document.getElementById("gameTitle").innerText = "Tap Fast!";

  document.getElementById("gameContent").innerHTML = `
    <p>Tap the button to earn Bux</p>
    <button ontouchstart="tapBux()" onclick="tapBux()">+1 Bux</button>
  `;
}

function tapBux() {
  bux += 1;
  updateBux();
}

// GAME 2: GUESS NUMBER
let number;

function loadGuess() {
  number = Math.floor(Math.random() * 5) + 1;

  document.getElementById("gameTitle").innerText = "Guess 1-5";

  document.getElementById("gameContent").innerHTML = `
    <p>Guess the number (1-5)</p>
    <input id="guessInput" type="number" min="1" max="5">
    <br><br>
    <button onclick="checkGuess()">Guess</button>
    <p id="guessResult"></p>
  `;
}

function checkGuess() {
  let guess = document.getElementById("guessInput").value;

  if (guess == number) {
    bux += 20;
    document.getElementById("guessResult").innerText = "Correct! +20 Bux 🎉";
  } else {
    document.getElementById("guessResult").innerText = "Wrong 😢";
  }

  updateBux();
}
