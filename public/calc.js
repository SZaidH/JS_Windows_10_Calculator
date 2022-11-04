// Calculator variables
let primaryNum = '';
let secondNum = '';
let operator = '';
let result = null;
let decimalState = false;
let checkDivZero = false;

// HTML DOM elements
let primaryDisp = document.querySelector('.primary_display'); 
let secondaryDisp = document.querySelector('.secondary_display');
let numButtons = document.querySelectorAll('.number_key');
let oprButtons = document.querySelectorAll('.operation_key');
let inverseButton = document.querySelector('.inverse_key');
let clearButton =document.querySelector('.clear_key');
let clearAllButton = document.querySelector('.clear_all_key');
let clearElButton = document.querySelector('.clear_key');
let calcButton = document.querySelector('.calculate_key');

// clearAllDisplay - Implements C key's functionality (Cleaar All)
const clearAllDisplay = () =>{
    primaryDisp.innerText = '0';
    secondaryDisp.innerText = '0';
    primaryNum = '';
    secondNum = '';
    operator = '';
    decimalState = false;
    result = null;
}
// clearElDisplay - Implements CE key's functionality (Clear Element)
const clearElDisplay = () =>{
    if(result) clearAllDisplay();
    else if(secondNum){
        secondNum = '';
        primaryDisp.innerText = '0'
    }else{
        primaryNum = '';
        operator = '';
        primaryDisp.innerText = '0'
    }
}
// inverseSign - For toggling positive and negative numbers 
const inverseSign = () =>{
    let tempNum = parseFloat(primaryDisp.innerText) * -1;
    primaryDisp.innerText = tempNum.toString();
    if(primaryNum) primaryNum = tempNum.toString();
    else if(secondNum) secondNum = tempNum.toString();
}
// appendDisplay - Insert/Modify the content inside the Calculator Display area  
const appendDisplay = dispVal =>{ 
    if(dispVal === '.' && !decimalState) decimalState = true;
    else if(dispVal === '.' && decimalState) return;
    else if( primaryDisp.innerText.length > 5) return;
    
    if(operator){
        secondNum += dispVal;
        primaryDisp.innerText= secondNum;    
    }else{
        primaryNum += dispVal;
        primaryDisp.innerText= primaryNum;
    }
}
// insertOperation - Insert operation after the primary number   
const insertOperation = opr => {
    if(primaryNum && secondNum && operator)calculate();
    operator = opr;
    secondaryDisp.innerText = primaryNum + " " + operator;
    primaryDisp.innerText = '0'
    decimalState = false;
}
// calculate - Performs the calculations
const calculate = () => {
    if(primaryNum && secondNum && operator){
        primaryNum = parseFloat(primaryNum);
        secondNum = parseFloat(secondNum);
        if(operator === '+') result = primaryNum + secondNum;
        else if(operator === '-') result = primaryNum - secondNum;
        else if(operator === '*') result = primaryNum * secondNum;
        else if((operator === '÷' || operator === '/') && (secondNum === 0))checkDivZero = true;       
        else if(operator === '÷' || operator === '/') result = primaryNum / secondNum;
        else if(operator === '%') result = primaryNum % secondNum;
        secondaryDisp.innerHTML = primaryNum + " " + operator + " " + secondNum + " " + "=";
        if(!checkDivZero){
            primaryDisp.innerHTML = result;
            primaryNum = result;
            secondNum = ''
            operator = '';
        }else{
            primaryDisp.innerHTML = "Can't divide by 0";
            checkDivZero = false;
        }
    }
}

// Event listeners
numButtons.forEach((btn) => { btn.addEventListener("click", (e) => { appendDisplay(e.target.value) })}); 
oprButtons.forEach((btn)=> {btn.addEventListener("click", (e)=>{ insertOperation(e.target.innerText) })});
clearAllButton.addEventListener("click", clearAllDisplay);
clearElButton.addEventListener("click", clearElDisplay);
inverseButton.addEventListener("click", inverseSign);
calcButton.addEventListener("click",calculate);

window.addEventListener("keydown",(e)=>{
    if(
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ){appendDisplay(e.key);}
    else if(
        e.key === '+' ||
        e.key === '-' ||
        e.key === '/' ||
        e.key === '%' ||
        e.key === '*' 
    ){insertOperation(e.key);}
    else if(e.key=='Enter')calculate();
    else if(e.key=='Delete')clearAllDisplay();
    else if(e.key=='Backspace')clearElDisplay();
    else return;
});