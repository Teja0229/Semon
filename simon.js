let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "orange", "blue", "purple"];

let started=false;
let playing=false;   // true while the game is showing the sequence
let level=0;

let h2 = document.querySelector("h2");
let hs = document.querySelector("#highscore");

// ---------- NEW: high score (saved in the browser) ----------
let highScore = 0;
try { highScore = Number(localStorage.getItem("simonHigh")) || 0; } catch (e) {}
hs.innerText = `High score: ${highScore}`;

// ---------- NEW: sounds ----------
let audioCtx;
const freqs = { yellow: 330, orange: 262, blue: 392, purple: 523, wrong: 110 };
function playTone(name) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    let o = audioCtx.createOscillator();
    let g = audioCtx.createGain();
    o.type = name === "wrong" ? "sawtooth" : "sine";
    o.frequency.value = freqs[name];
    g.gain.value = 0.15;
    o.connect(g);
    g.connect(audioCtx.destination);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    o.start();
    o.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}

function startGame() {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
}

document.addEventListener("keypress", function(e) {
  if (started == false) {
    startGame();
  } else if ("1234".includes(e.key) && !playing) {
    // NEW: keys 1-4 press the matching buttons
    document.getElementById(["orange", "blue", "yellow", "purple"][e.key - 1]).click();
  }
});

// NEW: tap the heading to start (for phones)
h2.addEventListener("click", startGame);


function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 250);
}

// NEW: replay the WHOLE sequence each level (classic Simon)
function playSequence() {
  playing = true;
  gameSeq.forEach(function(color, i) {
    setTimeout(function() {
      gameFlash(document.querySelector(`.${color}`));
      playTone(color);
      if (i === gameSeq.length - 1) playing = false;
    }, 600 * (i + 1));
  });
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);
  console.log(gameSeq);
  playSequence();
} 

function checkAns(idx){
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length){
      setTimeout(levelUp, 1000);
    }
  }else {
    playTone("wrong");
    // NEW: update high score
    if (level > highScore) {
      highScore = level;
      try { localStorage.setItem("simonHigh", highScore); } catch (e) {}
      hs.innerText = `High score: ${highScore} 🎉`;
    }
    h2.innerHTML = `Game Over! your score was <b>${level}</b> <br> Press any key (or tap here) to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "";
    }, 150);
    reset();
  }
}  
  

function btnPress(){
  if (!started || playing) return;   // NEW: ignore clicks while sequence is playing

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  playTone(userColor);
  userSeq.push(userColor);  

  checkAns(userSeq.length - 1);
}


let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset(){
  started = false;
  playing = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

}
