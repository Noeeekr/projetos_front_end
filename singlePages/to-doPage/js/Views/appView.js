class AppView {
    constructor(view) {
        this.viewLocal = view;
    }
    renderTaskOnTaskViewer({title,completed,userId},parentThis) {
        let task = document.createElement("div");
            task.className = "task";
            task.setAttribute("task","true");
    
        let header = document.createElement("div");
            header.className = "task-titleWrapper";
    
        let taskName = document.createElement("h3");
            taskName.textContent = title;
            taskName.className = "task-title";
    
        let taskPriority = document.createElement("h4");
            taskPriority.textContent = userId;
            taskPriority.className = "task-priority";
    
        let taskDescription = document.createElement("p");
            taskDescription.innerText = completed;
            taskDescription.className = "task-description";
    
        let iconWrapper = document.createElement("div");
            iconWrapper.className = "task-iconWrapper";
            let editButton = document.createElement("span");
                editButton.className = "material-symbols-outlined taskIcon";
                editButton.textContent = "settings";
                editButton.addEventListener("click",(e) => {parentThis.editButtonAction(e,parentThis)})
            let closeButton = document.createElement("span");
                closeButton.className = "material-symbols-outlined taskIcon";
                closeButton.textContent = "done";
                closeButton.addEventListener("click",(e) => {parentThis.closeButtonAction(e,parentThis)})
        iconWrapper.append(editButton,closeButton);
        header.append(iconWrapper,taskName);
    
        task.append(header,taskPriority,taskDescription);
        
        this.viewLocal.appendChild(task);
    }
    //
    // I KNOW THIS CODE SUCKS
    // BUT I'M NOT REMAKING IT
    // I'LL DO A BETTER ONE 
    // I PROMISE
    // I JUST WANTED TO TEST AJAX ON IT
    // I'M SORRY MOM AND DAD
    //
    closeButtonAction(e,parentThis){
        let task = e.target;
        let taskArray = [...document.querySelectorAll(".task")]
        while (task.classList[0] !== "task") {
            task = task.parentElement;
        }

        parentThis.updateLocalTaskHolder("DELETE",`http://localhost:3000/tasks/${taskArray.indexOf(task)}`,null,null);
        parentThis.taskArray.splice(taskArray.indexOf(task),1);
        
        task.remove();
    }

    editButtonAction(e,parentThis){
        let editButton = e.target;
        let taskArray = [...document.querySelectorAll(".task")]
        let task = e.target;
        while (!task.getAttribute("task")) {
            task = task.parentElement;
        }

        if (editButton.className.includes("taskIconActive")) {            
            parentThis.taskHolder[taskArray.indexOf(task)].title = task.querySelector("input.nameInput").value;
            parentThis.taskHolder[taskArray.indexOf(task)].userId = task.querySelector(".descriptionInput").value;
            parentThis.taskHolder[taskArray.indexOf(task)].completed = task.querySelector(".priorityInput").value;
            
            task.querySelector(".task-title").textContent = task.querySelector("input.nameInput").value;
            task.querySelector(".task-description").textContent = task.querySelector(".descriptionInput").value;
            task.querySelector(".task-priority").textContent = task.querySelector(".priorityInput").value;
            
            parentThis.updateLocalTaskHolder("PUT",`http://localhost:3000/tasks/${taskArray.indexOf(task)}`,null,JSON.stringify(parentThis.taskHolder[taskArray.indexOf(task)]));
            
            task.querySelector(".task-editContainer").remove()
            task.querySelector(".task .taskIcon:nth-child(1)").classList.remove("taskIconActive");

            return;
        }
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

export {AppView};
