class AppModel {
    constructor([name,description,priority]) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.createdAt = Date.now();
        this.updated = null;
    }
}

export {AppModel};