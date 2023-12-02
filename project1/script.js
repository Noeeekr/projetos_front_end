let lastMoment = Date.now();

const cardsHoverEffect = (event) => {
    console.log("função executada")
    if (lastMoment + 30 > Date.now()) {return;} else {
        lastMoment = Date.now();
    } /* gets the last listened moment and checks if 30ms already passed before executing the function */

    document.querySelectorAll(".card").forEach((card) => {
        const rect = card.getBoundingClientRect();
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    })
};

for (const card of document.querySelectorAll(".card")) {
    let randomColor = `${Math.floor(Math.random() * 210) + 40},${Math.floor(Math.random() * 210) + 40},${Math.floor(Math.random() * 210) + 40}`
    card.style.setProperty("--random-color", `rgb(${randomColor},${0.3})`);
    card.style.setProperty("--random-color-translucent", `rgba(${randomColor},${0.09})`);
};

(function(){
    document.getElementsByTagName("body")[0].onmousemove = (e) => cardsHoverEffect(e);
})();

/* makes a card array and put the event listener with a function that does the mouse effect */
