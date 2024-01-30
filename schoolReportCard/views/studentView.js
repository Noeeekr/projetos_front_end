// *IMPORTANT* if a student grade doesn't exist in header it wont be loaded;
// *IMPORTANT* only grades that are relevant to the course will be loaded;
// *IMPORTANT* do something about it andy, don't leave it like that;


// please watch the two view videos again and redo this later using .map();
// or something, make it efficient.

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

        let header = `<tr class="student">${headerContent}</tr>`;
        this.thead.innerHTML = header;
    }

    renderStudent(studentInfo) {
        let headerSubjects = this.thead.querySelectorAll("tr .td");
        let {name,subjects,id} = studentInfo;

        let studentGradesHTML = []; 
            studentGradesHTML.push(`<td class="td">${name}</td>`)
        
        for (let subject of headerSubjects) {
            if (!(headerSubjects[0].textContent.toUpperCase() === subject.textContent.toUpperCase())) {
                subject = subjects[subject.textContent.toUpperCase()] > -1 ? subjects[subject.textContent.toUpperCase()] : `<a href="edit.html?id=${id}">adicionar nota</a>`;
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