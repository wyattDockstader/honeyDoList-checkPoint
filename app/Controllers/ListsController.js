import { ProxyState } from '../AppState.js'
import { listsService } from '../Services/ListsService.js'
import { tasksService } from '../Services/TasksService.js'
import { loadState } from '../Utils/LocalStorage.js'


function _drawList() {
    let lists = ProxyState.lists
    let template = ''


    lists.forEach(list => {
        let tasks = ProxyState.tasks.filter(task => task.list == list.id)
        let taskCount = tasks.length
        let taskDone = tasks.filter(task => task.checked == "").length
        template += /*html */`
        <div class="card col-sm-4 m-2">
            <div class="row card-header he-script"style="background-color:${list.color}">
                <div class="col-10" >
                    <h1>${list.title}
                    <p>${taskDone}/${taskCount}</p>
                    </h1>
                </div>
                <h2 class="mdi mdi-trash-can-outline col-2 text-danger" onclick="app.listsController.deleteList('${list.id}')">
                </h2>
            </div>    
            <div class="card-body row task-count"> `

        tasks.forEach(task => {
            template += /*html*/`
            <div class="col-12">
                <div class="form-check-inline row he-script d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" value="" onchange="app.listsController.checkedUpdate('${task.id}')"${task.checked}>
                    <label class="form-check-label" for="defaultCheck1"><h2>${task.name}</h2></label>
                        <div class="mdi mdi-trash-can-outline col-2 text-danger" onclick="app.listsController.deleteTask('${task.id}')">
                        </div>
                </div>
            </div>
            `
        })
        template += /*html*/`
            </div>
            <div class="row">
                <div class="col-10 ml-2">       
                    <form class= "form-inline" onsubmit="app.tasksController.createTask(event,'${list.id}')">
                        <label class="sr-only" for="task-name">Task Name
                        </label>
                        <input type="text" required minlength="3" maxlength="50" name="taskName" class="form-control" placeholder="Task Name">
                        <button class="btn btn-outline-success" background-color:${list.color}"><b>+</b>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        `
    })

    document.getElementById('lists').innerHTML = template
}
export class ListsController {
    constructor() {
        ProxyState.on('lists', _drawList)
        ProxyState.on('tasks', _drawList)
        loadState()
    }

    createList(event) {
        event.preventDefault()
        let form = event.target
        let newList = {
            title: form.title.value,
            color: form.color.value
        }
        listsService.addList(newList)

    }
    deleteList(listId) {
        if (window.confirm("Do you really want to delete the List?")) {
            listsService.deleteList(listId)
        }
    }
    deleteTask(taskId) {
        if (window.confirm("Do you really want to delete the Task?")) {
            tasksService.deleteTask(taskId)
        }
    }
    checkedUpdate(taskId) {
        tasksService.checkedUpdate(taskId)
    }

}
