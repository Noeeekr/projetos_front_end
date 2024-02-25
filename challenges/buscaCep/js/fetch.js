// infos ;
let infos = (function(){
    let lastCEP = "";

    return {lastCEP}
})();

// fetch handlers;

function validateCEP(event) {
    let cep = event.target.value;    
        cep = cep.replace(/[\s-]/g, "");

    if (cep.length === 8 && parseInt(cep) !== infos.lastCEP && !isNaN(cep)) return parseInt(cep);
    
    return false;
}

function fetchCEPinfo(event) {
    let cep = validateCEP(event);

    fetch(`https://viacep.com.br/ws/${cep}/json`)
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

export { fetchCEPinfo }