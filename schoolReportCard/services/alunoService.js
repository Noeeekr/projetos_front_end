class AlunoService {
    constructor(view,model) {
        this.students = {};

        this.view = view;
        this.model = model;
        this.lastId = 0; // should come from database
    }

    renderHeader(subjects) {
        this.view.renderHeader(subjects);
    }
    renderStudent(studentInfo) {
        this.view.renderStudent(studentInfo);
    }
    findStudents(id) {
        return this.students[id];
    }
    addStudent(studentModel) {
        this.students[this.lastId + 1] = studentModel;
        
        this.lastId++;
    }
}
