//Adds event listeners to all of the digit buttons and passes the proper value for each button to the digits function
function addClickEventListener(list){
    for (var i = 0; i <= list.length - 1; i++){
        if(i == 9){
            list[i].addEventListener('click', function(){digitsFun(0)});    
        }else if(i == 10){
            list[i].addEventListener('click', function(){digitsFun('.')});
        }else{
            list[i].addEventListener('click', function(){digitsFun(this.textContent)});
        };
    }
};

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
    switch(operator){
        case 'add':
            return add(a,b);
            break;
        case 'subtract':
            return subtract(a,b);
            break;
        case 'multiply':
            return multiply(a,b);
            break;
        case 'divide':
            return divide(a,b);
    };
};
let displayVar;
let display = document.querySelector('#display');
// display.textContent = "Working!"

function updateDisplay(a){
    display.textContent = a;
}

let digitStore = "";
let digits = document.querySelectorAll('.digits');
console.log(digits);
addClickEventListener(digits);


function digitsFun(digit){
    digitStore += digit;
    console.log(digitStore);
    updateDisplay(digitStore)
}

function test(a){
    console.log(a);
}




