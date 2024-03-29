class StudentService {
    constructor(view) {
        this.students = {};

        this.view = view;
    }

    renderHeader(subjects) {
        this.view.renderHeader(subjects);
    }
    renderStudent(id) {
        this.view.renderStudent(this.students[id]);
    }
    clearBody() {
        this.view.clearBody();
    }
    findStudents(id) {
        return this.students[id];
    }
    addStudent(studentModel) {
        this.students[studentModel.id] = studentModel;
        localStorage.setItem("studentsData",JSON.stringify(this.students));
    }
    removeStudent(id) {
        delete this.students[id]
    }
}

export default StudentService