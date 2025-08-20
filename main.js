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
let secondNumber;
let count = 0;
let hasOperator = false;
let hasAResult = false;

let displayNumber = document.querySelector("#display");
let display = "0";
displayNumber.textContent = display;
let shouldResetDisplay = false;


function clear() {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    display = "";
    displayNumber.textContent = display;
    hasAResult = false;
    hasOperator = false;
}

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => clear());

let container = document.querySelector("#container");
let digits = "0123456789";

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
    console.log("on a clique ici: " + textContent);
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
}

function handleOperator(textContent) {
    operator = textContent;
    shouldResetDisplay = true;
    count++;
    if(count === 1) {
        firstNumber = +display;
    }else if(count === 2) {
        handleEqual(false);
    }  
}

function handleEqual(hasPressedEqual) {
    shouldResetDisplay = true;
    count = hasPressedEqual ? 0 : 1;
    secondNumber = +display;
    display = operate(firstNumber, operator, secondNumber);
    firstNumber = +display;
    displayNumber.textContent = display;
}

container.addEventListener("click", (e) => {
    switch(e.target.textContent) {
        case "0":
        case "1":
        case "2":
            handleDigit(e.target.textContent);
            break;
        case "+":
        case "-":
            handleOperator(e.target.textContent);
            break;
        case "=":
            handleEqual(true);
            break;
    }
})



