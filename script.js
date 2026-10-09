document.addEventListener("DOMContentLoaded", () => {
const winningColors = [
    "yellow",
    "green",
    "red",
    "orange",
    "purple",
    "white",
    "blue"
];

const winningPlanets = [
    "♄", // Saturn
    "♃", // Jupiter
    "♂", // Mars
    "☉", // Sun
    "♀", // Venus
    "☿", // Mercury
    "☽"  // Moon
];

const youtubeUrl = "https://youtube.com/shorts/YtYWtLNGZJU?si=eYU015c05NrPNe-_";

let videoLaunched = false;
    const container = document.querySelector(".circle-container");

    if (!container) {
        console.error("circle-container not found");
        return;
    }

   const colors = [
    "white",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "purple"
];

const centerX = 250;
const centerY = 250;

// ----------------------
// INNER COLOR DOTS
// ----------------------
const innerRadius = 150;

for (let i = 0; i < 7; i++) {

    const angle = (i * 360 / 7 - 90) * Math.PI / 180;

    const x = centerX + innerRadius * Math.cos(angle);
    const y = centerY + innerRadius * Math.sin(angle);

    const dot = document.createElement("div");
    dot.className = "dot";

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    dot.dataset.colorIndex = 0;
    dot.dataset.color = colors[0];
    dot.style.backgroundColor = colors[0]

    dot.addEventListener("click", function() {
      let index = Number(this.dataset.colorIndex);
  
      index = (index + 1) % colors.length;
  
      this.dataset.colorIndex = index;
      this.dataset.color = colors[index];
      this.style.backgroundColor = colors[index];

      checkWinningCombination();
    });

    container.appendChild(dot);
}

// ----------------------
// OUTER NUMBER RING
// ----------------------
const outerRadius = 220;
const planetSymbols = [
    "☉", // Sun
    "☽", // Moon
    "☿", // Mercury
    "♀", // Venus
    "♂", // Mars
    "♃", // Jupiter
    "♄"  // Saturn
];

for (let i = 0; i < 7; i++) {

    const angle = (i * 360 / 7 - 90) * Math.PI / 180;

    const x = centerX + outerRadius * Math.cos(angle);
    const y = centerY + outerRadius * Math.sin(angle);

    const num = document.createElement("div");
    num.className = "number";

    num.style.left = `${x}px`;
    num.style.top = `${y}px`;

    num.textContent = planetSymbols[0];
    num.dataset.planetIndex = 0;
    num.dataset.planet = planetSymbols[0];
    num.dataset.value = 0;

    num.addEventListener("click", function() {
    let index = Number(this.dataset.planetIndex);

    index = (index + 1) % planetSymbols.length;

    this.dataset.planetIndex = index;
    this.dataset.planet = planetSymbols[index];
    this.textContent = planetSymbols[index];

    checkWinningCombination();
    });

    container.appendChild(num);
}
  //-------
  //WINNING FUNCTION
  //------

  function checkWinningCombination() {
    const currentColors = Array.from(
        document.querySelectorAll(".dot")
    ).map(dot => dot.dataset.color);

    const currentPlanets = Array.from(
        document.querySelectorAll(".number")
    ).map(node => node.dataset.planet);

    const colorsMatch = winningColors.every(
        (color, index) => currentColors[index] === color
    );

    const planetsMatch = winningPlanets.every(
        (planet, index) => currentPlanets[index] === planet
    );

    if (colorsMatch && planetsMatch && !videoLaunched) {
        videoLaunched = true;

        window.open(
            youtubeUrl,
            "_blank",
            "noopener,noreferrer"
        );
    }

    // Allow the puzzle to trigger again if the combination is changed.
    if (!colorsMatch || !planetsMatch) {
        videoLaunched = false;
    }
}

  });