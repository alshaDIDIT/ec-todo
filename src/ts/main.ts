import { Assignment } from "./models/Assignment";

let ass1 = new Assignment("Laundry", false, new Date(), null);
let ass2 = new Assignment("Cleaning", false, new Date(), null);

let toDos: Assignment[] = [ass1, ass2];

let toDoList: HTMLUListElement = document.getElementById("todo-list") as HTMLUListElement;
let toDoLists: HTMLDivElement = document.getElementById("todo-list") as HTMLDivElement;

for (let i = 0; i < toDos.length; i++) {
    const toDo = toDos[i];
    const done: string = "DONE";
    const undone: string = "UNDO";

    let listObject = document.createElement("div");
    listObject.setAttribute("id", "l" + i.toString());
    listObject.setAttribute("class", "d-flex list-group-item justify-content-between");

    let title: HTMLHeadElement = document.createElement("h3");
    title.innerText = toDo.title;

    let liButton: HTMLButtonElement = document.createElement("button");
    liButton.setAttribute("id", "b" + i.toString());
    liButton.setAttribute("class", "btn btn-primary");
    liButton.innerHTML = done;

    liButton.onclick = function() {
        if(toDo.done == false) {
            toDo.done = true;
            title.style.textDecoration = "line-through";
            liButton.setAttribute("class", "btn btn-dark");
            liButton.innerHTML = undone;
            title.style.color = "green";
            toDo.doneAt = new Date();
        } else {
            toDo.done = false;
            title.style.textDecoration = "none";
            title.style.color = "black";
            liButton.setAttribute("class", "btn btn-primary");
            liButton.innerHTML = done;
            toDo.doneAt = new Date();
        }
    };
    
    listObject.appendChild(title);
    listObject.appendChild(liButton);

    toDoLists.appendChild(listObject);
}

/* for (let i = 0; i < toDos.length; i++) {
    const toDo = toDos[i];
    const done: string = "DONE";
    const undone: string = "UNDO";

    let li = document.createElement("li");
    li.setAttribute("id", "l" + i.toString());
    li.setAttribute("class", "list-group-item");

    let title: HTMLHeadElement = document.createElement("h3");
    title.innerHTML = toDo.title;

    let liButton: HTMLButtonElement = document.createElement("button");
    liButton.setAttribute("id", "b" + i.toString());
    liButton.setAttribute("class", "btn btn-primary");
    liButton.setAttribute("onClick", "assignmentDone()");
    liButton.innerHTML = done;

    liButton.onclick = function() {
        if(toDo.done == false) {
            toDo.done = true;
            li.style.textDecoration = "line-through";
            liButton.setAttribute("class", "btn btn-dark");
            liButton.innerHTML = undone;
            li.style.color = "green";
            toDo.doneAt = new Date();
            li.innerHTML += " (completed: " + toDo.doneAt.toISOString().split('T')[0] + ")";
        } else {
            toDo.done = false;
            li.style.textDecoration = "none";
            li.style.color = "black";
            liButton.setAttribute("class", "btn btn-primary");
            liButton.innerHTML = done;
            toDo.doneAt = new Date();
            li.innerHTML = title + " (added: " + toDo.addedAt.toISOString().split('T')[0] + ")";
        }
    };


    li.innerHTML = title + " (added: " + toDo.addedAt.toISOString().split('T')[0] + ")";

    toDoList.append(li);
    toDoList.append(liButton);
} */