class StudentView {
    constructor(renderLocal) {
        this.table = renderLocal;
        this.thead = renderLocal.children[0];
        this.tbody = renderLocal.children[1];
    }
    clearBody() {
        this.tbody.innerHTML = "";
    }

    renderHeader(subjects) {
        let headerContent = "";
            headerContent += `<td class="td">nome</td>`;

        for (let subject in subjects) {
            headerContent += (`<td class="td">${subject.toLowerCase()}</td>`)
        }

        let header = `<tr class="student header">${headerContent}</tr>`;
        this.thead.innerHTML = header;
    }

    renderStudent(studentInfo) {
        let headerSubjects = this.thead.querySelectorAll("tr .td");
        let {name,subjects,id} = studentInfo;

        let studentGradesHTML = ""; 
            studentGradesHTML += `<td class="td">${name}</td>`;
        
        for (let subjectLocal of headerSubjects) {
            let subject = subjectLocal.textContent;
            // loads only the grades that are in header + compare them in uppercase for compatibility
            if (!(headerSubjects[0].textContent.toUpperCase() === subjectLocal.textContent.toUpperCase())) {
                subjectLocal = subjects[subjectLocal.textContent.toUpperCase()] > -1 ? subjects[subjectLocal.textContent.toUpperCase()] : `<a href="edit.html?id=${id}">adicionar nota</a>`;
                studentGradesHTML += `<td class="td edit" subject='${subject}'>${subjectLocal}</td>`;
            }
        }

        let student = `<tr class="student">${studentGradesHTML}</tr>`;
        this.tbody.innerHTML += student;
    }
}

export default StudentView