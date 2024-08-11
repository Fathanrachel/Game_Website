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
let originalImage = "../../img/character1/shime1.png";
let newImage = "../../img/character1/shime32.png";

let originalImage2 = "../img/character1/shime1.png";
let newImage2 = "../img/character1/shime21.png";
let originalImage3 = "../img/character2/shime1.png";
let newImage3 = "../img/character2/shime45.png";
let originalImage4 = "../img/character2/shime1.png";
let newImage4 = "../img/character2/shime21.png";
let originalImage5 = "../img/character3/shime1.png";
let newImage5 = "../img/character3/shime35.png";
let originalImage6 = "../img/character3/shime1.png";
let newImage6 = "../img/character3/shime21.png";
let originalImage7 = "../img/character4/shime1.png";
let newImage7 = "../img/character4/shime11e.png";
let originalImage8 = "../img/character4/shime1.png";
let newImage8 = "../img/character4/shime11c.png";

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

function changeImage2() {
  img.src = newImage2;
  setTimeout(revertImage, 5000);
}

function revertImage2() {
  img.src = originalImage2;
}

function changeImage3() {
  img.src = newImage3;
  setTimeout(revertImage3, 3000);
}

function revertImage3() {
  img.src = originalImage3;
}

function changeImage4() {
  img.src = newImage4;
  setTimeout(revertImage4, 5000);
}

function revertImage4() {
  img.src = originalImage4;
}

function changeImage5() {
  img.src = newImage5;
  setTimeout(revertImage5, 3000);
}

function revertImage5() {
  img.src = originalImage5;
}

function changeImage6() {
  img.src = newImage6;
  setTimeout(revertImage6, 5000);
}

function revertImage6() {
  img.src = originalImage6;
}

function changeImage7() {
  img.src = newImage7;
  setTimeout(revertImage7, 3000);
}

function revertImage7() {
  img.src = originalImage7;
}

function changeImage8() {
  img.src = newImage8;
  setTimeout(revertImage8, 5000);
}

function revertImage8() {
  img.src = originalImage8;
}

// FUNCTIONS
updateBars();
