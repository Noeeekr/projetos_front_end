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
function editButtonAction(e){
    let editButton = e.target;
    let task = e.target;
    while (!task.getAttribute("task")) {
        task = task.parentElement;
    }

    if (editButton.className.includes("taskIconActive")) {
        let taskArray = [...document.querySelectorAll(".task")]

        taskHolder[taskArray.indexOf(task)].name = task.querySelector("input.nameInput").value;
        taskHolder[taskArray.indexOf(task)].description = task.querySelector(".descriptionInput").value;
        taskHolder[taskArray.indexOf(task)].priority = task.querySelector(".priorityInput").value;
        // could be replaced for forEach in future;
        task.querySelector(".task-title").textContent = task.querySelector("input.nameInput").value;
        task.querySelector(".task-description").textContent = task.querySelector(".descriptionInput").value;
        task.querySelector(".task-priority").textContent = task.querySelector(".priorityInput").value;
        
        updateTaskData()
        
        task.querySelector(".task-editContainer").remove()
        task.querySelector(".task .taskIcon:nth-child(1)").classList.remove("taskIconActive");
    } else {
        let editContainer = document.createElement("div");
            editContainer.className = "task-editContainer";

        let name = document.createElement("input");
            name.className = "nameInput";
            name.value = task.querySelector(".task-title").textContent;
        let priority = document.createElement("select");
            priority.className = "priorityInput";
            let options = document.getElementById("taskForm-priorityInput").children;
                for (let i = 0; i < options.length; ++i) {
                    let opt = document.createElement("option");
                    opt.value = options[i].value;
                    opt.textContent = options[i].value;
                    priority.appendChild(opt);
                }
            priority.value = task.querySelector(".task-priority").textContent;
        let description = document.createElement("textarea");
            description.className = "descriptionInput";
            description.textContent = task.querySelector(".task-description").textContent;

        editContainer.append(name,priority,description);

        task.appendChild(editContainer);
        task.querySelector(".task .taskIcon:nth-child(1)").classList.add("taskIconActive");
    }
}
/* makes the edit Button  event listener work */
function closeButtonAction(e){
    let task = e.target;
    while (task.classList[0] !== "task") {
        task = task.parentElement;
    }
    
    taskHolder.splice([...document.querySelectorAll(".task")].indexOf(task),1);
    updateTaskData();

    task.remove();
}
/* makes the close Button event listener work */
function renderTaskOnTaskViewer(taskObject) {
    let task = document.createElement("div");
        task.className = "task";
        task.setAttribute("task","true");

    let title = document.createElement("div");
        title.className = "task-titleWrapper";

    let name = document.createElement("h3");
        name.textContent = taskObject.name;
        name.className = "task-title";

    let priority = document.createElement("h4");
        priority.textContent = taskObject.priority;
        priority.className = "task-priority";

    let description = document.createElement("p");
        description.innerText = taskObject.description;
        description.className = "task-description";

    let iconWrapper = document.createElement("div");
        iconWrapper.className = "task-iconWrapper";
        let editButton = document.createElement("span");
            editButton.className = "material-symbols-outlined taskIcon";
            editButton.textContent = "settings";
            editButton.addEventListener("click",function(e){editButtonAction(e)})
        let closeButton = document.createElement("span");
            closeButton.className = "material-symbols-outlined taskIcon";
            closeButton.textContent = "done";
            closeButton.addEventListener("click",function(e){closeButtonAction(e)})
    iconWrapper.append(editButton,closeButton);
    title.append(iconWrapper,name);

    task.append(title,priority,description);
    
    document.querySelectorAll(".taskHolder")[0].appendChild(task);
}
function getTaskForm(){
    return [...document.getElementsByName("taskForm-value")].map((node) => {return node.value})
}
/* the function that gets all the inputs values */
function validateTaskFormValues(arrayOfValues){
    if (arrayOfValues.includes("")) {
        document.getElementById("warningPopUp-closeButton").classList.add("active");
        return;
    }

    taskHolder.push(new Task(arrayOfValues)) && updateTaskData();
    renderTaskOnTaskViewer(taskHolder[taskHolder.length - 1]);
    /* adds task to array, update the cookie and render the task that just got added */
    document.getElementsByName("taskForm-value").forEach((node) => {if (node) {node.value = "";}});
}
/* the function that validates the values and clean the fields*/