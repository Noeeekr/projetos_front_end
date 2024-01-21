;(function(){
    [...document.querySelectorAll(".range")].forEach(
        (input) => {
            input.addEventListener("input",function(e){update(e.target)},false);
            input.addEventListener("change",function(e){update(e.target)},false);
            update(input)
        }
    )
})();

function update(target) {
    let inputs = [...document.querySelectorAll(".range")];
    let index = [...document.querySelectorAll(".range")].indexOf(target);

    document.querySelector(".box").style.setProperty(`--${inputs[index].getAttribute("name")}`,`${inputs[index].value}%`)
    document.querySelector(".box .inputValueViewer").textContent = `${inputs[index].getAttribute("name").slice(0,-1)} ${inputs[index].value}%`;
}