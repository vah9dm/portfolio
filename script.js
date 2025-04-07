// Dark Mode Toggle

// Create a button dynamically
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "Toggle Dark Mode";
darkModeBtn.style.margin = "10px";
darkModeBtn.style.padding = "8px 16px";
darkModeBtn.style.cursor = "pointer";

// Append the button to the header
document.querySelector("header").appendChild(darkModeBtn);

// Toggle dark mode on click
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Console test
console.log("Script loaded! Your portfolio is interactive.");
