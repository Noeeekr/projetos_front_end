class AppService {
    constructor(taskView) {
        this.taskHolder = [];
        this.taskView = taskView;
    }
    renderTaskOnTaskViewer(task) {
        this.taskView.renderTaskOnTaskViewer(task,this);
    }
    closeButtonAction(e) {
        this.taskView.closeButtonAction(e,this)
    }
    editButtonAction(e) {
        this.taskView.editButtonAction(e,this)
    }
    updateLocalTaskHolder() {
        this.taskHolder = this.getTaskData() === null ? []: this.getTaskData();
    }
    uploadTaskHolder() {
        let data = JSON.stringify(this.taskHolder);
        localStorage.setItem("taskHolderData",data);
    }
    getTaskData() {
        let data = localStorage.getItem("taskHolderData");
        return JSON.parse(data);
    }
}

export {AppService};