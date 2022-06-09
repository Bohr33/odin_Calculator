//used to rememeber the last number used in case equals is repeated
let rememberBackDigit;
//access the display so it can be updated
let display = document.querySelector('#display');
//stores value in display
let storeDigitFront = "";
//digits Node list
let digits = document.querySelectorAll('.digits');
//functions node list
let functions = document.querySelectorAll('.functions');
//this variables stores whether a decimal is already in the storeDigitFront variable
let dotwatch = false;
//watches if any operator is toggled so certain functions can be done on next digit input
let operatorWatch = false;
//watches which operator is currently toggled
let activeOperator;
//watches if a chain calculation able
let chainWatch = false;
//saves the last operator used in case equals sign is repeated
let lastOperator;
//stores the back end number that isnt typed in
let storeDigitBack = 0;

//Adds event listeners to all of the digit buttons and passes the proper value for each button to the digits function
function addClickEventListener(list){
    for (var i = 0; i <= list.length - 1; i++){
        if(i == 9){
            list[i].addEventListener('click', function(){newDigit(),digitsFun(0)});    
        }else if(i == 10){
            list[i].addEventListener('click', function(){newDigit(),digitsFunDot('.')});
        }else{
            list[i].addEventListener('click', function(){newDigit(), digitsFun(this.textContent)});
        };
    }
};

function addClickEventFunctions(list){
    list[0].addEventListener('click', function(){clear()});
    list[1].addEventListener('click', function(){operatorToggle(1)});
    list[2].addEventListener('click', function(){operatorToggle(2)});
    list[3].addEventListener('click', function(){operatorToggle(3)});
    list[4].addEventListener('click', function(){operatorToggle(4)});
    list[5].addEventListener('click', function(){operate(parseFloat(storeDigitBack), parseFloat(storeDigitFront))});
    list[6].addEventListener('click', function(){plusMinus()});
    list[7].addEventListener('click', function(){deleteLast()});
}

function add(a,b){
    console.log(a + b);
    return a + b;
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

function operate(a, b){
    //checks if the last operator pressed was equals, and sets the active Operator to the last used if so
    if(activeOperator == -1){
        activeOperator = lastOperator;
        storeDigitBack = storeDigitFront;
        storeDigitFront = rememberBackDigit;
        operate(parseFloat(storeDigitBack),parseFloat(storeDigitFront));  
    }else{
        let output;
        switch(activeOperator){
            case 1:
                output =  add(a,b);
                break;
            case 2:
                output =  subtract(a,b);
                break;
            case 3:
                output =  multiply(a,b);
                break;
            case 4:
                output =  divide(a,b);
        };
        rememberBackDigit = storeDigitFront;
        storeDigitFront = output;
        activeOperator = -1;
        chainWatch = false;
        updateDisplay(output.toFixed(10));
    }
};
function updateDisplay(a){
    if(a == '.'){
        display.textContent = "0.";
    }else{
        display.textContent = parseFloat(a);
    }
}

function digitsFun(digit){
    storeDigitFront += digit;
    updateDisplay(storeDigitFront)
}


function digitsFunDot(dot){
    if(dotwatch == false){
        storeDigitFront += dot;
        dotwatch = true;
        updateDisplay(storeDigitFront);
    };
}
function clear(){
    storeDigitFront = "";
    storeDigitBack = 0;
    updateDisplay(0);
    operatorWatch = false;
    chainWatch = false;
    dotwatch = false;
    activeOperator = -1;
}
//highlights the button which is click
function operatorToggle(element){
    if(chainWatch == true){
        operate(parseFloat(storeDigitBack), parseFloat(storeDigitFront));
        chainWatch = false;
    }

    if(activeOperator == element){
        operatorWatch = false;
    }else{
    activeOperator = element;
    lastOperator = element;
    operatorWatch = true;
    untoggleAllBut();
    }
    functions[element].classList.toggle('activeOperator');
    dotwatch = false;

}

//function to untoggle all highlighted operators
function untoggleAllBut(){

    for(let i = 0; i < 4; i++){
        if(i + 1 != activeOperator){
            functions[i + 1].classList.remove('activeOperator');
        }
    }    
}

function untoggleActive(){
    functions[activeOperator].classList.remove('activeOperator');
}

//this function checks if an operator is on and then prepares the calculator for new digit input
function newDigit(){
    if(operatorWatch == true){
        storeDigitBack = storeDigitFront;
        storeDigitFront = "";
        untoggleActive();
        operatorWatch = false;
        chainWatch = true;
    }
}

function plusMinus(){
    storeDigitFront *= -1;
    updateDisplay(storeDigitFront);
}

function deleteLast(){
    storeDigitFront = storeDigitFront.slice(0, -1);
    if(storeDigitFront == ""){
        storeDigitFront = 0;
    };
    updateDisplay(storeDigitFront);
}

//adds listeners to digit buttons and functions
addClickEventListener(digits);
addClickEventFunctions(functions);



