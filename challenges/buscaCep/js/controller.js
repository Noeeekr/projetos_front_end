import { fetchCEPinfo } from "./fetch.js";
import { validateCEP, requestCEPinfo } from "./promise.js";

let infos = (function(){
    let lastCEP = "";

    return {lastCEP}
})();

;(function() {
    [...document.querySelectorAll(".config .btnRequestType")].forEach((btn) => {
        btn.addEventListener("click",(e) => {
            changeBtnState(e,"selectRequestType");
        });
    });
    document.getElementById("inputCEP").addEventListener("keyup",(e) => {
        changeMethod(e);
    })
})();

function changeBtnState(event,parentId) {
    // changes button decoration;
    let btnGroup = event.target;
    while (btnGroup.id !== parentId) {
        btnGroup = btnGroup.parentElement;
    }

    btnGroup.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
}
function changeMethod(event) {
    let btn = document.querySelector(".config .btnRequestType.active") || document.querySelector(".config .btnRequestType");
    if (!validateCEP(event)) return;

    if (btn.id == "fetch") {
        fetchCEPinfo(event);
    } else {
        requestCEPinfo(event);
    }
}
