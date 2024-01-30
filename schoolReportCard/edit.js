const editView = new StudentView(document.querySelector(".infoSection .studentsReport"));
const studentService = new StudentService(editView);
      studentService.students = JSON.parse(localStorage.getItem("studentsData"));
// THIS SHOULD COME FROM SESSION STORAGE / ADD GRADE BUTTON CATCH THE CURRENT STUDENT AND SENDS IT TO SESSION STORAGE
// REMOVE LATER : 
let currentStudentID = parseInt(localStorage.getItem("editStudent"));
    studentService.renderStudent(currentStudentID);
// STOP REMOVING HERE ;

// let currentStudent = "sessionStorage";

// let otherStudents = "localStorage";
// load all other students in studentService students;

studentService.renderHeader({"MATERIAS": true})

function searchStudent(event) { // search student in local storage
    if (event.target.value < 3) return;

    studentService.clearBody();
    
    for (let student in studentService.students) {
        if (studentService.students[student].name.toUpperCase().search(event.target.value.toUpperCase()) !== -1) {
            currentStudent = studentService.students[student];
            console.log("foi",currentStudent)
            continue;
        }
        console.log("executed (para checar se foi executado depois de pegar student certo")
    } 
    studentService.renderHeader(studentService.students[currentStudentID].subjects);
    studentService.renderStudent(currentStudentID);
}
let searchMechanism = document.querySelector(".addAlunoForm .addStudent");
    searchMechanism.addEventListener("input",(e) => {searchStudent(e)});


