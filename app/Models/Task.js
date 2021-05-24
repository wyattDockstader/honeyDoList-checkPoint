import { generateId } from "../Utils/GenerateId.js"

export class Task {
    constructor({ name, id, list, checked }) {
        this.name = name
        this.id = id || generateId()
        this.list = list
        this.checked = checked
    }
}