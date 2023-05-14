let numArray = [];
let operatorArray = [];
let lastClick = "";

function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function subtraction(a, b) {
    return b === 0 ? 'ERROR' : a / b;
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
            text += numArray[i] + " " + operatorArray[i];
        }
    }
}

function setLastClick(value) {
    lastClick = value;
}

function getLastClick() {
    return lastClick;
}

function createOneNumber(number) {
    return numArray[numArray.length - 1] * 10 + number;
}

function handleNumberClick(number) {
    // one of the number buttons or the decimal-button was clicked.
    /* TODOS
        if first click (no number value exists yet) 
            save and display (display calc) number
        else if last click was a number as well
            make one number out of both
        else if last click was another click
            if last operator was devision
                 if current number is 0 => catch if subtraction returns'ERROR' instead of number
                    display (display-result) ERROR and clear all values
            else
                save number in new value and actualise display-calc
                 */

    if (numArray.length === 0) {
        numArray[0] = number;
        actualiseDisplayCalc();
        setLastClick("number");
    } else if (getLastClick() === "number") {
        numArray[numArray.length - 1] = createOneNumber(number);
        actualiseDisplayCalc();
    } else if (getLastClick() != "number") {
        numArray.push(number);
        console.log(numArray);
        actualiseDisplayCalc();
        setLastClick("number");
    }


}

function handleOperatorClick(operator) {
    // a calc-button has been clicked
    /* TODOS
        if no num-value exists
            do nothing
        else if one num-value exists
            if last click was calc-click
                change last saved operator-value and actualise display-calc
            else
                save operator and actualise display-calc
        else if two num-values exist
                handle as if showResult-button was clicked with addition of operator-click
            save new operator
            get result of the last two numbers calc with the last safed operator
            display result
            acualise display-calc
            delete not needed num-values and operators.

    */
   setLastClick("operator");
}

function handleClearClick() {
    // clear-button was clicked
    /* TODOS
        delete all safed nu-values and operator
        clear display
        */
}

function handleShowResultClick() {
    // equal-button was cicked
    /* TODOS
        if no num-value exists
            do nothing
        else if one num-value exists
            do nothing
        else if one num-value and one operator exists
            do nothing
        else if two num-values exits and one operator
            get result of calc
            safe result and actualise display
            */
}