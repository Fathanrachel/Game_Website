window.onload = function () {
  document.getElementById("audio").play();
};
// Update the bars display
function updateBars() {
  document.getElementById("eat-bar").style.width = eatBar + "%";
  document.getElementById("sleep-bar").style.width = sleepBar + "%";
  document.getElementById("play-bar").style.width = playBar + "%";
  document.getElementById("medicine-bar").style.width = medicineBar + "%";

  let Lose = 0;
  if (eatBar === 0) Lose++;
  if (medicineBar === 0) Lose++;

  if (Lose > 0) {
    alert("You Lose!");
    window.location.href = "/index.html";
  }
}

//VARIABLES
let eatBar = parseInt(sessionStorage.getItem("eatBar"));
let medicineBar = parseInt(sessionStorage.getItem("medicineBar"));
let sleepBar = parseInt(sessionStorage.getItem("sleepBar"));
let playBar = parseInt(sessionStorage.getItem("playBar"));
const nama = localStorage.getItem("nama");
let gambar = localStorage.getItem("gambar");
document.getElementById("nama_pet").innerHTML = nama;
let img = document.getElementById("character");

// Animation for eating and sleeping
const originalImage = "../../img/character3/shime1.png";
const newImage = "../../img/character3/shime21.png";

// Update the game state every second
setInterval(function () {
  // Decrease the medicine bar by 1 every 30 seconds
  if (new Date().getSeconds() % 30 === 0) {
    medicineBar -= 1;
    if (medicineBar < 0) {
      medicineBar = 0;
    }
  }
  updateBars();
}, 1000);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function revertImage() {
  img.src = originalImage;
}

async function changeImage() {
  img.src = newImage;
  await delay(5000);
  sleep();
  revertImage();
}

function sleep() {
  eatBar -= 10;
  if (eatBar < 0) {
    eatBar = 0;
  }
  sleepBar += 10;
  if (sleepBar > 100) {
    sleepBar = 100;
  }
  medicineBar += 5;
  if (medicineBar > 100) {
    medicineBar = 100;
  }
  playBar -= 5;
  if (playBar < 0) {
    playBar = 0;
  }

  // save to session storage
  sessionStorage.setItem("eatBar", eatBar.toString());
  sessionStorage.setItem("sleepBar", sleepBar.toString());
  sessionStorage.setItem("medicineBar", medicineBar.toString());
  sessionStorage.setItem("playBar", playBar.toString());
  updateBars();
}

// FUNCTIONS
updateBars();
