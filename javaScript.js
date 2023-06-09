let numArray = []; // saves numbers as string
let operatorArray = [];
let lastClick = null;
let result = null;
let lastClickArray = []

function setNumArray(value){
    numArray.push(value);
}

function getNumArray(index){
    return numArray[index];
}

function actualiseNumArray(value){
    numArray[numArray.length - 1] = mergeNumbers(value);
}

function getNumArrayLength(){
    return numArray.length;
}

function setLastClick(value) {
    lastClickArray.push(value);
}

function getLastClick() {
    return lastClickArray[lastClickArray.length - 1];
}

function removeLastClick() {
    return lastClickArray.pop();
}

function removeLastNumberPart() {
    if (numArray.length === 1) {
        let lastNumber = numArray.pop();
        let lastNumberLength = lastNumber.length;
        if (lastNumberLength === 1) {
            handleClearClick();
        } else {
            numArray.push(lastNumber.slice(0, -1));
        }
    } else {
        let lastNumber = numArray.pop();
        let lastNumberLength = lastNumber.length;
        if (lastNumberLength === 1) {
            // do nothing
        } else {
            numArray.push(lastNumber.slice(0, -1));
        }
    }
}

function setResult(value) {
    if (value === "ERROR") {
        result = value;
    } else {
        if ((value - Math.floor(value)) !== 0) {
            // number has a decimal
            result = Math.round(value * 100) / 100;
        } else {
            result = value;
        }
    }
}

function getResult() {
    return result;
}

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

function roundNumber(number) {
    return number.toFixed(2);
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

function actualiseDisplayCalc() {
    const displayCalc = document.querySelector(".display-calc");
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

function mergeNumbers(number) {
    return numArray[numArray.length - 1] + number.toString();
}

function handleNumberClick(number) {
    if (getResult() === "ERROR") {
        handleClearClick();
        handleNumberClick(number);
    } else {
        if (getNumArrayLength() === 0) {
            setNumArray(number.toString());
        } else if (getLastClick() === "number") {
            actualiseNumArray(number);
        } else if (getLastClick() === "equal") {
            if (numArray.length === 1) {
                actualiseNumArray(number);
            } else {
                handleClearClick();
                handleNumberClick(number);
            }
        } else {
            setNumArray(number.toString());
        }
        setLastClick("number");
        actualiseDisplayCalc();
    }
}

function checkForDecimalPoint(index) {
    return numArray[index].includes(".");
}

function handleDecimalPointClick() {
    if (getResult() === "ERROR") {
        handleClearClick();
        handleDecimalPointClick();
    } else {
        if (numArray.length === 0) {
            numArray.push("0.");
            setLastClick("number");
            actualiseDisplayCalc();
        } else {
            if (getLastClick() === "number") {
                if (!checkForDecimalPoint(numArray.length - 1)) {
                    numArray[numArray.length - 1] += ".";
                    setLastClick("number");
                    actualiseDisplayCalc();
                }
            } else if (getLastClick() === "equal") {
                handleClearClick();
                handleDecimalPointClick();
            } else {
                numArray.push("0.");
                setLastClick("number");
                actualiseDisplayCalc();
            }
        }
    }
}

function handleOperatorClick(selctedOperator) {
    if (getResult() === "ERROR") {
        handleClearClick();
    } else {
        if (numArray.length === 0) {
            // do nothing
        } else if (numArray.length === 1) {
            if (getLastClick() === "operator") {
                operatorArray[operatorArray.length - 1] = selctedOperator;
            } else {
                operatorArray.push(selctedOperator);
                setLastClick("operator");
            }
            actualiseDisplayCalc();
        } else {
            if (getLastClick() === "operator") {
                operatorArray[operatorArray.length - 1] = selctedOperator;
            } else if (getLastClick() === "equal") {
                operatorArray.push(selctedOperator);
            } else {
                if (numArray.length === 2) {
                    setResult(operate(operatorArray[0], +numArray[0], +numArray[1]));
                } else {
                    setResult(operate(operatorArray[operatorArray.length - 1], getResult(), +numArray[numArray.length - 1]));
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
    lastClickArray = [];
    setResult(null);
    setLastClick(null);
    clearDisplays();
}

function handleShowResultClick() {
    if (getResult() === "ERROR") {
        handleClearClick();
    } else {
        if (getLastClick() === "number") {
            if (numArray.length === 1) {
                setResult(+numArray[0]);
            } else if (numArray.length === 2) {
                setResult(operate(operatorArray[0], +numArray[0], +numArray[1]));
            } else if (numArray.length > 2) {
                setResult(operate(operatorArray[operatorArray.length - 1], result, +numArray[numArray.length - 1]));
            }
            actualiseDisplayResult();
            setLastClick("equal");
        }
    }
}

function handleDeleteClick() {
    if (getLastClick() === []) {
        // do nothing
    } else if (getLastClick() === "number") {
        removeLastNumberPart();
        actualiseDisplayCalc();
        removeLastClick();
    } else if (getLastClick() === "equal") {
        handleClearClick();
    }
}
