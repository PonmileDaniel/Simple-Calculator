//displayvalue hold values of the value or Result The user Input.
//firstoperand will store the Value of the First Value 
//waitSecondOperand serves as a Medium to see if the Fisrt Number has been input
//Operator will store the Operation key 

const calculator = {
    displayvalue : "0",
    firstOperand: null,
    waitsecondOperand:false,
    operator: null,
};

//DisplayValue
function inputDigit(digit){
    const {displayvalue ,waitsecondOperand} = calculator;

  
  if (waitsecondOperand === true) {
    calculator.displayvalue = digit;
    calculator. waitsecondOperand= false;
  } else {
    calculator.displayvalue = displayvalue === '0' ? digit : displayvalue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot){
   if(calculator.waitsecondOperand === true){
    calculator.displayvalue ="0."
    calculator.waitsecondOperand = false;
    return;
   }

    if(!calculator.displayvalue.includes(dot)){
        calculator.displayvalue += dot;
    }
}

function handleOperator(nextOperator){
    const { firstOperand, displayvalue, operator } = calculator

    const inputValue = parseFloat(displayvalue);
    if (operator && calculator.waitsecondOperand){
        calculator.operator = nextOperator;
        console.log(calculator)
        return;
    }

    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue
    }else if(operator){
        const result = calculate(firstOperand, inputValue,operator)

        calculator.displayvalue =`${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitsecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator)
}

function calculate (firstOperand, secondOperand, operator) {
    if(operator === "+"){
        return firstOperand + secondOperand;
    }
    else if( operator === "-"){
        return firstOperand - secondOperand;
    }
    else if ( operator === "/"){
        return firstOperand / secondOperand;
    }
    else if (operator === "*"){
        return firstOperand * secondOperand;
    }
    return secondOperand;
}
function resetCalculator(){
    calculator.displayvalue = "0";
    calculator.firstOperand = null;
    calculator.waitsecondOperand = false;
    calculator.operator = null;
    console.log(calculator)
}

function updateDisplay (){
    const display =document.querySelector(".calculatorScreen");

    display.value = calculator.displayvalue
}
updateDisplay();

const keys = document.querySelector(".calculatorKeys")
keys.addEventListener('click', (e) => {
    const { target } = e;
    const {value } = target;


    if(!target.matches("button")){
        return;
    }
    switch(value){
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
        handleOperator(value);
        break;
        case".":
        inputDecimal(value);
        break;
        case "all-clear":
        resetCalculator();
        break;
        default:
            if(Number.isInteger(parseFloat(value))){
                inputDigit(value)
            }

    }
    updateDisplay();
});
