import { Assignment } from "./models/Assignment";

let tempList: Assignment[] = JSON.parse(localStorage.getItem("todosList"));
let toDos: Assignment[] = [];

const done: string = "DONE";
const undo: string = "UNDO";

let toDoList: HTMLDivElement = document.getElementById("todo-list") as HTMLDivElement;
let doneList: HTMLDivElement = document.getElementById("done-list") as HTMLDivElement;

let addInput: HTMLInputElement = document.getElementById("add-input") as HTMLInputElement;
let addButton: HTMLButtonElement = document.getElementById("add-button") as HTMLButtonElement;

let orderAToDo: HTMLDivElement = document.getElementById("order-a-todo") as HTMLDivElement;
let orderNToDo: HTMLDivElement = document.getElementById("order-n-todo") as HTMLDivElement;
let orderADone: HTMLDivElement = document.getElementById("order-a-done") as HTMLDivElement;
let orderNDone: HTMLDivElement = document.getElementById("order-n-done") as HTMLDivElement;

/*
            INIT CALL FOR LISTS
*/
initList();

function initList() {
    if (tempList === null) {
        return;
    }
    for (let i = 0; i < tempList.length; i++) {
        toDos.push(tempList[i]);
    }
    printList(false);
    printList(true);
}

/* 
            PRINTLIST FUNCTION
*/
function printList(isIt: boolean) {
    for (let i = 0; i < toDos.length; i++) {
        if (toDos[i].done == isIt) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
    }
}

/* 
            ADD BUTTON FUNCTION LOGIC
*/
addButton.onclick = function() {
    if (addInput.value === "") {
        alert("Add some text");
        return;
    }

    let assignment: Assignment = new Assignment(addInput.value, false, new Date(), null);
    toDos.push(assignment);
        
    createListObject(assignment);
    addInput.value = "";
    localStorage.setItem("todosList", JSON.stringify(toDos));
}

/* 
            CREATE LIST OBJECT FUNCTION LOGIC
*/
function createListObject(assignment: Assignment) {
    let listObject: HTMLDivElement = document.createElement("div");
    listObject.setAttribute("class", "d-flex list-group-item justify-content-between");

    let title: HTMLHeadingElement = document.createElement("h4");
    title.innerText = assignment.title;

    let liButton: HTMLButtonElement = document.createElement("button");

    listObject.appendChild(title);
    listObject.appendChild(liButton);

    doneUndoButton(listObject, assignment, liButton);

    if (assignment.done == true) {
        newButton(true, liButton, listObject);
        return;
    }
        
    newButton(false, liButton, listObject);
}

/* 
            DONE/UNDO BUTTON FUNCTION LOGIC 
*/
function doneUndoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    button.onclick = function() {
        if(assignment.done == false) {
            doneButton(aDiv, assignment, button);
            localStorage.setItem("todosList", JSON.stringify(toDos));
            return;
        }
        undoButton(aDiv, assignment, button);
        localStorage.setItem("todosList", JSON.stringify(toDos));
    };
}

function newButton(isIt: boolean, nButton: HTMLButtonElement, aDiv: HTMLDivElement) {
    if (isIt == true) {
        nButton.innerHTML = undo;
        nButton.setAttribute("class", "btn btn-dark");
        doneList.appendChild(aDiv);
        return;
    }
    
    nButton.innerHTML = done;
    nButton.setAttribute("class", "btn btn-success");
    toDoList.appendChild(aDiv);
}


// DONE FUNCTION
function doneButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    newButton(true, button, aDiv);
    assignment.done = true;
    assignment.doneAt = new Date();
}
// UNDO FUNCTION
function undoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    newButton(false, button, aDiv);
    assignment.done = false;
    assignment.doneAt = null;
    // toDos.splice(toDos.indexOf(assignment), 1);
}

/* 
            SORT
*/

// CHECK ALPHABETIC
function isAlphabeticOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }
    
    return (el.title.toLowerCase() >= arr[index - 1].title.toLowerCase());
}

// CHECK ADDED DATE
function isTodoOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }

    return (el.addedAt >= arr[index - 1].addedAt);
}

// CHECK COMPLETED DATE
function isDoneOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }

    return (el.doneAt >= arr[index - 1].doneAt);
}

// SORT TODO ALPHABETIC
orderAToDo.onclick = function() {
    toDoList.innerHTML = "";

    if (toDos.every(isAlphabeticOrder)) {
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        printList(false);
        return;
    }

    toDos.sort((a, b) => a.title.localeCompare(b.title));
    printList(false);
}

// SORT TODO DATE ADDED
orderNToDo.onclick = function() {
    toDoList.innerHTML = "";

    if (toDos.every(isTodoOrder)) {
        toDos.sort((dateA, dateB) => dateB.addedAt.getTime() - dateA.addedAt.getTime());

        printList(false);
        return;
    }

    toDos.sort((dateA, dateB) =>
        dateA.addedAt.getTime() - dateB.addedAt.getTime());

    printList(false);
}

// SORT DONE ALPHABETIC
orderADone.onclick = function() {
    doneList.innerHTML = "";

    if (toDos.every(isAlphabeticOrder)) {
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        printList(true);
        return;
    } 

    toDos.sort((a, b) => a.title.localeCompare(b.title));
    printList(true);
    
}

// SORT DONE DATE ADDED
orderNDone.onclick = function() {
    doneList.innerHTML = "";

    if (toDos.every(isDoneOrder)) {
        toDos.sort((dateA, dateB) => {
            if (dateA.doneAt != null && dateB.doneAt != null) {
                return dateB.doneAt.getTime() - dateA.doneAt.getTime();
            }
        });
        printList(true);
        return;
    }

    toDos.sort((dateA, dateB) => {
    if (dateA.doneAt != null && dateB.doneAt != null) {
        return dateA.doneAt.getTime() - dateB.doneAt.getTime();
    }
    });
    printList(true);
}


console.log(toDos);