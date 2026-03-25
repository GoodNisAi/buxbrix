let currentUser = localStorage.getItem("currentUser");

// AUTO LOGIN
if (currentUser) {
  showApp();
}

// SIGN UP
function signup() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    return showMsg("Fill all fields");
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    return showMsg("User already exists");
  }

  users[username] = {
    password: password,
    bux: 0
  };

  localStorage.setItem("users", JSON.stringify(users));
  showMsg("Account created! Now login.");
}

// LOGIN
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username] || users[username].password !== password) {
    return showMsg("Invalid login");
  }

  localStorage.setItem("currentUser", username);
  currentUser = username;

  showApp();
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// SHOW APP
function showApp() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("userDisplay").innerText = currentUser;

  loadBux();
}

// MESSAGE
function showMsg(msg) {
  document.getElementById("authMsg").innerText = msg;
}

// BUX SYSTEM (PER USER)
function loadBux() {
  let users = JSON.parse(localStorage.getItem("users"));
  bux = users[currentUser].bux;
  updateBux();
}

function updateBux() {
  let users = JSON.parse(localStorage.getItem("users"));
  users[currentUser].bux = bux;

  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("bux").innerText = bux;
}

// GAME SYSTEM
let bux = 0;

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

// CLICKER
function loadClicker() {
  document.getElementById("gameTitle").innerText = "Tap Fast!";

  document.getElementById("gameContent").innerHTML = `
    <button ontouchstart="tapBux()" onclick="tapBux()">+1 Bux</button>
  `;
}

function tapBux() {
  bux += 1;
  updateBux();
}

// GUESS GAME
let number;

function loadGuess() {
  number = Math.floor(Math.random() * 5) + 1;

  document.getElementById("gameTitle").innerText = "Guess 1-5";

  document.getElementById("gameContent").innerHTML = `
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
