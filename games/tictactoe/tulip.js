var info = (function () {
    this.currentPlayer = "x"

    this.changePlayer = function () {
        if (this.currentPlayer === "x") {
            this.currentPlayer = "o";
            return;
        }
        this.currentPlayer = "x"
    }

    return {currentPlayer,changePlayer};
})();

(function(){
    // ending animation;
    setInterval(resetAnimation,900);
    // click event listener for game functionality;
    document.querySelector(".game").addEventListener("click",function (e){checkSpot(e)});
    document.querySelector(".endingMessage").addEventListener("click",endingAnimation);
})()

function resetAnimation() {
    let checkState = [...document.querySelector(".endingMessage").classList].find((cl) => {
        return cl === "endingMessage_textAnimation";
    });
    
    if (checkState) {
        document.querySelector(".endingMessage").classList.remove("endingMessage_textAnimation");
        return;
    }
    document.querySelector(".endingMessage").classList.add("endingMessage_textAnimation");
}

function endingAnimation() {
    if ([...document.querySelector(".endingMessage").classList].includes("endingMessage_opacityAnimation")) {
        document.querySelector(".endingMessage").classList.remove("endingMessage_opacityAnimation");
        document.querySelectorAll(".gameSection").forEach(section => {section.textContent = ""});
        
        document.querySelectorAll(".gameSection").forEach((section) => {section.textContent = ""})
        // cleans the sections after game ends;
        
        return;
    }
    document.querySelector(".endingMessage").classList.add("endingMessage_opacityAnimation");
}

function checkVictory(player,cordinates1,cordinates2) {
    let diagonalSpots = [document.querySelectorAll(".sideA"),document.querySelectorAll(".sideB")[1],document.querySelectorAll(".sideC")];

    // victory cases;
    if ([...document.querySelectorAll(`.${cordinates1}`)].every((a) => {return a.textContent === player})) { endingAnimation(); return}
    if ([...document.querySelectorAll(`.${cordinates2}`)].every((a) => {return a.textContent === player})) { endingAnimation(); return}
    if ([diagonalSpots[0][0],diagonalSpots[1],diagonalSpots[2][2]].every(spots => {return spots.textContent === player})) {endingAnimation(); return}
    if ([diagonalSpots[0][2],diagonalSpots[1],diagonalSpots[2][0]].every(spots => {return spots.textContent === player})) {endingAnimation(); return}
    
    // if no one wins;
    let endgame = [...document.querySelectorAll(".gameSection")].every(section => {return section.textContent !== ""});
    if (endgame) endingAnimation(); 
}

function checkSpot(event) {
    let isCorrectSpot = [...event.target.classList].find((cl) => {
        return cl === "gameSection";
    })

    if (!isCorrectSpot) {
        return;
    }
    
    if (event.target.textContent) {
        return;
    } // interrupts if someone clicks an alredy used spot;

    event.target.textContent = info.currentPlayer;
    checkVictory(info.currentPlayer,event.target.classList[1],event.target.classList[2]);
    
    info.changePlayer();
}