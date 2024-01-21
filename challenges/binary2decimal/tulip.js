;(function(){
    selectNextInputFeature(
        [...document.getElementsByClassName("binInput")],
        bin2decimal
    );
})();

function selectNextInputFeature(inputArray,inputsFilled) {   
    inputArray.forEach((input) => {
        input.addEventListener("input",function(e){feature(e)})
    });

    function feature(event) {
        let inputArray = [...event.target.parentElement.children];
        let length = inputArray.indexOf(event.target);

        if (checkInputs(inputArray)) {
            inputsFilled(inputArray);
            return;
        }
        if (inputArray.length !== length + 1) inputArray[length + 1].focus();
    };
}
function checkInputs(inputArray) {
    return inputArray.every((input) => {
        return input.value !== "";
    })
}
function cleanInputs(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    })
}
function bin2decimal(inputArray) {
    let binaryValues = inputArray.map((input) => {return parseInt(input.value)});
    let sum = 0;

    for (let i = 0, j = binaryValues.length - 1; i < binaryValues.length, j > -1; i++, j--) {
        if (binaryValues[i] === 1) sum += 2 ** j;
    }

    console.log(sum);

    cleanInputs(inputArray);
}
// add a check result button for mobile users

// add popup message when people insert a value bigger 
// or smaller than expected and
// remove the min/max value after that in html input;

// add the func that shows result