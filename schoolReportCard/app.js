const studentsInfo = JSON.parse(localStorage.getItem("studentsData"));

// delete this later; instead of being generated like this;
const subjects = {"geografia": true,"fisica": true,"ingles": true,"frances": true,"portugues": true,"matematica": true};

// report section load :

let studentView = new StudentView(document.querySelector("table.studentsReport"));
let studentService = new StudentService(studentView);
    studentService.renderHeader(subjects);
    studentService.students = studentsInfo;
    
for (let id in studentService.students) {
    studentService.renderStudent(id);
}

// search mechanism :

function searchStudent(event) {
    let searchInput = event.target || event;
    if (searchInput.value.length < 3 && searchInput.value !== "") return;

    [...document.querySelectorAll(".studentsReport .tbody .student")].forEach((student) => {
        if (student.querySelector(".td").textContent.toUpperCase().search(`${searchInput.value.toUpperCase()}`) === -1) {
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
    localStorage.setItem("editStudent",`${student.id}`);
}
let addForm = document.querySelector(".addAlunoForm");
    addForm.addEventListener("submit",(e) => {addStudent(e)});

//
// ********* to do area
// 
//
//
// ...session storage && local storage
// new feature: editar quais notas você quer que apareçam no header
// since all the subjects that are shown are the one predefined the instructor
// should have the flexibility to search for the ones that are not in the grade and
// add them to it
// // what about making search feature a "enable search student in studentService, where it gets the local where search should be enabled"
// feature: change what subjects are shown;
