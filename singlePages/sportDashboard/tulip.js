;(function(){
	[...document.querySelectorAll(".content > .header .itemHolder .iconHolder")].forEach((menuItem) => {
		menuItem.addEventListener("click",(e) => {changeActive(e)})
	})
})();

function changeActive(event) {
    let ul,target = event.target;

    while (ul.tagName !== "UL") {
        ul = ul.parentElement;
    }
    while (target.tagName !== "LI") {
        target = target.parentElement;
    }
    
    ul = [...ul.children];
    ul[ul.findIndex(item => {return item.classList.contains("active")})].classList.remove("active")

    target.classList.add("active");
}
