const studentsInfo = JSON.parse(localStorage.getItem("studentsData"));
const subjects = {"geografia": 0,"fisica": 0,"ingles": 0,"frances": 0,"portugues": 0,"matematica": 0};

// report section load :
let studentView = new StudentView(document.querySelector("table.studentsReport"));
let studentService = new StudentService(studentView);
    studentService.renderHeader(subjects);
    studentService.students = studentsInfo || {}; 
    
for (let id in studentService.students) {
    studentService.renderStudent(id);
}

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
    searchMechanism.addEventListener("input",(e) => {searchStudent(e)});

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
// edit html : popup para aparecer quando clicar em uma grade
// popup feature : change grade points
//  
//
// add a feature to edit which subjects you want to show in header
// (since all the subjects that are shown are the one predefined the instructor)
// it should have the flexibility to search for the ones that are not in the grade and
// add them to it
//
// feature: remove student grade;
// feature: say how many results were found in search student by name/id
// make the buttons actually work in edit html/report
// when you change a student's grade, it won't leave the table until you press "atualizar grade" button, or close browser