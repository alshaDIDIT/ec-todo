import { Assignment } from "./models/Assignment";

let ass1 = new Assignment("Laundry", false, new Date(), null);
let ass2 = new Assignment("Cleaning", false, new Date(), null);

let toDos: Assignment[] = [ass1, ass2];

let toDoList = document.getElementById("todo-list");

for (let i = 0; i < toDos.length; i++) {
    const toDo = toDos[i];

    let li = document.createElement("li");
    li.innerHTML = toDo.title + " (" + toDo.addedAt + ")";

    let liButton = document.createElement("button");

    toDoList.appendChild(li);
    toDoList.appendChild(liButton);
}