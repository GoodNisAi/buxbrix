// APPWRITE SETUP
const client = new Appwrite.Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("69c3c65d0005e5bbeaaf");

const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);

const DB_ID = "buxbrixDB";
const COLLECTION_ID = "users";

let currentUser = null;
let bux = 0;

// AUTO LOGIN
loadUser();

// SIGNUP
async function signup() {
  let user = username.value;
  let pass = password.value;
  let email = user + "@buxbrix.com";

  try {
    await account.create(Appwrite.ID.unique(), email, pass, user);
    showMsg("Account created! Now login.");
  } catch (err) {
    showMsg(err.message);
  }
}

// LOGIN
async function login() {
  let user = username.value;
  let pass = password.value;
  let email = user + "@buxbrix.com";

  try {
    await account.createEmailSession(email, pass);
    loadUser();
  } catch {
    showMsg("Login failed");
  }
}

// LOGOUT
async function logout() {
  await account.deleteSession("current");
  location.reload();
}

// LOAD USER
async function loadUser() {
  try {
    let user = await account.get();
    currentUser = user.$id;

    document.getElementById("auth").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("userDisplay").innerText = user.name;

    loadBux();
  } catch {}
}

// MESSAGE
function showMsg(msg) {
  document.getElementById("authMsg").innerText = msg;
}

// LOAD BUX
async function loadBux() {
  let res = await databases.listDocuments(DB_ID, COLLECTION_ID);

  let doc = res.documents.find(d => d.userId === currentUser);

  if (!doc) {
    await databases.createDocument(DB_ID, COLLECTION_ID, Appwrite.ID.unique(), {
      userId: currentUser,
      bux: 0
    });
    bux = 0;
  } else {
    bux = doc.bux;
  }

  updateBux();
}

// UPDATE BUX
async function updateBux() {
  document.getElementById("bux").innerText = bux;

  let res = await databases.listDocuments(DB_ID, COLLECTION_ID);
  let doc = res.documents.find(d => d.userId === currentUser);

  if (doc) {
    await databases.updateDocument(DB_ID, COLLECTION_ID, doc.$id, {
      bux: bux
    });
  }
}

// GAME SYSTEM
function startGame(game) {
  menu.classList.add("hidden");
  gameArea.classList.remove("hidden");

  if (game === "clicker") loadClicker();
  if (game === "guess") loadGuess();
}

function backToMenu() {
  menu.classList.remove("hidden");
  gameArea.classList.add("hidden");
  gameContent.innerHTML = "";
}

// CLICKER GAME (mobile ready)
function loadClicker() {
  gameTitle.innerText = "Tap Game";

  gameContent.innerHTML = `
    <button ontouchstart="tap()" onclick="tap()">+1 Bux</button>
  `;
}

function tap() {
  bux++;
  updateBux();
}

// GUESS GAME
let number;

function loadGuess() {
  number = Math.floor(Math.random() * 5) + 1;

  gameTitle.innerText = "Guess 1-5";

  gameContent.innerHTML = `
    <input id="guessInput" type="number" min="1" max="5">
    <br><br>
    <button onclick="checkGuess()">Guess</button>
    <p id="guessResult"></p>
  `;
}

function checkGuess() {
  let guess = guessInput.value;

  if (guess == number) {
    bux += 20;
    guessResult.innerText = "Correct! +20 Bux 🎉";
  } else {
    guessResult.innerText = "Wrong 😢";
  }

  updateBux();
}
