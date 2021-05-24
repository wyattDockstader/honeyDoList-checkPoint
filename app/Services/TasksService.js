import { ProxyState } from "../AppState.js";
import { Task } from "../Models/Task.js";
import { generateCongrats } from "../Utils/GenerateCongrats.js";
import { saveState } from "../Utils/LocalStorage.js";

class TaskService {
    constructor() {
        ProxyState.on('lists', saveState)
        ProxyState.on('tasks', saveState)
    }
    createTask(newTask) {
        ProxyState.tasks = [...ProxyState.tasks, new Task(newTask)]
    }
    deleteTask(taskId) {
        ProxyState.tasks = ProxyState.tasks.filter(task => task.id != taskId)
    }
    checkedUpdate(taskId) {
        let index = ProxyState.tasks.findIndex(task => task.id == taskId)
        if (ProxyState.tasks[index].checked == "checked") {
            ProxyState.tasks[index].checked = ""
            alert("...um...she's not going to like that..")
        } else {
            ProxyState.tasks[index].checked = "checked"
            // alert(this.getCongrats())
        }
        ProxyState.tasks = ProxyState.tasks
    }
    getCongrats() {
        generateCongrats()
    }
}
export const tasksService = new TaskService()