// script.js

window.onload = function () {
  document.getElementById("audio").play();
};

// VARIABLES
const nama = localStorage.getItem("nama");
const gambar = localStorage.getItem("gambar");
document.getElementById("nama_pet").innerHTML = nama;

// Function for opening and closing menu
document.getElementById("myNav").style.height = "0%";
// document.getElementById("character").src = gambar;
const startTime = new Date();
startTime.setHours(startTime.getHours() + 7);

// Set the time speed of the game to 60:1
const timeSpeed = 60;
let eatBar = parseInt(sessionStorage.getItem("eatBar")) || 50;
let medicineBar = parseInt(sessionStorage.getItem("medicineBar")) || 50;
let sleepBar = parseInt(sessionStorage.getItem("sleepBar")) || 50;
let playBar = parseInt(sessionStorage.getItem("playBar")) || 50;

document.addEventListener("DOMContentLoaded", updateAfterMinigame);

if (new URLSearchParams(window.location.search).get("minigameDone") === "true") {
  updateAfterMinigame();
}

// DOM ELEMENTS
document.getElementById("medicine-btn").addEventListener("click", function () {
  medicineBar = Math.min(medicineBar + 10, 100);
  sessionStorage.setItem("medicineBar", medicineBar.toString());
  updateBars();
});

document.getElementById("eat-btn").addEventListener("click", function () {
  eatBar = Math.min(eatBar + 10, 100);
  medicineBar = Math.min(medicineBar + 5, 100);
  sessionStorage.setItem("eatBar", eatBar.toString());
  sessionStorage.setItem("medicineBar", medicineBar.toString());
  updateBars();
});

document.getElementById("sleep-btn").addEventListener("click", function () {
  sleepBar = Math.min(sleepBar + 10, 100);
  medicineBar = Math.min(medicineBar + 5, 100);
  sessionStorage.setItem("sleepBar", sleepBar.toString());
  sessionStorage.setItem("medicineBar", medicineBar.toString());
  updateBars();
});

document.getElementById("play-btn").addEventListener("click", function () {
  playBar = Math.min(playBar + 10, 100);
  medicineBar = Math.max(medicineBar - 5, 0);
  updateBars();
});

// FUNCTIONS
updateBars();

setInterval(function () {
  if (new Date().getSeconds() % 30 === 0) {
    medicineBar = Math.max(medicineBar - 1, 0);
  }
  updateBars();
}, 1000);

function enableMute() {
  document.getElementById("audio").pause();
}

function disableMute() {
  document.getElementById("audio").play();
}

function openNav() {
  document.getElementById("myNav").style.height = "100%";
  document.getElementById("button-menu").style.display = "flex";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
  document.getElementById("button-menu").style.display = "none";
}

function resetBar() {
  eatBar = 50;
  playBar = 50;
  sleepBar = 50;
  medicineBar = 50;

  sessionStorage.setItem("sleepBar", sleepBar.toString());
  sessionStorage.setItem("eatBar", eatBar.toString());
  sessionStorage.setItem("medicineBar", medicineBar.toString());
  sessionStorage.setItem("playBar", playBar.toString());
  updateBars();
}

function updateAfterMinigame() {
  let params = new URLSearchParams(window.location.search);
  if (params.get("minigameDone") === "true" && sessionStorage.getItem("playBarUpdated") !== "true") {
    playBar = Math.min(playBar + 10, 100);
    eatBar = Math.max(eatBar - 5, 0);
    medicineBar = Math.max(medicineBar - 5, 0);
    sessionStorage.setItem("playBar", playBar.toString());
    sessionStorage.setItem("eatBar", eatBar.toString());
    sessionStorage.setItem("medicineBar", medicineBar.toString());
    sessionStorage.setItem("playBarUpdated", "true");
    updateBars();
  }
}

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

function backToMenu() {
  window.location.href = "/index.html";
}

// Update the clock every second
setInterval(updateClock, 1000);
