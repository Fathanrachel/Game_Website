// Constants
const INITIAL_BAR_VALUE = 50;
const LOCAL_STORAGE_KEYS = {
  NAME: "nama",
};
const SESSION_STORAGE_KEYS = {
  SLEEP_BAR: "sleepBar",
  EAT_BAR: "eatBar",
  MEDICINE_BAR: "medicineBar",
  PLAY_BAR: "playBar",
};

// Functions for audio controls
window.onload = () => {
  document.getElementById("audio").play();
};

const enableMute = () => document.getElementById("audio").pause();
const disableMute = () => document.getElementById("audio").play();

// Form submission
const submitForm = (petId, redirectUrl) => {
  const inputBox = document.getElementById(petId);
  if (inputBox.value === "") {
    alert("Please enter a name for your pet!");
    return false;
  }

  const name = inputBox.value;
  localStorage.setItem(LOCAL_STORAGE_KEYS.NAME, name);

  sessionStorage.setItem(SESSION_STORAGE_KEYS.SLEEP_BAR, INITIAL_BAR_VALUE.toString());
  sessionStorage.setItem(SESSION_STORAGE_KEYS.EAT_BAR, INITIAL_BAR_VALUE.toString());
  sessionStorage.setItem(SESSION_STORAGE_KEYS.MEDICINE_BAR, INITIAL_BAR_VALUE.toString());
  sessionStorage.setItem(SESSION_STORAGE_KEYS.PLAY_BAR, INITIAL_BAR_VALUE.toString());

  window.location.href = redirectUrl;
};

const submitForm1 = () => submitForm("nama_pet", "./src/characters/Pikachu/game.html");
const submitForm2 = () => submitForm("nama_pet2", "./src/characters/Eevee/game.html");
const submitForm3 = () => submitForm("nama_pet3", "./src/characters/Squirtle/game.html");
const submitForm4 = () => submitForm("nama_pet4", "./src/characters/Snivy/game.html");

// Navigation menu
const openNav = () => {
  document.getElementById("myNav").style.width = "100%";
};

const closeNav = () => {
  document.getElementById("myNav").style.width = "0%";
};

// Slide Show
let mainSlide = 1;
const slideShow = (s) => {
  const slides = document.getElementsByClassName("slide_img");
  if (s > slides.length) mainSlide = 1;
  if (s < 1) mainSlide = slides.length;

  Array.from(slides).forEach((slide) => (slide.style.display = "none"));
  slides[mainSlide - 1].style.display = "block";
};

const plusSlides = (n) => slideShow((mainSlide += n));
const currentSlide = (n) => slideShow((mainSlide = n));

slideShow(mainSlide);
