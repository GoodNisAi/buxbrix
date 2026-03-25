let bux = 0;

function playGame() {
  let win = Math.random() > 0.5;

  if (win) {
    bux += 10;
    document.getElementById("result").innerText = "You won! +10 Bux";
  } else {
    document.getElementById("result").innerText = "You lost 😢";
  }

  document.getElementById("bux").innerText = bux;
}
