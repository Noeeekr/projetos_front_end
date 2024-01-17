let infos = (function() {
    const PROFILEINFO = [['John', 'Steve', 'Marc', 'Franklin', 'Isaac', 'Vincent', 'Edwin','Ashlyn', 'Anthony', 'Alia', 'Abby', 'Francesca'],['Shafer', 'Whitetaker', 'Glenn', 'Stephens', 'Sherman', 'Howard','Kent', 'Clay', 'Beck', 'Simmons', 'Briggs', 'Lee', 'Maxwell'],['CEO', 'President', 'Vice President', 'Director', 'Manager','Developer']]
    const PROFILES = [];
    const CURRENTPAGE = 0;
    let SCROLLBAR_INFO = {visibleButtons: null,buttonAmount: null, buttonsToFillScrollbar: null};

    return {CURRENTPAGE,PROFILEINFO,PROFILES,SCROLLBAR_INFO};
})();
(function(){
    for (let i = 0; i < 301; i++) createProfile();

    renderPage(),
        renderButtons(),
        updateDisplayText(),
    document.querySelector("body").addEventListener("wheel",function(e){scrollHandler(e)});
    [...document.querySelectorAll(".listVisualizer td div")].forEach((td) => {
        td.addEventListener("mouseover",(e) => {listDecoration(e)})
    });
    [...document.querySelectorAll(".listVisualizer td div")].forEach((td) => {
        td.addEventListener("mouseout",(e) => {listDecoration(e,"remove")})
    });
    [...document.querySelectorAll(".bigButton")].forEach((button) => {
        button.addEventListener('click',(e)=>{buttonHandler(e,"big")})
    });
    [...document.querySelectorAll(".smallButton")].forEach((button) => {
        button.addEventListener('click',(e)=>{buttonHandler(e,"small")})
    });
})();
function buttonHandler(event,type) {
    let buttonAmount = infos.SCROLLBAR_INFO.buttonAmount - 1; // - 1 for array index;
    let currentButton = [...document.querySelectorAll(".randomButton")].indexOf(document.querySelector(".randomButton.active"));

    if (type === "big") {
        if (event.target.parentElement.getAttribute("name") === "foward") {
            updateButton(buttonAmount);
            scrollHandler(true);
            return;
        }
        updateButton(0);
        scrollHandler(true);
    } else {
        if (event.target.parentElement.getAttribute("name") === "back") {
            if (currentButton === 0) return;
            updateButton(currentButton - 1);
            scrollHandler(false);
        } else if (currentButton < buttonAmount) {
            updateButton(currentButton + 1);
            scrollHandler(false);
        }
    }
}
function updateDisplayText() {
    let loadedProfiles = [...document.querySelectorAll(".listVisualizer tr")];

    document.getElementsByName("scrollbarPagesInfo")[0].textContent = `${[...document.querySelectorAll(".randomButton")].indexOf(document.querySelector(".randomButton.active")) + 1}/${(Math.ceil(infos.PROFILES.length / 10))}`;
    document.getElementsByName("scrollbarRowsInfo")[0].textContent = `${loadedProfiles[0].firstChild.textContent}-${loadedProfiles[loadedProfiles.length - 1].firstChild.textContent}`;
}
function updateButton(eventOrIndex) {
    let button;
    if (typeof eventOrIndex !== 'number') {
        button = eventOrIndex.target;
    } else {
        button = document.querySelectorAll(".randomButton")[eventOrIndex]
    }
    document.querySelector(".randomButton.active").classList.remove("active");
    button.classList.add("active");

    renderPage([...document.querySelectorAll(".randomButton")].indexOf(button));
    scrollbar_Ball();
    updateDisplayText();
}
function renderButtons() {
    for (let i = 0; i < Math.ceil(infos.PROFILES.length / 10); i++){
        let btn = document.createElement("li")
            btn.className = "randomButton";
            btn.textContent = i + 1;
        if (i === 0) btn.className += " active";
            btn.addEventListener("click",function(e){updateButton(e)});

        document.querySelector(".scrollbar_CenterButtons").appendChild(btn);
    }

    infos.SCROLLBAR_INFO.visibleButtons = Math.floor(document.querySelector(".scrollbar_CenterButtons").getBoundingClientRect().width / document.querySelector(".randomButton").getBoundingClientRect().width);
    infos.SCROLLBAR_INFO.buttonAmount = document.querySelectorAll(".randomButton").length;
    infos.SCROLLBAR_INFO.buttonsToFillScrollbar = Math.floor(document.querySelector(".scrollbar_CenterButtons").getBoundingClientRect().width / document.querySelector(".randomButton").getBoundingClientRect().width);
}
function renderPage(page) {
    if (typeof page !== "number") page = 0;
    // gets a list of elements based on page value;
    let profileArray = infos.PROFILES.slice(page * 10,page * 10 + 10),
    // clean current table;
        currentTable = document.querySelectorAll(".listVisualizer .table")[0];
    
    [...currentTable.children].forEach((element) => {element.remove()})
    // starts rendering new table elements;
    profileArray.forEach(
        (profile) => {renderProfile(profile)}
    )
}
function renderProfile(profile) {
    let tr = document.createElement("tr");
        tr.className = "tr";

    for (let i = 0; i < profile.length; i++) {
        let td = document.createElement("td");
            td.className = "tableSection";
            td.textContent = profile[i];

        tr.appendChild(td)
    }

    document.querySelectorAll(".listVisualizer .table")[0].appendChild(tr);
}
function createProfile() {
    let profile = [];
    let infoArrays = infos.PROFILEINFO;
    // PROFILE INFO BEING FILLED;
    profile.push(infos.PROFILES.length + 1);
    for (let i = 0; i < infoArrays.length; i++) {
        let array = infos.PROFILEINFO[i]
        profile.push(array[Math.floor(Math.random() * array.length)])
    }

    profile.push(Math.floor(Math.random() * 250));

    // stores the profile data;
    infos.PROFILES.push(profile);
    return profile;
}
function scrollHandler(eventOrBoolean) {
    let visibleButtons = infos.SCROLLBAR_INFO.visibleButtons,
        midButton = Math.floor(visibleButtons / 2),
        timesScrolled = [...document.querySelectorAll(".randomButton")].indexOf(document.querySelector(".randomButton.active"));

    if (typeof eventOrBoolean === "boolean") {
        document.querySelector(".scrollbar_CenterButtons").scroll({left: 44 * (timesScrolled - midButton)})
        return;
    }

    let ScrollDirection = eventOrBoolean.deltaY ? eventOrBoolean.deltaY < 0 : eventOrBoolean,
        buttonAmount = (visibleButtons - 1) + infos.SCROLLBAR_INFO.buttonAmount - infos.SCROLLBAR_INFO.buttonsToFillScrollbar;

    if (!ScrollDirection) {
        if (timesScrolled === buttonAmount) return;
        
        timesScrolled++;
    } else {
        if (timesScrolled === 0) return;

        timesScrolled--;
    }

    (timesScrolled < midButton && !ScrollDirection) || document.querySelector(".scrollbar_CenterButtons").scroll({left: 44 * (timesScrolled - midButton)});
 // makes the scroll wait until the active button reach the middle of the scrollbar;

    updateButton(timesScrolled);
}
function scrollbar_Ball() {
    let columnsGap = document.querySelector(".scrollbar_InfoBar").getBoundingClientRect().width / (Math.ceil(infos.PROFILES.length / 10) - 1);
    let timesScrolled = [...document.querySelectorAll(".randomButton")].indexOf(document.querySelector(".randomButton.active"));

    document.querySelector(".infoBar_Ball").style.left = `${columnsGap * timesScrolled}px`;
}


setInterval(function(){
    if (document.querySelector(".main").classList[1]) {
        document.querySelector(".main").classList.remove("effect");
    } else {
        document.querySelector(".main").classList.add("effect");
    }
},3000);
