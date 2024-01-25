class AlunoService {
    constructor(view,model) {
        this.students = {};

        this.view = view;
        this.model = model;
        this.lastId = 0;
    }

    renderStudent(id) {
        this.view.render(this.students[id]);
    }
    findStudents(id) {
        return this.students[id];
    }
    addStudent(studentModel) {
        this.students[this.lastId + 1] = studentModel;
        
        this.lastId++;
    }
}
