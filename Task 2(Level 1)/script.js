/* script.js */
let display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.innerHTML === '0') {
        display.innerHTML = value;
    } else {
        display.innerHTML += value;
    }
}

function clearDisplay() {
    display.innerHTML = '0';
}

function deleteLast() {
    if (display.innerHTML.length > 1) {
        display.innerHTML = display.innerHTML.slice(0, -1);
    } else {
        display.innerHTML = '0';
    }
}

function calculateResult() {
    try {
        display.innerHTML = eval(display.innerHTML);
    } catch (error) {
        display.innerHTML = 'Error';
    }
}
