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
        alert("Nope, can’t divide by 0!");
        clear();
        return;
    }
    display = formatDisplay(operate(firstNumber, operator, secondNumber));
    hasPressedDigit = true;
    firstNumber = display;
    displayNumber.textContent = display;
}


container.addEventListener("click", (e) => {
    const textContent = e.target.textContent;
    if (digits.includes(textContent)) {
        handleDigit(textContent);
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



