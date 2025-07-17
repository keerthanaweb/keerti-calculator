const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("historyList");
const themeToggle = document.getElementById("themeToggle");

let currentInput = "";
let history = [];

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 5) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      currentInput = "";
    } else if (value === "←") {
      currentInput = currentInput.slice(0, -1);
    } else if (value === "=") {
      try {
        const result = eval(currentInput);
        addToHistory(`${currentInput} = ${result}`);
        currentInput = result.toString();
      } catch (err) {
        currentInput = "Error";
      }
    } else {
      currentInput += value;
    }

    updateDisplay();
  });
});

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initialize display
updateDisplay();
