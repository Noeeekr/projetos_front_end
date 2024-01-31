const editView = new StudentView(document.querySelector(".infoSection .studentsReport"));
let currentStudentID = new URLSearchParams(window.location.search).get("id") || 1;

const studentService = new StudentService(editView);
    studentService.students = JSON.parse(localStorage.getItem("studentsData"));
    studentService.renderHeader(studentService.students[currentStudentID].subjects);
    studentService.renderStudent(currentStudentID);

// disable forms;
[...document.querySelectorAll("form")].forEach((form) => {form.addEventListener("submit",(e) => {e.preventDefault()});})

function searchStudent() { 
    let studentName = document.querySelector(".addAlunoForm .searchStudent .addStudent").value;
    if (studentName.length < 3) return;

    studentService.clearBody();

    for (let student in studentService.students) {
        if (studentService.students[student].name.toUpperCase().search(studentName.toUpperCase()) !== -1) currentStudentID = studentService.students[student].id;
    }

    studentService.renderHeader(studentService.students[currentStudentID].subjects);
    studentService.renderStudent(currentStudentID);
}

function addSubject() {
    let input = document.querySelector(".addSubject .addStudent")

    if (input.value.length < 4) return;

    let studentSubjects = studentService.students[currentStudentID].subjects;    
        studentSubjects[input.value.toUpperCase()] = 0.0;

    input.value = '';

    // could be more optimized if the new subject+header were added instead of loaded;
    studentService.clearBody();
    studentService.renderHeader(studentSubjects);
    studentService.renderStudent(currentStudentID);
}
let addSubjMechanism = document.querySelector(".form.addSubject");
    addSubjMechanism.addEventListener("submit",addSubject)

function updateStudent() {
    localStorage.setItem("studentsData",JSON.stringify(studentService.students));
    studentService.renderStudent(currentStudentID);
}
// buttons ;

document.querySelector(".buttonHolder.submit .addSubject").addEventListener("click",addSubject);
document.querySelector(".buttonHolder.searchStudent .button").addEventListener("click",searchStudent);
document.querySelector(".buttonHolder.submit .updateGrade").addEventListener("click",updateStudent)