import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js";
import { Task } from "../Models/Task.js";


export function saveState() {
    localStorage.setItem('StorLists', JSON.stringify({
        lists: ProxyState.lists,
        tasks: ProxyState.tasks
    }))
    console.log('saved state', ProxyState)
}

export function loadState() {
    let data = JSON.parse(localStorage.getItem('StorLists'))
    console.log(data)
    if (data != null) {
        ProxyState.lists = data.lists.map(list => new List(list))
        ProxyState.tasks = data.tasks.map(task => new Task(task))
    }
}