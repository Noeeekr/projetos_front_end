let biggestId = 0;

class StudentModel {
    constructor({name,subjects,id}) {
        if (!name) throw new Error("Object with name property is needed");

        this.name = name;
        this.subjects = subjects || null;
        this.id = id || this.generateId(studentService.students);
    }
    
    generateId(students) {   
        for (let id in students) {
            if (id > biggestId) biggestId = parseInt(id);
        }

        biggestId = biggestId + 1;

        return biggestId;
    }
}