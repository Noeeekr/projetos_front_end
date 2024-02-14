document.querySelectorAll(".selectable").forEach((item) => {
    item.addEventListener("click",(e) => {changeState(e)})
})
function changeState(event) {
    if (!event.target.parentElement.classList.contains("selectable")) return;

    event.target.parentElement.querySelector(".active").classList.remove("active")
    event.target.classList.add("active");
}