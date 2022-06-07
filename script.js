//Adds event listeners to all of the digit buttons and passes the proper value for each button to the digits function
function addClickEventListener(list){
    for (var i = 0; i <= list.length - 1; i++){
        if(i == 9){
            list[i].addEventListener('click', function(){digitsFun(0)});    
        }else if(i == 10){
            list[i].addEventListener('click', function(){digitsFunDot('.')});
        }else{
            list[i].addEventListener('click', function(){digitsFun(this.textContent)});
        };
    }
};

function addClickEventFunctions(list){
    list[0].addEventListener('click', function(){nextValue(storeDigitFront, "add")});
    list[1].addEventListener('click', function(){nextValue(storeDigitFront, "subtract")});
    list[2].addEventListener('click', function(){nextValue(storeDigitFront, "multiply")});
    list[3].addEventListener('click', function(){nextValue(storeDigitFront, "divide")});
    list[4].addEventListener('click', function(){clear()});
    list[5].addEventListener('click', function(){operate(storeOperator, parseInt(storeDigitBack), parseInt(storeDigitFront))});
    
    
}

function add(a,b){
    console.log(a + b);
;    return a + b;
};

function subtract(a,b){
    return a - b;
};

function multiply(a,b){
    return a * b;
};

function divide(a,b){
    return a/b;
};

function operate(operator, a, b){


    let output;
    switch(operator){
        case 'add':
            output =  add(a,b);
            break;
        case 'subtract':
            output =  subtract(a,b);
            break;
        case 'multiply':
            output =  multiply(a,b);
            break;
        case 'divide':
            output =  divide(a,b);
    };
    storeOperator = operator;
    storeDigitBack = output;
    storeDigitFront = "";
    updateDisplay(output);
};

let displayVar;
let display = document.querySelector('#display');
// display.textContent = "Working!"

function updateDisplay(a){
    display.textContent = a;
}

//stores value in display
let storeDigitFront = "";
//digits Node list
let digits = document.querySelectorAll('.digits');
//adds listeners to digit buttons
addClickEventListener(digits);

//functions node list
let functions = document.querySelectorAll('.functions');
addClickEventFunctions(functions);


function digitsFun(digit){
    storeDigitFront += digit;
    updateDisplay(storeDigitFront)
}

//this variables stores whether a decimal is already in the storeDigitFront variable
let dotwatch = false;
function digitsFunDot(dot){
    if(dotwatch == false){
        storeDigitFront += dot;
        dotwatch = true;
        updateDisplay(storeDigitFront);
    };
}

let storeDigitBack = 0;
let storeOperator;

//stores the chosen number in a value, resets the storeDigitFront value, and sets the operator function to be sent for operation
function nextValue(digit, operator){
    storeDigitBack = digit;
    storeDigitFront = "";
    storeOperator = operator;
    console.log(storeDigitBack);
}

function clear(){
    storeDigitFront = "";
    storeDigitBack = 0;
    updateDisplay(0);
}




