const cardsHoverEffect = (event) => {
    const { currentTarget: target } = event;
    console.log(event,target) 

    const rect = target.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for (const card of document.querySelectorAll(".card")) {
    card.onmousemove = (event) => cardsHoverEffect(event);
    let randomColor = `${Math.floor(Math.random() * 250) + 1},${Math.floor(Math.random() * 250) + 3},${Math.floor(Math.random() * 250) + 1}`
    card.style.setProperty("--random-color", `rgb(${randomColor},${0.3})`);
    card.style.setProperty("--random-color-translucent", `rgba(${randomColor},${0.09})`);
}
/* makes a card array and put the event listener with a function that does the mouse effect */