const editView = new StudentView(document.querySelector(".infoSection .studentsReport"));
let currentStudentID = new URLSearchParams(window.location.search).get("id") || 1;

const studentService = new StudentService(editView);
    studentService.students = JSON.parse(localStorage.getItem("studentsData"));
    studentService.renderHeader();
    studentService.renderStudent(currentStudentID);

// form ;
[...document.querySelectorAll("form")].forEach((form) => {
    form.addEventListener("submit",(e) => {e.preventDefault()});
})
// search ; 
function searchStudent(event) { 
    if (event.target.value < 3) return;

    studentService.clearBody();
    for (let student in studentService.students) {
        if (studentService.students[student].name.toUpperCase().search(event.target.value.toUpperCase()) !== -1) currentStudentID = studentService.students[student].id;
    }

    studentService.renderHeader(studentService.students[currentStudentID].subjects);
    studentService.renderStudent(currentStudentID);
}
let searchMechanism = document.querySelector(".addAlunoForm .searchStudent .addStudent");
    searchMechanism.addEventListener("input",(e) => {searchStudent(e)});

// subject add ;
function addSubject(e) {
    
}
let addMechanism = document.querySelector(".form.addSubject");
    addMechanism.addEventListener("submit",(e) => {addSubject(e)})
