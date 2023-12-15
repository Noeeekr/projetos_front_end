let taskHolder = getTaskData() === null ? []: getTaskData();
/* our variable that hold the tasks from the cookie*/
(function(){
    document.querySelectorAll(".introduction-createButton")[0].addEventListener("click",function(){
        if (document.querySelectorAll(".taskFormWrapper")[0].classList[1]) { document.querySelectorAll(".taskFormWrapper")[0].classList.remove("taskFormWrapperActive");}
        else {document.querySelectorAll(".taskFormWrapper")[0].classList.add("taskFormWrapperActive");}
    });
    document.getElementById("taskForm-createButton").addEventListener("click",function(){
        validateTaskFormValues(getTaskForm())
    });
    document.getElementById("warningPopUp-closeButton").addEventListener("click",function(){
        this.classList.remove("active");
    });
    taskHolder.forEach((task) => {renderTaskOnTaskViewer(task);})
})();
/* listeners for clicks */
function getTaskData() {
    let data = localStorage.getItem("taskHolderData");
    return JSON.parse(data);
}
/* get the cookie */
function updateTaskData() {
    let data = JSON.stringify(taskHolder);
    localStorage.setItem("taskHolderData",data);
}
/* update the cookie */
function Task(arrayOfValues) {
    if (arguments.length === 0 || !arrayOfValues[0]) { throw new Error("Task constructor needs a name");}
    
    this.name = arrayOfValues[0];
    this.description = arrayOfValues[1];
    this.priority = arrayOfValues[2];
    this.createdAt = Date.now();
    this.updated = null;
}
/* our object constructor function that makes new tasks*/
function renderTaskOnTaskViewer(taskObject) {
    let task = document.createElement("div");
        task.setAttribute("class","task");

    let name = document.createElement("h3");
        name.textContent = taskObject.name;
        name.setAttribute("class","task-title");

    let priority = document.createElement("h4");
        priority.textContent = taskObject.priority;
        priority.setAttribute("class","task-priority");

    let description = document.createElement("p");
        description.textContent = taskObject.description;
        description.setAttribute("class","task-description");

    task.append(name,priority,description);

    document.querySelectorAll(".taskHolder")[0].appendChild(task);
}
function getTaskForm(){
    return [...document.getElementsByName("taskForm-value")].map((node) => {return node.value})
}
/* the function that gets all the inputs values */
function validateTaskFormValues(arrayOfValues){
    if (arrayOfValues.includes("")) {
        document.getElementById("warningPopUp-closeButton").classList.add("active");
    } else {
        taskHolder.push(new Task(arrayOfValues)) && updateTaskData();
        renderTaskOnTaskViewer(taskHolder[taskHolder.length - 1]);
    }
    document.getElementsByName("taskForm-value").forEach((node) => {if (node) {node.value = "";}});
}
/* the function that validates the values and clean the fields*/



/*
delete later!!

to-do:

    css: change the select menu;
    js: edit button, delete button;
    ui: mobile acessibility;
*/