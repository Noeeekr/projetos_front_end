let infos = (function(){
    let currentMath = [""]; // holds the current math that's being done
    let currentValue = null; // holds the full math expression;
    let operationPriority = {
        "+": 1,
        "-": 1,
        "/": 2,
        "X": 2,
    };

    return {currentMath,currentValue,operationPriority}
})();
(function(){
    addButtonListener(
        [...document.querySelector(".calculatorButtons").children],
        "click",
        checkMath
    )
})();

// DOM handlers;
function addButtonListener(buttonArray,event,func) {
    buttonArray.forEach((button) => {button.addEventListener(event,func)})
}
function finishMath() {
    calc();
    // sends the full result to historic;
    // mathCalc();
    // cleanAll();
    // etc;
}
function cleanAll() {
    infos.currentMath = [""];
}
function cleanLast() {
    if (infos.currentMath[infos.currentMath.length - 1].length === 0) {
        infos.currentMath.splice(-2);
        return;
    } 
    let currentValueArray = infos.currentMath[infos.currentMath.length - 1].split("");
    currentValueArray.pop()

    infos.currentMath[infos.currentMath.length - 1] = currentValueArray.join("");
}
function renderMath(text) {
    let renderLocal = document.querySelector(".currentResult");

    renderLocal.textContent = text;  
}
// actual math handlers;
function calc() {
    let calc = [...infos.currentMath];

    while (findOperation(calc,2)) {
        let [operationIndex,operation] = findOperation(calc,2);

        if (calc[operationIndex - 1] && calc[operationIndex + 1]) {
            let result = operation.value === "X" ? multiply(calc[operationIndex -1],calc[operationIndex + 1]) : divide(calc[operationIndex -1],calc[operationIndex + 1]);
        
            calc[operationIndex + 1] = result;
            calc.splice(operationIndex - 1,operationIndex + 1)
        }
    }

    while (findOperation(calc,1)) {
        let [operationIndex,operation] = findOperation(calc,1);

        if (calc[operationIndex - 1] && calc[operationIndex + 1]) {
            let result = operation.value === "+" ? sum(calc[operationIndex -1],calc[operationIndex + 1]) : decrease(calc[operationIndex -1],calc[operationIndex + 1]);
        
            calc[operationIndex + 1] = result;
            calc.splice(operationIndex - 1,operationIndex + 1)
        }
    }

    infos.currentValue = calc;
    console.log(infos.currentValue)
}
function findOperation(calc,priority) {
    let operation = calc.find((operation) => {if (operation.priority) return operation.priority === priority})
    let operationIndex = calc.findIndex((value) => {return value === operation});
    
    if (!(operation && calc[operationIndex + 1] && calc[operationIndex + 1])) return false;

    return [operationIndex,operation];
}
function checkMath(event) {
    let buttonContent_isNumber = parseInt(event.target.textContent) ? true : false;
    let buttonContent = parseInt(event.target.textContent) ? parseInt(event.target.textContent) : event.target.textContent;
    
    if (checkSpecialValues(buttonContent)) {
        renderMath(infos.currentMath.join(""));
        return;
    }
    
    let currentValue = infos.currentMath[infos.currentMath.length - 1];

    if (buttonContent_isNumber &&  currentValue.length > 7) return; // number size limit;
    if (!buttonContent_isNumber && infos.currentMath[0].length === 0) return; // no start with operations;
    
    buttonContent_isNumber ? addNumber(buttonContent) : addOperation(currentValue,buttonContent); 
    
    renderMath(infos.currentMath)
    calc()
}
function checkSpecialValues(buttonContent) {
    switch (buttonContent) {
        case "C":
            cleanLast();
            return true;
        case "AC":
            cleanAll();
            return true;
        case "=":
            finishMath();
            return true;
        default:
            return false;
    }
}
function addNumber(buttonContent) {
    infos.currentMath[infos.currentMath.length - 1] = infos.currentMath[infos.currentMath.length - 1] + buttonContent;
    return;
}
function addOperation(currentValue,buttonContent) {
    if (currentValue.length === 0) {
        infos.currentMath[infos.currentMath.length - 2] = {value: buttonContent, priority: infos.operationPriority[buttonContent]};
        return;
    } 
    infos.currentMath[infos.currentMath.length] = {value: buttonContent, priority: infos.operationPriority[buttonContent]};
    infos.currentMath.push("");
}
// operations ;;
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}
function sum(a,b) {
    return parseFloat(a) + parseFloat(b);
}
function decrease(a,b) {
    return parseFloat(a) - parseFloat(b);
}


// pelo amor de deus ajeita esse codigo andré que porra que é isso que voce fez
// caralho eu cometi atrocidades nesse codigo pqp me mata 

