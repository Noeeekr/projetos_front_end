import { AppModel } from "./Models/appModel.js";
import { AppService } from "./Services/appService.js";
import { AppView } from "./Views/appView.js";

let appView = new AppView(document.querySelector(".taskViewer .taskHolder"));
let appService = new AppService(appView);
    appService.updateLocalTaskHolder("GET","https://jsonplaceholder.typicode.com/todos",init);

(function(){
    document.querySelectorAll(".introduction-createButton")[0].addEventListener("click",function(){
        if (document.querySelectorAll(".taskFormWrapper")[0].classList[1]) { document.querySelectorAll(".taskFormWrapper")[0].classList.remove("taskFormWrapperActive");}
        else {document.querySelectorAll(".taskFormWrapper")[0].classList.add("taskFormWrapperActive");}
    });
    document.getElementById("taskForm-createButton").addEventListener("click",() => {checkTaskFormValues(getFormValues())});
    document.getElementById("warningPopUp-closeButton").addEventListener("click",() => {this.classList.remove("active");});
})();
function init(tasks) {
    tasks.forEach((task) => {appService.taskHolder.push(task);appService.renderTaskOnTaskViewer(task)})
}
function getFormValues(){
    return [...document.getElementsByName("taskForm-value")].map((node) => {return node.value})
}
function checkTaskFormValues(inputArray){
    if (arguments.length === 0 || !inputArray[0]) { throw new Error("Task constructor needs a name");}

    if (inputArray.includes("")) {
        document.getElementById("warningPopUp-closeButton").classList.add("active");
        return;
    }

    appService.taskHolder.push(new AppModel(inputArray)) && appService.uploadTaskHolder();
    appService.renderTaskOnTaskViewer(appService.taskHolder[appService.taskHolder.length - 1]);

    document.getElementsByName("taskForm-value").forEach((node) => {if (node) {node.value = "";}});
}
