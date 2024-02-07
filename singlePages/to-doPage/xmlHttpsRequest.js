function createXHR(method,url,cb,data = null) {
    let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = stateCheck;
		xhr.open(method,url,true);
		xhr.send(data)

	function stateCheck() {
		if (xhr.state === 404) {
			console.log("Error",xhr.state);
			return;
		}
		if (this.readyState === 4 && this.status === 200) {
			cb(JSON.parse(xhr.responseText));	
		}
	}
}
export { createXHR };
