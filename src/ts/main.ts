import { Assignment } from "./models/Assignment";

let assignment1 = new Assignment("Laundry", false, new Date(), null);
let assignment2 = new Assignment("Cleaning", false, new Date(), null);

let toDos: Assignment[] = [assignment1, assignment2];

const done: string = "DONE";
const undone: string = "UNDO";

let toDoList: HTMLDivElement = document.getElementById("todo-list") as HTMLDivElement;
let doneList: HTMLDivElement = document.getElementById("done-list") as HTMLDivElement;

let addInput: HTMLInputElement = document.getElementById("add-input") as HTMLInputElement;
let addButton: HTMLButtonElement = document.getElementById("add-button") as HTMLButtonElement;

/* INIT CALL FOR LIST */
for (let i = 0; i < toDos.length; i++) {
    const assignment = toDos[i];
    createListObject(assignment)
}

/* ADD BUTTON FUNCTION LOGIC */
addButton.onclick = function() {
    if (addInput.value === "") {
        alert("Add some text");
    }

    let assignment: Assignment = new Assignment(addInput.value, false, new Date(), null);
    toDos.push(assignment);
    
    createListObject(assignment);
    addInput.value = "";
}

/* CREATE LIST OBJECT FUNCTION LOGIC */
function createListObject(assignment: Assignment) {
    let listObject = document.createElement("div");
    listObject.setAttribute("class", "d-flex list-group-item justify-content-between");

    let title: HTMLHeadElement = document.createElement("h4");
    title.innerText = assignment.title;

    let liButton: HTMLButtonElement = document.createElement("button");
    liButton.setAttribute("class", "btn btn-success");
    liButton.innerHTML = done;

    listObject.appendChild(title);
    listObject.appendChild(liButton);

    doneUndoButton(listObject, assignment, liButton);

    toDoList.appendChild(listObject);
}

/* DONE/UNDO BUTTON FUNCTION LOGIC */
function doneUndoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    button.onclick = function() {
        if(assignment.done == false) {
            doneButton(aDiv, assignment, button);
            return;
        }
        undoButton(aDiv, assignment, button);    
    };
}
/* DONE FUNCTION */
function doneButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = true;
    button.setAttribute("class", "btn btn-dark");
    button.innerHTML = undone;
    assignment.doneAt = new Date();
    doneList.appendChild(aDiv);
}
/* UNDO FUNCTION */
function undoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = false;
    button.setAttribute("class", "btn btn-success");
    button.innerHTML = done;
    assignment.doneAt = null;
    toDoList.appendChild(aDiv);
}