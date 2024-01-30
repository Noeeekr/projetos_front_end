let biggestId = 0;

class StudentModel {
    constructor({name,subjects,id}) {
        if (!name) throw new Error("Object with name property is needed");

        this.name = name;
        this.subjects = subjects || null;
        this.id = id || this.generateId(studentService.students);
    }
    
    generateId(students) {   
        for (let student in students) {
            if (student.id && student.id > biggestId) biggestId = student.id;
        }

        biggestId = biggestId + 1;

        return biggestId;
    }
}