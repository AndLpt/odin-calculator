// main.js

// Basic math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Calculator state object
const calculator = {
    firstNumber: null,
    operator: null,
    shouldResetDisplay: false,
};

// DOM references
const displayNumber = document.querySelector("#display");
const decimal = document.querySelector("#decimal");
const undo = document.querySelector("#undo");
const clearButton = document.querySelector("#clear");
const container = document.querySelector("#container");
const digits = "0123456789";

// Update the display
function updateDisplay() {
    displayNumber.textContent = display;
}

// Clear calculator
function clear() {
    display = "0";
    calculator.firstNumber = null;
    calculator.operator = null;
    calculator.shouldResetDisplay = false;
    decimal.disabled = false;
    updateDisplay();
}

// Round / format display numbers
function formatDisplay(num) {
    return Number.isInteger(num) ? num : parseFloat(num.toFixed(3));
}

// Perform calculation based on operator
function operate(a, operator, b) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return b; // fallback
    }
}

// Digit input handler
function handleDigit(digit) {
    if (calculator.shouldResetDisplay || display === "0") {
        display = digit;
        calculator.shouldResetDisplay = false;
    } else {
        display += digit;
    }
    updateDisplay();
}

// Decimal input handler
function handleDecimal() {
    if (!display.includes(".")) {
        display += ".";
        updateDisplay();
    }
}

// Operator input handler
function handleOperator(op) {
    const currentNumber = +display;

    if (calculator.firstNumber === null) {
        // First time operator pressed
        calculator.firstNumber = currentNumber;
    } else if (!calculator.shouldResetDisplay) {
        // Chain calculations
        calculator.firstNumber = operate(calculator.firstNumber, calculator.operator, currentNumber);
        display = formatDisplay(calculator.firstNumber);
        updateDisplay();
    }

    calculator.operator = op;
    calculator.shouldResetDisplay = true;
}

// Equal handler
function handleEqual() {
    if (calculator.operator === null) return;

    const secondNumber = +display;

    // Prevent division by zero
    if (calculator.operator === "/" && secondNumber === 0) {
        alert("Cannot divide by 0!");
        clear();
        return;
    }

    const result = operate(calculator.firstNumber, calculator.operator, secondNumber);
    display = formatDisplay(result);
    updateDisplay();

    // Prepare for next calculation
    calculator.firstNumber = result;
    calculator.shouldResetDisplay = true;
    calculator.operator = null;
}

// Undo handler
function handleUndo() {
    display = display.slice(0, -1) || "0";
    updateDisplay();
}

// Initial display value
let display = "0";

// Event listeners
clearButton.addEventListener("click", clear);
decimal.addEventListener("click", handleDecimal);
undo.addEventListener("click", handleUndo);

// Keyboard input
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (digits.includes(key)) handleDigit(key);
    else if (key === ".") handleDecimal();
    else if (key === "Enter" || key === "=") handleEqual();
    else if (key === "Backspace" || key === "Delete") handleUndo();
    else if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
});

// Mouse click input
container.addEventListener("click", (e) => {
    const text = e.target.textContent;
    if (digits.includes(text)) handleDigit(text);
    else if (text === ".") handleDecimal();
    else if (text === "=") handleEqual();
    else if (["+", "-", "*", "/"].includes(text)) handleOperator(text);
});
