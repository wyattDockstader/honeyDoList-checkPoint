import { tasksService } from "../Services/TasksService.js"

export class TasksController {

    createTask(event, list) {
        event.preventDefault()
        let form = event.target
        let newTask = {
            name: form.taskName.value,
            list: list,
            checked: ""
        }
        tasksService.createTask(newTask)
    }
}