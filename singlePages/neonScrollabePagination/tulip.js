let infos = (function() {
    const PROFILEINFO = [['John', 'Steve', 'Marc', 'Franklin', 'Isaac', 'Vincent', 'Edwin','Ashlyn', 'Anthony', 'Alia', 'Abby', 'Francesca'],['Shafer', 'Whitetaker', 'Glenn', 'Stephens', 'Sherman', 'Howard','Kent', 'Clay', 'Beck', 'Simmons', 'Briggs', 'Lee', 'Maxwell'],['CEO', 'President', 'Vice President', 'Director', 'Manager','Developer']]
    const PROFILES = []
    const CURRENTPAGE = 0;

    return {CURRENTPAGE,PROFILEINFO,PROFILES};
})();
(function(){
    for (let i = 0; i < 301; i++) {
        createProfiles()
    }
    renderPage(12);
    renderButtons();
    document.querySelector(".scroll").addEventListener("scroll",function(e){scrollHandler(e)})
})();
function updateButton(eventOrIndex) {
    let button;
    if (typeof eventOrIndex !== 'number') {
        button = eventOrIndex.target;
    } else {
        button = document.querySelectorAll(".randomButton")[eventOrIndex]
    }
    renderPage([...document.querySelectorAll(".randomButton")].indexOf(button));
    document.querySelector(".randomButton.active").classList.remove("active");
    button.classList.add("active");
}
function renderButtons() {
    let buttons = Math.ceil(infos.PROFILES.length / 10);

    for (let i = 0; i < buttons; i++){
        let btn = document.createElement("li")
            btn.className = "randomButton";
            btn.textContent = i + 1;
        if (i === 0) btn.className += " active";
        btn.addEventListener("click",function(e){updateButton(e)});
        
        document.querySelector(".scrollbar_CenterButtons").appendChild(btn);
    }
}
function renderPage(page) {
    // gets a list of elements based on page value;
    let profileArray = infos.PROFILES.slice(page * 10,page * 10 + 10);
    // clean current table;
    let currentTable = document.querySelectorAll(".listVisualizer .table")[0];
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
function createProfiles() {
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
function scrollHandler(e) {

}

/*

idk how to do it perfectly, every time something feels missing

*/