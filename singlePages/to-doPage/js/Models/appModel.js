import { appService } from "../app.js";

class AppModel {
    constructor([title,userId,completed]) {
        this.title = title;
        this.completed = completed;
        this.createdAt = Date.now();
        this.updated = null;
        this.userdId = userId;
        this.id = generateId();  
    }
    

}

export {AppModel};

function generateId() {
    let id = appService.taskHolder.length;
    
    return JSON.stringify(id);
}