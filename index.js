let sCount = 0;
let lCount = 0;
var refreshIntervalId;
var gameStarted = false;
var confetti;
function noOfGames() {
  if (parseInt(document.getElementById("numberOfClicks").value) > 0)
    StartGame();
  else {
    document.getElementById("error").innerHTML =
      "Set time (between 1 to 10 seconds) and start game, before clicking!!";
    return;
  }
}
function eventListener(e) {
  e = e || window.event;
  console.log(e);

  if (!gameStarted) return;

  if (e.keyCode == 115) {
    sCount++;
    document.getElementById("pressS").innerHTML = sCount;
  } else if (e.keyCode == 108) {
    lCount++;
    document.getElementById("pressL").innerHTML = lCount;
  }
}
function StartGame() {
  console.log("Called start");
  sCount = 0;
  lCount = 0;
  gameStarted = true;
  if (confetti) confetti.clear();
  const timeToGame =
    parseInt(document.getElementById("numberOfClicks").value) * 1000;
  document.getElementById("pressL").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("pressS").innerHTML = "";
  document.getElementById("pressL").innerHTML = "";
  document.getElementById("error").innerHTML = "";
  document.getElementById("counter").innerHTML = "";

  document.onkeypress = eventListener;

  updateTimer(timeToGame);
  setTimeout(() => {
    finishGame();
  }, timeToGame);
}
function updateTimer(timeToGame) {
  timeToGame = timeToGame / 1000;
  document.getElementById("counter").innerHTML = timeToGame-- + " seconds";
  refreshIntervalId = setInterval(() => {
    document.getElementById("counter").innerHTML = timeToGame-- + " seconds";
  }, 1000);
}
function finishGame() {
  gameStarted = false;
  console.log("Finished");
  document.removeEventListener("onkeypress", eventListener);
  clearInterval(refreshIntervalId);

  if (sCount > lCount) {
    document.getElementById("result").innerHTML =
      "Game over, player with key S won with " + sCount + " hits";
    renderConfetti("my-canvasS");
  } else if (lCount > sCount) {
    document.getElementById("result").innerHTML =
      "Game over, player with key L won with " + lCount + " hits";
    renderConfetti("my-canvasL");
  } else if (sCount == lCount) {
    document.getElementById("result").innerHTML =
      "Game over, Match drawn with equal hits";
  }
}

function renderConfetti(canvas) {
  var confettiSettings = { target: canvas, width: 200, height: 200 };
  confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}
