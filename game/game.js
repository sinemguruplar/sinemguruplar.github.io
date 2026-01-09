const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const arena = document.getElementById("arena");
const spark = document.getElementById("spark");

let score = 0;
let timeLeft = 15;
let running = false;
let timerId = null;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function moveSpark() {
  const rect = arena.getBoundingClientRect();
  const x = rand(30, rect.width - 30);
  const y = rand(30, rect.height - 30);
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
}

function setUI() {
  scoreEl.textContent = String(score);
  timeEl.textContent = String(timeLeft);
  startBtn.textContent = running ? "Running…" : "Start";
  startBtn.disabled = running;
}

function startGame() {
  if (running) return;
  running = true;
  score = 0;
  timeLeft = 15;
  setUI();
  moveSpark();

  timerId = setInterval(() => {
    timeLeft -= 1;
    setUI();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      running = false;
      setUI();
      alert(`Time! Your score: ${score}`);
    }
  }, 1000);
}

spark.addEventListener("click", () => {
  if (!running) return;
  score += 1;
  setUI();
  moveSpark();
});

startBtn.addEventListener("click", startGame);

moveSpark();
setUI();
