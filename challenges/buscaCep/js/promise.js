import { validateCEP } from "./controller.js";

function requestPromise(cep,{method,url,data}){
    if (!method || !url) throw new Error("xhr request info (method or url) needs to be specified");
    
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
    return requestPromise(
        validateCEP(event),
        {
        method: "GET",
        url: "https://viacep.com.br/ws/",
        data: null
        }
    )
}

export { requestCEPinfo };