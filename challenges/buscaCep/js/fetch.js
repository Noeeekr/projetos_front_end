import { validateCEP } from "./controller.js";

function fetchCEPinfo(event) {
    let cep = validateCEP(event);    
    
    return fetch(`https://viacep.com.br/ws/${cep}/json`)
}

export { fetchCEPinfo };

