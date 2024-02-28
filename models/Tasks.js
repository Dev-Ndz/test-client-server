const Database = require(('./Database.js'))

class Task{
    constructor(id, name,bool){
    this.task_id = id;
    this.name = name;
    this.isDone = bool;
    }
}

module.exports = Task;