;(function(){
    selectNextInputFeature(
        [...document.getElementsByClassName("binInput")],
        bin2decimal
    );
})();
let message_interval = false;
// extra features;
function selectNextInputFeature(inputArray,inputsFilled) {   
    inputArray.forEach((input) => {
        input.addEventListener("input",function(e){feature(e)})
    });

    function feature(event) {
        if (!isBinary(parseInt(event.target.value))) {
            cleanInputs([event.target]);
            showMessage(event.target);
            return;
        }

        let inputArray = [...event.target.parentElement.children];
        let currentIndex = inputArray.indexOf(event.target);

        if (checkInputs(inputArray)) {
            inputsFilled(inputArray); // for when all inputs are filled;
            return;
        }
        
        if (currentIndex === inputArray.length - 1){
            inputArray[0].focus()
        }

        if (inputArray.length !== currentIndex + 1) inputArray[currentIndex + 1].focus();
    };
}
function checkInputs(inputArray) {
    return inputArray.every((input) => {
        return input.value !== "";
    })
}
function cleanInputs(inputArray) {
    inputArray.forEach((input) => {
        input.value = "";
    })
}
function showResult(sum) {
    document.querySelector(".bin2dec_resultViewer .result").textContent = sum;
}
function showMessage(input) {
    if (message_interval) clearInterval(message_interval);

    let {x,y} = input.getBoundingClientRect();
    let message = document.getElementById("wrongInputMessage");
        message.style.opacity = 1;
        message.style.setProperty("--messageTopPosition",`${y - message.getBoundingClientRect().height - 20}px`);
        message.style.setProperty("--messageLeftPosition",`${x - 10}px`);
    
    message_interval = setTimeout(function(){message.style.opacity = 0},1000)
}
// actual bin2dec conversor;
function isBinary(number) {
    if (number !== 1 && number !== 0) return false;
    return true;
}
function bin2decimal(inputArray) {
    let binaryValues = inputArray.map((input) => {return parseInt(input.value)});
    let sum = 0;

    for (let i = 0, j = binaryValues.length - 1; i < binaryValues.length, j > -1; i++, j--) {
        if (binaryValues[i] === 1) sum += 2 ** j;
    }

    showResult(sum);
    cleanInputs(inputArray);
}