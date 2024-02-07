class AppModel {
    constructor([title,userId,completed]) {
        this.title = title;
        this.userId = userId;
        this.completed = completed;
        this.createdAt = Date.now();
        this.updated = null;
    }
}

export {AppModel};