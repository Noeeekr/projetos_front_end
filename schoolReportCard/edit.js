const editView = new StudentView(document.querySelector(".infoSection .studentsReport"));
let currentStudentID = new URLSearchParams(window.location.search).get("id") || 1;

const studentService = new StudentService(editView);
    studentService.students = JSON.parse(localStorage.getItem("studentsData"));
    studentService.renderHeader(studentService.students[currentStudentID].subjects);
    studentService.renderStudent(currentStudentID);
    enableGradeEdit();

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

    enableGradeEdit()
}
let addSubjMechanism = document.querySelector(".form.addSubject");
    addSubjMechanism.addEventListener("submit",addSubject)

function updateStudent() {
    localStorage.setItem("studentsData",JSON.stringify(studentService.students));
    
    let studentSubjects = studentService.students[currentStudentID].subjects;    

    studentService.clearBody();
    studentService.renderHeader(studentSubjects)
    studentService.renderStudent(currentStudentID);

    enableGradeEdit()
}
function enableGradeEdit() {
    [...document.querySelectorAll(".tbody .td.edit")].forEach((studentGrade) => {
        studentGrade.addEventListener("click",(e) => {startCGP(e)})
    });
    document.querySelector(".changeGradePopupHolder").addEventListener("click",(e) => {interruptCGP(e)});
    document.querySelector(".changeGradePopupHolder .button").addEventListener("click",(e) => {finishCGP(e)})
}
// CGP = ChangeGradeProcess
function startCGP(event) {
    let subject = event.target.getAttribute("subject").toUpperCase();

    let popup = document.querySelector(".changeGradePopupHolder");
        popup.className += " active";

    popup.querySelector(".popupInfo .studentName").textContent = studentService.students[currentStudentID].name
    popup.querySelector(".popupInfo .studentSubject").textContent = subject;
    popup.querySelector(".grade").value = studentService.students[currentStudentID].subjects[subject];
}
function interruptCGP(event) {
    if (event.target.classList[0] !== "changeGradePopupHolder") return;

    event.target.classList.remove("active");

    let grade = event.target.parentElement.querySelector("input");
        grade.value = 0;

    studentService.clearBody();
    studentService.renderStudent(currentStudentID);
    
    enableGradeEdit();
}
function finishCGP(event) {
    let subject = event.target.parentElement.querySelector(".popupInfo .studentSubject").textContent.toUpperCase();
    let grade = event.target.parentElement.querySelector("input");
    let gradeValue = parseFloat(grade.value);

    if (gradeValue > 100 || gradeValue < 0) {
        grade.style = "border-bottom: red 2px solid"
        return;
    }

    studentService.students[currentStudentID].subjects[subject] = gradeValue;
    
    let popup = document.querySelector(".changeGradePopupHolder");
        popup.classList.remove("active");

    grade.value = 0;
}
// buttons ;

document.querySelector(".buttonHolder.submit .addSubject").addEventListener("click",addSubject);
document.querySelector(".buttonHolder.searchStudent .button").addEventListener("click",searchStudent);
document.querySelector(".buttonHolder.submit .updateGrade").addEventListener("click",updateStudent);
