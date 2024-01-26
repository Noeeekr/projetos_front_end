class AlunoView {
    constructor(renderLocal) {
        this.table = renderLocal;
        this.thead = renderLocal.children[0];
        this.tbody = renderLocal.children[1];
    }

    renderHeader(subjects) {
        let subjectsHtml = [];
            subjectsHtml.push(`<td class="td">nome</td>`)
        subjects.forEach((subject) => {
            subjectsHtml.push(`<td class="td">${subject.toLowerCase()}</td>`)
        })

        let headerContent = "";
        subjectsHtml.forEach((subject) => {
            headerContent += subject;
        })

        let header = `<tr class="student">${headerContent}</tr>`;
        this.thead.innerHTML = header;
    }

    renderStudent(studentInfo) {
        let headerSubjects = this.thead.querySelectorAll("tr .td");
        let {name,subjects} = studentInfo;

        let studentGradesHTML = []; 
            studentGradesHTML.push(`<td class="td">${name}</td>`)
        
        for (let subject of headerSubjects) {
            if (!(headerSubjects[0].textContent.toUpperCase() === subject.textContent.toUpperCase())) {
                subject = subjects[subject.textContent.toUpperCase()] > -1 ? subjects[subject.textContent.toUpperCase()] : `<a href="edit.html?id=${"mudar isso depois"}">adicionar nota</a>`;
                studentGradesHTML.push(`<td class="td">${subject}</td>`)
            }
        }

        let studentContent = "";
        studentGradesHTML.forEach((subject) => {
            studentContent += subject;
        })

        let student = `<tr class="student">${studentContent}</tr>`;
        this.tbody.innerHTML += student;
    }
}
// create a view;
// create a view.render method;
// it should recieve a id as param;