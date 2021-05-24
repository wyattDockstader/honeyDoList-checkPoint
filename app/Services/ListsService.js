import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js"
import { saveState } from "../Utils/LocalStorage.js";

class ListsService {
    constructor() {
        ProxyState.on('lists', saveState)
        ProxyState.on('tasks', saveState)
    }

    addList(newList) {
        ProxyState.lists = [...ProxyState.lists, new List(newList)]
        console.log("new list", ProxyState.lists)
    }
    deleteList(listId) {
        ProxyState.lists = ProxyState.lists.filter(list => list.id != listId)
        ProxyState.tasks = ProxyState.tasks.filter(task => task.list != listId)
        console.log(ProxyState.lists)
    }

}
export const listsService = new ListsService()