document.addEventListener("DOMContentLoaded", () => {
  let player = document.getElementById("character");
  let gameStar = document.getElementById("star");
  let starCollected = false;
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Set canvas dimensions to match the #game element
  function resizeCanvas() {
    canvas.width = document.getElementById("game").offsetWidth;
    canvas.height = document.getElementById("game").offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Random position star
  function moveGameStar() {
    let gameRect = document.getElementById("game").getBoundingClientRect();
    let maxX = gameRect.width - gameStar.offsetWidth;
    let maxY = gameRect.height - gameStar.offsetHeight;
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    gameStar.style.left = x + "px";
    gameStar.style.top = y + "px";
    drawLine();
  }

  // Draw a line connecting the character and the star
  function drawLine() {
    let playerRect = player.getBoundingClientRect();
    let starRect = gameStar.getBoundingClientRect();
    let playerX = playerRect.left + playerRect.width / 2;
    let playerY = playerRect.top + playerRect.height / 2;
    let starX = starRect.left + starRect.width / 2;
    let starY = starRect.top + starRect.height / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(starX, starY);
  }

  // Check if star has been caught
  function checkGetStar() {
    let playerRect = player.getBoundingClientRect();
    let starRect = gameStar.getBoundingClientRect();
    if (
      playerRect.left < starRect.right &&
      playerRect.right > starRect.left &&
      playerRect.top < starRect.bottom &&
      playerRect.bottom > starRect.top
    ) {
      starCollected = true;
      alert("You collected the star!!");
      // back to main game
      let playBar = parseInt(sessionStorage.getItem("playBar"));
      let medicineBar = parseInt(sessionStorage.getItem("medicineBar"));

      playBar += 10;
      if (playBar > 100) {
        playBar = 100;
      }
      medicineBar -= 5; // Decrease medicine bar when play bar increases
      if (medicineBar < 0) {
        medicineBar = 0;
      }

      sessionStorage.setItem("playBar", playBar.toString());
      sessionStorage.setItem("medicineBar", medicineBar.toString());

      window.location.href = "./game.html";
    }
  }

  // Move the character in response to button clicks
  document.getElementById("left").addEventListener("click", function () {
    if (starCollected) return; // Check if star has been collected
    let left = parseInt(player.style.left);
    player.style.left = Math.max(left - 25, 0) + "px";
    checkGetStar();
  });

  document.getElementById("down").addEventListener("click", function () {
    if (starCollected) return; // Check if star has been collected
    let top = parseInt(player.style.top);
    player.style.top = Math.min(top + 25, canvas.height - player.offsetHeight) + "px";
    checkGetStar();
  });

  document.getElementById("right").addEventListener("click", function () {
    if (starCollected) return; // Check if star has been collected
    let left = parseInt(player.style.left);
    player.style.left = Math.min(left + 25, canvas.width - player.offsetWidth) + "px";
    checkGetStar();
  });

  document.getElementById("up").addEventListener("click", function () {
    if (starCollected) return; // Check if star has been collected
    let top = parseInt(player.style.top);
    player.style.top = Math.max(top - 25, 0) + "px";
    checkGetStar();
  });

  moveGameStar();

  // Makes character face right when pressed right
  window.changeImageright = function () {
    document.getElementById("character").src = "../../img/character1/shime1right.png";
    return false;
  };

  // Makes character face left when pressed left
  window.changeImageleft = function () {
    document.getElementById("character").src = "../../img/character1/shime1.png";
    return false;
  };

  window.disableMute = function () {
    document.getElementById("audio").play();
  };
});
