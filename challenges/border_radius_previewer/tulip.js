let infos = (function(){




    return {}
})();

;(function(){
    [...document.querySelectorAll("range")].forEach(
        (input) => {
            input.addEventListener("input",update,false);
            input.addEventListener("change",update,false);
        }
        )
})();

function update() {

}