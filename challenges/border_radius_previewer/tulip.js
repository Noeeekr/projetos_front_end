let infos = (function(){




    return {}
})();

;(function(){
    [...document.querySelectorAll(".range")].forEach(
        (input) => {
            input.addEventListener("input",function(e){update(e)},false);
            input.addEventListener("change",function(e){update(e)},false);
        }
    )
})();

function update(event) {
    let inputs = [...document.querySelectorAll(".range")];
    let index = [...document.querySelectorAll(".range")].indexOf(event.target);

    document.querySelector(".box").style.setProperty(`--${inputs[index].getAttribute("name")}`,`${inputs[index].value}%`)
    document.querySelector(".box .inputValueViewer").textContent = `${inputs[index].getAttribute("name")} ${inputs[index].value}%`;
}