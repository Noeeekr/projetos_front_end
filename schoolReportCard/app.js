// students array contains: an name, an object holding the subjects;
let students = [
    {name: "Andy", subjects: {"Matematica": 1.0,"Geografia": 1.0,"Portugues": 1.0,"Inglês": 1.0,"Francês": 1.0}}
];

// delete this later; infos should come from local storage/database;
const names = ['John', 'Steve', 'Marc', 'Franklin', 'Isaac', 'Vincent', 'Edwin','Ashlyn', 'Anthony', 'Alia', 'Abby', 'Francesca'];
const subjects = ["Geografia","Matematica","Portugues","Inglês","Francês"];
for (let i = 0; i < 100; i++) {
    students.push(
        {
        name: names[Math.floor(Math.random() * names.length)],
        subjects: 
            {
                "Geografia": Math.floor(Math.random() * 11),
                "Matematica": Math.floor(Math.random() * 11),
                "Portugues": Math.floor(Math.random() * 11),
                "Inglês": Math.floor(Math.random() * 11),
                "Francês": Math.floor(Math.random() * 11)
            }
        }
    )
}
