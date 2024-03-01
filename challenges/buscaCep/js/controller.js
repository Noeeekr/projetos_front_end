import { fetchCEPinfo } from "./fetch.js";
import { requestCEPinfo } from "./promise.js";

let infos = (function(){
    let lastCEP = "";

    return { lastCEP }
})()

;(function() {
    [...document.querySelectorAll(".config .btnRequestType")].forEach((btn) => {
        btn.addEventListener("click",(e) => {
            changeBtnState(e,"selectRequestType");
        });
    });
    document.getElementById("inputCEP").addEventListener("keyup",(e) => {manageRequest(e)})
})();

function validateCEP(event) {
    let cep = event.target.value;    
        cep = cep.replace(/[\s-\/]/g, "");

    if (cep.length === 8 && parseInt(cep) !== infos.lastCEP && !isNaN(cep)) return parseInt(cep);
    
    return false;
}
function changeBtnState(event,parentId) { 
    let btnGroup = event.target;
    while (btnGroup.id !== parentId) {
        btnGroup = btnGroup.parentElement;
    }

    btnGroup.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
}
function executeRequestType(event) {
    let btn = document.querySelector(".config .btnRequestType.active") || document.querySelector(".config .btnRequestType");

    if (btn.method == "fetch") {
        return fetchCEPinfo(event);
    } else {
        return requestCEPinfo(event);
    }
}
function manageRequest(e) {
    if (!validateCEP(e)) return;

    executeRequestType(e)
    .then((cepInfo) => {
        if (cepInfo.erro) throw new Error("Cep not found");
        return cepInfo;
    })
    .then((cepInfo) => {
        [...document.querySelectorAll("input")].forEach((input) => {    
            if (!cepInfo[input.id.slice(5).toLowerCase()]) return;    
            input.value = cepInfo[input.id.slice(5).toLowerCase()];
        })
    })
    .catch((e) => {throw new Error(e)});
}

export { validateCEP };
