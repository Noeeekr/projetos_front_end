function createXHR(method,url,cb,data = null) {
	console.log("foi")
    let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = stateCheck;
	xhr.open(method,url,true);
	xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8")
	xhr.send(data)

	function stateCheck() {
		if (xhr.state === 404) {
			console.log("Error",xhr.state);
			return;
		}
		if (this.readyState === 4 && this.status === 200) {
			if (typeof cb === "function") cb(JSON.parse(xhr.responseText));	
		}
		console.log(this.readyState,this.status)
	}
}
export { createXHR };
