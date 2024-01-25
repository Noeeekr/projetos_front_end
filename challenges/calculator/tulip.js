let infos = (function(){
    let currentMath = [""]; // holds the current math numbers and operators for view and calc;
    let currentValue = [""]; // holds the current value of the math for view;
    let calc = null; // copy of current math that's used to process the operations;
    let operationPriority = {
        "+": 1,
        "-": 1,
        "/": 2,
        "X": 2,
    };

    return {calc,currentMath,currentValue,operationPriority}
})();
(function(){
    addButtonListener(
        [...document.querySelector(".calculatorButtons").children],
        "click",
        mathController
    )
    addButtonListener(
        [...document.querySelectorAll(".result .removeButton")],
        "click",
        removeParent
    )
})();

// DOM handlers;
function addButtonListener(buttonArray,event,func) {
    buttonArray.forEach((button) => {button.addEventListener(event,function(e){func(e)})})
}
function removeParent(event) {
    event.target.parentElement.remove();
}

function renderMath() {
    let renderEntireCalc = document.querySelector(".currentCalc");
    let renderResult = document.querySelector(".currentResult");

    let text = infos.currentMath.map((value) => {if (typeof value === "object") {return value.value} return value});
    renderEntireCalc.textContent = text.join(" ").toLowerCase(); 
    
    if (infos.currentValue.length === 1) renderResult.textContent = infos.currentValue;
}
function addOlderResult() {
    let olderResultLocal = document.querySelector(".olderResults .result.currentResult");
    let olderResult = document.createElement("li");
        olderResult.className = "result";
        olderResult.innerHTML = `${infos.currentValue}<div class="removeButton">X</div>`;
        addButtonListener([olderResult],"click",removeParent);

    olderResultLocal.after(olderResult);
}

// special button handlers;
function cleanAll() {
    infos.currentMath = [""];
    infos.currentValue = [];
    infos.calc = null;
}
function cleanLast() {
    let lastIndex = infos.currentMath[infos.currentMath.length - 1];
    if (!lastIndex && infos.currentMath.length > 1) {
        infos.currentMath.splice(-2);
        return;
    } 

    let currentValueArray = lastIndex.split("");
    currentValueArray.pop()

    infos.currentMath[infos.currentMath.length - 1] = currentValueArray.join("");
}
function finishMath() {
    if (infos.currentValue[0] === "") return;

    calc();
    addOlderResult();
    cleanAll();
    renderMath();
}
// calc handler;
function calc() {
    infos.calc = [...infos.currentMath];

    while (findOperation(infos.calc,2)) infos.calc = type2operation(infos.calc);
    while (findOperation(infos.calc,1)) infos.calc = type1operation(infos.calc);

    if (infos.calc.length === 1) infos.currentValue = infos.calc;
}

// operation handler;
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
function findOperation(calc,priority) {
    let operation = calc.find((operation) => {if (operation.priority) return operation.priority === priority})
    let operationIndex = calc.findIndex((value) => {return value === operation});

    if (!(operation && calc[operationIndex + 1] && calc[operationIndex + 1])) return false;
    
    return [operationIndex,operation];
}
function type2operation(calc) {
    let [operationIndex,operation] = findOperation(calc,2);

    if (!(calc[operationIndex - 1] && calc[operationIndex + 1])) return;

    let result = operation.value === "X" ? multiply(calc[operationIndex -1],calc[operationIndex + 1]) : divide(calc[operationIndex -1],calc[operationIndex + 1]);

    calc.splice(operationIndex - 1,3,result);

    return calc;
}
function type1operation(calc) {
    let [operationIndex,operation] = findOperation(calc,1);

    if (!(calc[operationIndex - 1] && calc[operationIndex + 1])) return;

    let result = operation.value === "+" ? sum(calc[operationIndex -1],calc[operationIndex + 1]) : decrease(calc[operationIndex -1],calc[operationIndex + 1]);

    calc[operationIndex - 1] = result;    
    
    calc.splice(operationIndex,operationIndex + 1)

    return calc;
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


// calculator controller
function mathController(event) {
    let buttonContent_isNumber = parseInt(event.target.textContent) || parseInt(event.target.textContent) === 0 ? true : false;
    let buttonContent = parseInt(event.target.textContent) ? parseInt(event.target.textContent) : event.target.textContent;
    
    if (buttonContent === 0) buttonContent = "0";

    if (checkSpecialValues(buttonContent)) {
        calc() 
        renderMath()
        return;
    }
    
    let currentValue = infos.currentMath[infos.currentMath.length - 1];

    if (buttonContent_isNumber && currentValue.length > 7) return; // number size limit;
    if (!buttonContent_isNumber && infos.currentMath[0].length === 0) return; // no start with operations;

    buttonContent_isNumber ? addNumber(buttonContent) : addOperation(currentValue,buttonContent); 
    
    calc()
    renderMath()
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