// clock.js

let hours = 12;
let minutes = 0;
let level = 1;

function updateClock() {
  // Add one minute
  minutes++;

  // Check if we need to update the hours
  if (minutes === 60) {
    minutes = 0;
    hours++;

    // Check if we need to level up
    if (hours === 24) {
      hours = 0;
      minutes = 0;

      if (level < 10) {
        level++;
      } else {
        // Show a congratulatory message if we have reached level 10
        alert("Congratulations! You have reached the highest level!");
      }

      // Save the new level to localStorage
      localStorage.setItem("level", level.toString());
    }
  }

  const img = document.getElementById("image");
  const images = ["../../img/main_bg/morning.jpg", "../../img/main_bg/afternoon.jpg", "../../img/main_bg/night.jpg"];

  if (hours >= 18 || hours < 6) {
    img.src = images[2]; // Set image to night.jpg
  } else if (hours >= 6 && hours < 14) {
    img.src = images[0]; // Set image to morning.jpg
  } else if (hours >= 14 && hours < 18) {
    img.src = images[1]; // Set image to afternoon.jpg
  }

  // Format the time as a string
  const timeString = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");

  // Save the time to localStorage
  localStorage.setItem("time", timeString);

  // Update the clock and level elements
  document.getElementById("clock").textContent = timeString;
  document.getElementById("level").textContent = "Level: " + level.toString();

  // Update the greeting element based on the time
  const nama = localStorage.getItem("nama");
  let greeting;
  if (hours < 12) {
    greeting = "Good morning " + nama + "!";
  } else if (hours < 18) {
    greeting = "Good afternoon " + nama + "!";
  } else {
    greeting = "Good evening " + nama + "!";
  }
  document.getElementById("greeting").textContent = greeting;
}
