function resetAnimation() {
    let classes = document.querySelectorAll(".endingMessage")[0].classList
    let validate = false;
    
    for (let i = 0; i < classes.length; i++) {
        if (classes[i] === "state2") validate = true;        
    }

    if (validate) {
        document.querySelectorAll(".endingMessage")[0].classList.remove("state2")
        return;
    }

    document.querySelectorAll(".endingMessage")[0].classList.add("state2")

    /* this code is shit but it's 00:23 give me a break I just need it to work*/
}

setInterval(resetAnimation,900);



/* do the rest of the code
    redo that shit that I wrote
*/