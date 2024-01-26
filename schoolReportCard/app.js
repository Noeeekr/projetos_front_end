// students array contains: an name, an object holding the subjects;
const students = [];

// delete this later; infos should come from local storage/database;
const names = ['John', 'Steve', 'Marc', 'Franklin', 'Isaac', 'Vincent', 'Edwin','Ashlyn', 'Anthony', 'Alia', 'Abby', 'Francesca'];
const subjects = ["Geografia","Matematica","Portugues","Inglês","Francês"];
for (let i = 0; i < 100; i++) {
    students.push(
        {
        name: names[Math.floor(Math.random() * names.length)],
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

let renderLocal = document.querySelector("table.studentsReport");

let alunosView = new AlunoView(renderLocal);
let alunosModel = new AlunoModel(students,subjects);
let alunosService = new AlunoService(alunosView,alunosModel);

alunosService.renderHeader(["Matematica","portugues","biologia"]);
students.forEach((student) => {
    alunosService.renderStudent(student);
})
