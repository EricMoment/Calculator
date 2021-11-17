const add = function(a, b) {
    return a + b
};

const subtract = function(a, b) {
    return a - b
};

const multiply = function(a, b) {   
    return a * b;
};

const divide = function(a, b) {
    if (b == 0) {
        return "Not a number"
    } else {
        return a / b;
    }
};

const operate = function(a, operator, b) {
    a = Number(a);
    b = Number(b);
    let result = 0;
    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "×":
            result = multiply(a,b);
            break;
        case "÷":
            result = divide(a,b);
            break;
    };
    return result;
};
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const point = document.querySelector(".point");
const previousOperand = document.querySelector(".previousOperand");
const currentOperand = document.querySelector(".currentOperand");
const cal = {
    a: '0', //cal.a
    waitingForb: false, //cal.waitingForb
    op: undefined, //cal.op
    b: '', //cal.b
    length: 0,
};
numbers.forEach(number => { // click numbers
    number.addEventListener('click', (e) => {
        if (cal.length >= 8 || currentOperand.textContent === "Not a number" || currentOperand.textContent === "Too big" || currentOperand.textContent === "Too small") {
            return;
        } else {
            if (cal.waitingForb === true) {
                if (currentOperand.textContent === '0') {
                    return;
                } else {
                    cal.b += e.target.innerText;
                    currentOperand.textContent += e.target.innerText;
                    cal.length += 1;
                };
            } else {
                if (currentOperand.textContent === '0') {
                    cal.a = '';
                    currentOperand.textContent = '';
                }
                cal.a += e.target.innerText;
                currentOperand.textContent += e.target.innerText;
                cal.length += 1;
                console.log(cal.length)
            };
        };
    });
});
document.addEventListener('keydown', (e) => { //type numbers
    if (cal.length >= 8 || currentOperand.textContent === "Not a number" || isFinite(e.key) === false || e.key === " " || currentOperand.textContent === "Too big" || currentOperand.textContent === "Too small") {
        return;
    } else {
        if (cal.waitingForb === true) {
            if (currentOperand.textContent === '0') {
                return;
            } else {
                cal.b += e.key;
                currentOperand.textContent += e.key;
                cal.length += 1;
            };
        } else {
            if (currentOperand.textContent === '0') {
                cal.a = '';
                currentOperand.textContent = '';
            }
            cal.a += e.key;
            currentOperand.textContent += e.key;
            cal.length += 1;
            console.log(cal.length)
        };
    };
});

operators.forEach(operator => operator.addEventListener('click', asms));
document.addEventListener('keydown', asms);
function asms(e) {
    let KEY = e.key;
    let press = e.target.innerText;
    if (e.key !== "+" && e.key !== "-" && e.key !== "*" && e.key !== "/" && !e.key === false) {
        return;
    } else if (KEY === '*') {
        KEY = "×";
    } else if (KEY === "/") {
        KEY = "÷"
    }
    if (cal.b !== '') { //perform "=", then operators
        if (operate(cal.a, cal.op, cal.b) >= 100000000000) {
            currentOperand.textContent = "Too big"; //no more than 11 digits
            previousOperand.textContent = '';
            return;
        } else if (operate(cal.a, cal.op, cal.b) <= -100000000000) {
            currentOperand.textContent = "Too small"; //no more than 11 digits
            previousOperand.textContent = '';
            return;
        } else if (operate(cal.a, cal.op, cal.b) === "Not a number") {
            currentOperand.textContent = "Not a number";
            previousOperand.textContent = '';
            return;
        } else if (operate(cal.a, cal.op, cal.b).toString().length >= 13) {
            if (!KEY === false) {
            previousOperand.textContent = (Math.round(operate(cal.a, cal.op, cal.b) * 100) / 100) + ' ' + KEY;
            } else if (!press === false) {
            previousOperand.textContent = (Math.round(operate(cal.a, cal.op, cal.b) * 100) / 100) + ' ' + e.target.innerText;
            }
            cal.a = (Math.round(operate(cal.a, cal.op, cal.b) * 100) / 100).toString();
        } else if (!KEY === false) { //will round when hit 1000.
            previousOperand.textContent = operate(cal.a, cal.op, cal.b) + ' ' + KEY;
            cal.a = operate(cal.a, cal.op, cal.b).toString();
        } else if (!press === false) {
            previousOperand.textContent = operate(cal.a, cal.op, cal.b) + ' ' + e.target.innerText;
            cal.a = operate(cal.a, cal.op, cal.b).toString();
        }
        cal.b = ''
    } else if (currentOperand.textContent === "Not a number" || currentOperand.textContent === "Too big" || currentOperand.textContent === "Too small") { //perform operators
        return;
    } else if (!KEY === false) {
        previousOperand.textContent = cal.a + ' ' + KEY;
    } else if (!press === false) {
        previousOperand.textContent = cal.a + ' ' + press;
    }
    currentOperand.textContent = '';
    if (!KEY === false) {
    cal.op = KEY;
    } else if (!press === false) {
    cal.op = e.target.innerText;
    }
    cal.waitingForb = true;
    cal.length = 0;
};

equal.addEventListener('click', Equal);
document.addEventListener('keydown', Equal);
function Equal(e) {                          // 6(3)
    if (e.key !== "=" && e.key !== "Enter" && !e.key === false || !cal.b) {
        return;
    } else if (operate(cal.a, cal.op, cal.b) >= 100000000000) {
        currentOperand.textContent = "Too big" //no more than 11 digits
    } else if (operate(cal.a, cal.op, cal.b) <= -100000000000) {
        currentOperand.textContent = "Too small"
    } else if (operate(cal.a, cal.op, cal.b).toString().length >= 13) {
        currentOperand.textContent = (Math.round(operate(cal.a, cal.op, cal.b) * 100) / 100).toString();
        cal.a = currentOperand.textContent;
    } else {
        currentOperand.textContent = operate(cal.a, cal.op, cal.b).toString();
        cal.a = currentOperand.textContent;
    };
    previousOperand.textContent = '';
    cal.b = '';
    cal.waitingForb = false;
    if (currentOperand.textContent < 0) {
        cal.length = currentOperand.textContent.length - 1;
    } else {
        cal.length = currentOperand.textContent.length;
    }
};

clear.addEventListener('click', Clear);
document.addEventListener('keydown', Clear);  // press Esc
function Clear(e) {
    if (e.key !== "Escape" && !e.key === false) {
        return;
    } else {
        cal.a = '0';
        cal.waitingForb = false;
        cal.op = undefined;
        cal.b = '';
        previousOperand.textContent = '';
        currentOperand.textContent = '0';
        cal.length = 0;
    }
};

del.addEventListener('click', Delete);
document.addEventListener('keydown', Delete);
function Delete(e) {
    if (e.key !== "Backspace" && !e.key === false || currentOperand.textContent === "Not a number" || currentOperand.textContent === "Too big" || currentOperand.textContent === "Too small") {
        return;
    } else {
        if (currentOperand.textContent.length <= 1 && cal.waitingForb === false) {
            cal.a = '0';
            currentOperand.textContent = '0'
            cal.length = 0;
        } else if (currentOperand.textContent.length <= 1 && cal.waitingForb === true) {
            cal.b = '';
            currentOperand.textContent = '';
            cal.length = 0;
        } else if (currentOperand.textContent.slice(-1) === ".") {
            cal.length += 1;
        }
        currentOperand.textContent = currentOperand.textContent.slice(0, -1);
        cal.length -= 1;
        console.log(cal.length)
        if (cal.waitingForb === true) {
            cal.b = cal.b.slice(0, -1);
        } else {
            cal.a = cal.a.slice(0, -1);
        };
    };
};

point.addEventListener('click', Point);
document.addEventListener('keydown', Point);
function Point(e) {
    if (e.key !== "." && !e.key === false || currentOperand.textContent.includes('.') || cal.length >= 8 || currentOperand.textContent === "Not a number" || currentOperand.textContent === "Too big" || currentOperand.textContent === "Too small") {
        return;
    } else if (cal.waitingForb === true) {
        if (!e.key === false) {
            cal.b += e.key;
            currentOperand.textContent += e.key;
        } else if (!e.target.innerText === false) {
            cal.b += e.target.innerText;
            currentOperand.textContent += e.target.innerText;
        }
    } else {
        if (!e.key === false) {
            cal.a += e.key;
            currentOperand.textContent += e.key;
        } else if (!e.target.innerText === false) {
            cal.a += e.target.innerText;
            currentOperand.textContent += e.target.innerText;
        };
    };
};