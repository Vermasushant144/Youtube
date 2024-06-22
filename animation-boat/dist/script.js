window.addEventListener("load", () => {
  // Create raindrops
  const rainContainer = document.querySelector(".rain");
  for (let i = 0; i < 100; i++) {
    setTimeout(function() {
      let rainDrop = document.createElement("div");
      rainDrop.classList.add("raindrop");
      rainDrop.style.left = Math.random() * window.innerWidth + "px";
      rainContainer.appendChild(rainDrop);
      setTimeout(function() {
        rainDrop.remove();
      }, 3000);
    }, i * 100);
  }
});
window.addEventListener("load", () => {
  // Create raindrops initially
  createRain();

  // After 2 seconds, change the weather
  setTimeout(() => {
    toggleWeather();
  }, 2000);
});

function createRain() {
  const rainContainer = document.querySelector(".rain");
  for (let i = 0; i < 100; i++) {
    setTimeout(function() {
      let rainDrop = document.createElement("div");
      rainDrop.classList.add("raindrop");
      rainDrop.style.left = Math.random() * window.innerWidth + "px";
      rainContainer.appendChild(rainDrop);
      setTimeout(function() {
        rainDrop.remove();
      }, 3000);
    }, i * 100);
  }
}

function toggleWeather() {
  const rainContainer = document.querySelector(".rain");
  if (rainContainer.children.length === 0) {
    // If no raindrops, create rain
    createRain();
  } else {
    // If raindrops exist, remove them to clear the weather
    while (rainContainer.firstChild) {
      rainContainer.removeChild(rainContainer.firstChild);
    }
  }
}
window.addEventListener("load", () => {
  // Initially set the background to clear sky
  document.body.style.background = "linear-gradient(to bottom, #87CEFA 0%, #B0E0E6 100%)";

  // Create raindrops initially
  createRain();

  // After 2 seconds, change the weather
  setTimeout(() => {
    toggleWeather();
  }, 4000);
});

function createRain() {
  const rainContainer = document.querySelector(".rain");
  for (let i = 0; i < 100; i++) {
    setTimeout(function() {
      let rainDrop = document.createElement("div");
      rainDrop.classList.add("raindrop");
      rainDrop.style.left = Math.random() * window.innerWidth + "px";
      rainContainer.appendChild(rainDrop);
      setTimeout(function() {
        rainDrop.remove();
      }, 3000);
    }, i * 100);
  }
}

function toggleWeather() {
  const rainContainer = document.querySelector(".rain");
  if (rainContainer.children.length === 0) {
    // If no raindrops, clear weather
    document.body.style.background = "linear-gradient(to bottom, #87CEFA 0%, #B0E0E6 100%)";
  } else {
    // If raindrops exist, change background to simulate rain
    document.body.style.background = "linear-gradient(to bottom, #6c7a89 0%, #95a5a6 100%)";
    // Create raindrops
    createRain();
  }
}