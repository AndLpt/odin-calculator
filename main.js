function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber
}

let firstNumber = null;
let operator = null;
let secondNumber = null;
let operatorCount = 0;
let hasPressedDigit = false;
let hasClickedOperator = false;
let decimal = document.querySelector("#decimal");
let undo = document.querySelector("#undo");

let displayNumber = document.querySelector("#display");
let display = "0";
displayNumber.textContent = display;
let shouldResetDisplay = false;

let container = document.querySelector("#container");
let digits = "0123456789";

function clear() {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    decimal.disabled = false;
    display = "0";
    operatorCount = 0;
    displayNumber.textContent = display;
}

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => clear());

function formatDisplay(display) {
    if (Number.isInteger(display)) {
        return display;
    }
    return (parseFloat(display.toFixed(3)));
}

function operate(firstNumber, operator, secondNumber){
    switch(operator) {
        case("+"):
            return add(firstNumber, secondNumber);
            break;
        case("-"):
            return subtract(firstNumber, secondNumber);
            break;
        case("*"):
            return multiply(firstNumber, secondNumber);
            break;
        case("/"):
            return divide(firstNumber, secondNumber);
            break;
        default:
            alert("Bad operator!");
    }
}

function handleDigit(textContent) {
    if (shouldResetDisplay) {
        display = "0";
        decimal.disabled = false;
        shouldResetDisplay = false;
    }

    if(display === "0") {
        display = textContent;
    }else {
        display += textContent;
    }
    
    displayNumber.textContent = display;
    hasPressedDigit = true;
    hasClickedOperator = false
}

function handleOperator(textContent) {
    shouldResetDisplay = true;
    if (!hasClickedOperator) {
        operatorCount++;
        if(operatorCount === 1) {
            firstNumber = +display;
        }else if(operatorCount === 2) {
            handleEqual(false);
        } 
        hasClickedOperator = true;
        hasPressedDigit = false;
    }    
    operator = textContent;
    
}

function handleEqual(hasPressedEqual) {
    if (hasPressedEqual) {
        if (operatorCount < 1) {
            alert("Enter all the numbers.");
            clear();
            return;
        }

        if (!hasPressedDigit) {
            alert("Enter all the numbers.");
            clear();
            return;
        }

    }

    shouldResetDisplay = true;
    operatorCount = hasPressedEqual ? 0 : 1;
    secondNumber = +display;
    if(secondNumber === 0) {
        alert("Nope, can't divide by 0!");
        clear();
        return;
    }
    display = formatDisplay(operate(firstNumber, operator, secondNumber));
    hasPressedDigit = true;
    firstNumber = display;
    displayNumber.textContent = display;
}

decimal.addEventListener("click", () => {
    display += ".";
    decimal.disabled = true;
})

undo.addEventListener("click", () => {
    display = display.slice(0, display.length -1);
    displayNumber.textContent = display;
})


document.addEventListener("keydown", (e) => {
    const key = e.key;
    console.log("bouton appuye est " + key);
    if (digits.includes(key)) {
        handleDigit(key);
        return;
    }
    switch(key) {
        case "=":
        case "Enter":
            handleEqual(true);
            break;
        case ".":
            decimal.dispatchEvent(new Event("click"));
            break;
        case "Backspace":
        case "Delete":
            undo.dispatchEvent(new Event("click"));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            handleOperator(key);
            break;
        default:
            console.log("operator not valid");
    }
})

container.addEventListener("click", (e) => {
    const textContent = e.target.textContent;
    if (digits.includes(textContent)) {
        handleDigit(textContent);
        return;
    } else {
        switch (textContent) {
            case "=":
                handleEqual(true);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperator(textContent);
                break;
            default:
                console.log("Unknown input");
        }
    }
})



