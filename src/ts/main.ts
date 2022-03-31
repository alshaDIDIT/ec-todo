import { Assignment } from "./models/Assignment";

let ass1 = new Assignment("Laundry", false, new Date(), null);
let ass2 = new Assignment("Cleaning", false, new Date(), null);

let toDos: Assignment[] = [ass1, ass2];
let toDosD: Assignment[] = [];

let toDoList = document.getElementById("todo-list"); // can't cast HTMLUListElement

for (let i = 0; i < toDos.length; i++) {
    const toDo = toDos[i];
    const done: string = "DONE";

    let li = document.createElement("li");
    li.setAttribute("id", "l" + i.toString());

    let liButton: HTMLButtonElement = document.createElement("button");
    liButton.setAttribute("id", "b" + i.toString());
    liButton.setAttribute("onClick", "assignmentDone()");
    liButton.innerHTML = done;

    liButton.onclick = function() {
        if(toDo.done == false) {
            toDo.done = true;
            li.style.textDecoration = "line-through";
            li.style.color = "green";
            toDo.doneAt = new Date();
            toDosD.push(toDo);
        } else {
            toDo.done = false;
            li.style.textDecoration = "none";
            li.style.color = "black";
            toDo.doneAt = null;
        }

        console.log(toDo.title + " = " + done + " (" + toDo.done + ") " + toDo.doneAt);
    };


    li.innerHTML = toDo.title + " / " + " (" + toDo.addedAt + ")";

    toDoList.appendChild(li);
    toDoList.appendChild(liButton);
}