import { generateId } from "../Utils/GenerateId.js"


export class List {
    constructor({ title, color, id, count }) {
        this.title = title
        this.color = color
        this.id = id || generateId()
    }
}