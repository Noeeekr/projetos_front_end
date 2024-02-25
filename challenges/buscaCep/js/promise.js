// infos
let infos = (function(){
    let lastCEP = "";

    return {lastCEP}
})();

// cep handlers;

function validateCEP(event) {
    let cep = event.target.value;    
        cep = cep.replace(/[\s-]/g, "");

    if (cep.length === 8 && parseInt(cep) !== infos.lastCEP && !isNaN(cep)) return parseInt(cep);
    
    return false;
}
function requestPromise(cep,{method,url,data}){
    if (!method || !url) throw new Error("xhr request info (method or url) needs to be specified");
    
    infos.lastCEP = cep;

    return new Promise(function (resolve,reject) {
        url += `${cep}/json`;
        
        let xhr = new XMLHttpRequest();
            xhr.open(method,url);
            xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8")
            xhr.send(data);
            xhr.onreadystatechange = function handleProcess() {
                if (xhr.status < 400 && xhr.readyState === 4) {
                    let json = JSON.parse(xhr.responseText);
                    resolve(json);
                }
                if (xhr.status > 399 && xhr.readyState === 4) {
                    reject(new Error("api request failed"));
                }
            };
    })
}
function requestCEPinfo(event) {
    requestPromise(
        validateCEP(event),
        {
        method: "GET",
        url: "https://viacep.com.br/ws/",
        data: null
        }
    )
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

export {validateCEP, requestCEPinfo}