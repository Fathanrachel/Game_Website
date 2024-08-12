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
    window.location.href = "../../index.html";
  }
}

eatBar = parseInt(sessionStorage.getItem("eatBar"));
medicineBar = parseInt(sessionStorage.getItem("medicineBar"));
sleepBar = parseInt(sessionStorage.getItem("sleepBar"));
playBar = parseInt(sessionStorage.getItem("playBar"));

//VARIABLES
let nama = localStorage.getItem("nama");
let gambar = localStorage.getItem("gambar");
document.getElementById("nama_pet").innerHTML = nama;
let img = document.getElementById("character");
// document.getElementById("character").src = gambar;

// Animation for eating and sleeping
let originalImage = "../../img/character3/shime1.png";
let newImage = "../../img/character3/shime35.png";

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

async function changeImage() {
  img.src = newImage;
  await delay(3000);
  eat();
  revertImage();
}

// add bar eat 10 and helath 5
function eat() {
  eatBar += 10;
  if (eatBar > 100) {
    eatBar = 100;
  }
  medicineBar += 5;
  if (medicineBar > 100) {
    medicineBar = 100;
  }
  // save to session storage
  sessionStorage.setItem("eatBar", eatBar);
  sessionStorage.setItem("medicineBar", medicineBar);
  updateBars();
}

function revertImage() {
  img.src = originalImage;
}

// FUNCTIONS
updateBars();
