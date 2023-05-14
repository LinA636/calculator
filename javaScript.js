let numArray = [];
let operatorArray = [];
let lastClick = null;
let result = null;

function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return b === 0 ? 'ERROR' : a / b;
}

function operate(selectedOperator, number1, number2) {
    if (selectedOperator === "+") {
        return addition(number1, number2);
    } else if (selectedOperator === "*") {
        return multiplication(number1, number2);
    } else if (selectedOperator === "-") {
        return subtraction(number1, number2);
    } else if (selectedOperator === ":") {
        return division(number1, number2);
    }
}
/* ideas

need some kind of counter to get track of
how many numbers have been calc without delting tehm,
so the ycan still be shown in dsplay-calc.*/

function actualiseDisplayCalc() {
    const displayCalc = document.querySelector(".display-calc");
    if (operatorArray.length === 0) {
        displayCalc.innerHTML = numArray[0];
    } else {
        let text = "";
        const numArrayLength = numArray.length;
        for (let i = 0; i < numArrayLength; i++) {
            if (operatorArray[i] === undefined) {
                text += numArray[i];
            } else {
                text += numArray[i] + " " + operatorArray[i] + " ";
            }
        }
        displayCalc.innerHTML = text;
    }
}

function actualiseDisplayResult() {
    const displayResult = document.querySelector(".display-result");
    displayResult.innerHTML = result;
}

function clearDisplays() {
    const displayCalc = document.querySelector(".display-calc");
    displayCalc.innerHTML = 0;
    const displayResult = document.querySelector(".display-result");
    displayResult.innerHTML = 0;
}

function setLastClick(value) {
    lastClick = value;
}

function getLastClick() {
    return lastClick;
}

function setResult(value) {
    result = value;
}

function getResult() {
    return result;
}

function createOneNumber(number) {
    return numArray[numArray.length - 1] * 10 + number;
}

function handleNumberClick(number) {
    if (getResult() === "ERROR") {
        handleClearClick();
        handleNumberClick(number);
    } else {
        if (numArray.length === 0) {
            numArray[0] = number;
        } else if (getLastClick() === "number") {
            numArray[numArray.length - 1] = createOneNumber(number);
        } else if (getLastClick() != "number") {
            numArray.push(number);
        }
        setLastClick("number");
        actualiseDisplayCalc();
    }
}

function handleDecimalPointClick() {

}

function handleOperatorClick(selctedOperator) {
    if (getResult() === "ERROR") {
        handleClearClick();
    } else {
        if (numArray.length === 0) {
            // do nothing
        } else if (numArray.length === 1) {
            operatorArray.push(selctedOperator);
            actualiseDisplayCalc();
            setLastClick("operator");
        } else {
            if (getLastClick() === "operator") {
                operatorArray[operatorArray.length - 1] = selctedOperator;
            } else if (getLastClick() === "equal") {
                operatorArray.push(selctedOperator);
            } else {
                if (numArray.length === 2) {
                    setResult(operate(operatorArray[0], numArray[0], numArray[1]));
                } else {
                    setResult(operate(operatorArray[operatorArray.length - 1], getResult(), numArray[numArray.length - 1]));
                }
                operatorArray.push(selctedOperator);
                actualiseDisplayResult();
            }
            actualiseDisplayCalc();
            setLastClick("operator");
        }
    }
}

function handleClearClick() {
    numArray = [];
    operatorArray = [];
    setResult(null);
    setLastClick(null);
    clearDisplays();
}

function handleShowResultClick() {
    if (getResult() === "ERROR") {
        handleClearClick();
    } else {
        if (getLastClick() === "number") {
            if (numArray.length === 2) {
                setResult(operate(operatorArray[0], numArray[0], numArray[1]));
            } else if (numArray.length > 2) {
                setResult(operate(operatorArray[operatorArray.length - 1], result, numArray[numArray.length - 1]));
            }
            actualiseDisplayResult();
            setLastClick("equal");
        }
    }
}