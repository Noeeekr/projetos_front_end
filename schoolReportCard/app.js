let studentsInfo = [];

// delete this later; infos should come from local storage/database;
// delete this later; instead of being generated like this;
const subjects = ["geografia","fisica","ingles","frances","portugues","matematica"];
const names = ['John', 'Steve', 'Marc', 'Franklin', 'Isaac', 'Vincent', 'Edwin','Ashlyn', 'Anthony', 'Alia', 'Abby', 'Francesca'];
for (let i = 0; i < 100; i++) {
    studentsInfo.push(
        {
        name: names[Math.floor(Math.random() * names.length)] + " " + names[Math.floor(Math.random() * names.length)],
        subjects: 
            {
                "GEOGRAFIA": Math.floor(Math.random() * 11),
                "MATEMATICA": Math.floor(Math.random() * 11),
                "PORTUGUES": Math.floor(Math.random() * 11),
                "INGLES": Math.floor(Math.random() * 11),
                "FRANCES": Math.floor(Math.random() * 11)
            }
        }
    )
}
// report section load ;
let renderLocal = document.querySelector("table.studentsReport");
let studentView = new StudentView(renderLocal);

let studentService = new StudentService(studentView);
    studentService.renderHeader(subjects);

studentsInfo.forEach((student) => {
    studentService.addStudent(new StudentModel(student));
})

for (let id in studentService.students) {
    studentService.renderStudent(id);
}

// search mechanism ;
function searchStudent(event) {
    let searchInput = event.target || event;
    if (searchInput.value.length < 3 && searchInput.value !== "") return;

    [...document.querySelectorAll(".studentsReport .tbody .student")].forEach((student) => {
        if (student.querySelector(".td").textContent.search(`${searchInput.value}`) === -1) {
            student.style = `display: none`;
            return;
        }
        student.style = " ";
    })
}
let searchMechanism = document.querySelector(".reportSearch .searchStudent");
    searchMechanism.addEventListener("input",(e) => {searchStudent(e)})

// add student mechanism ;
function addStudent(event) {
    event.preventDefault()

    let nameInput = event.target.querySelector(".addStudent");
    if (nameInput.value.length < 3) return; // should make it show a message if possible;

    let student = new StudentModel({
        name: nameInput.value,
        subjects: {}
    });

    nameInput.value = "";

    studentService.addStudent(student);
    studentService.renderStudent(student.id);
}

let addForm = document.querySelector(".addAlunoForm");
    addForm.addEventListener("submit",(e) => {addStudent(e)});

//
// ********* to do area
// 
// edit student page
// edit student js mvc
// ...session storage && local storage
// new feature: editar quais notas você quer que apareçam no header
// since all the subjects that are shown are the one predefined the instructor
// should have the flexibility to search for the ones that are not in the grade and
// add them to it
//
