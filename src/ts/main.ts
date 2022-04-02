import { Assignment } from "./models/Assignment";

let assignment1 = new Assignment("JavaScript", true, new Date("2022-03-22"), new Date("2022-04-01"));
let assignment2 = new Assignment("Avancerad JavaScript", false, new Date("2022-04-22"), null);
let assignment3 = new Assignment("HTML & CSS", true, new Date("2022-02-22"), new Date("2022-03-01"));
let assignment4 = new Assignment("Praktisk databasdesign", true, new Date("2022-01-22"), new Date("2022-02-01"));
let assignment5 = new Assignment("Mobilutveckling med Java", false, new Date("2022-05-22"), null);
let assignment6 = new Assignment("Java web-services", true, new Date("2021-12-22"), new Date("2022-01-01"));

let toDos: Assignment[] = [
    assignment2,
    assignment5
];

let toDones: Assignment[] = [
    assignment1,
    assignment3,
    assignment4,
    assignment6
];

const done: string = "DONE";
const undo: string = "UNDO";

let toDoList: HTMLDivElement = document.getElementById("todo-list") as HTMLDivElement;
let doneList: HTMLDivElement = document.getElementById("done-list") as HTMLDivElement;

let addInput: HTMLInputElement = document.getElementById("add-input") as HTMLInputElement;
let addButton: HTMLButtonElement = document.getElementById("add-button") as HTMLButtonElement;

let orderAToDo: HTMLElement = document.getElementById("order-a-todo") as HTMLElement;
let orderNToDo: HTMLElement = document.getElementById("order-n-todo") as HTMLElement;
let orderADone: HTMLElement = document.getElementById("order-a-done") as HTMLElement;
let orderNDone: HTMLElement = document.getElementById("order-n-done") as HTMLElement;

/*
            INIT CALL FOR LISTS
*/
for (let i = 0; i < toDos.length; i++) {
    const assignment = toDos[i];
    createListObject(assignment);
}

for (let i = 0; i < toDones.length; i++) {
    const doneAssignment = toDones[i];
    createListObject(doneAssignment);
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
}

/* 
            CREATE LIST OBJECT FUNCTION LOGIC
*/
function createListObject(assignment: Assignment) {
    let listObject: HTMLDivElement = document.createElement("div");
    listObject.setAttribute("class", "d-flex list-group-item justify-content-between");

    let title: HTMLHeadElement = document.createElement("h4"); // FRÅGA OM HTMLHeadElement
    title.innerText = assignment.title;

    let liButton: HTMLButtonElement = document.createElement("button");

    listObject.appendChild(title);
    listObject.appendChild(liButton);

    doneUndoButton(listObject, assignment, liButton);

    if (assignment.done == true) {
        liButton.innerHTML = undo;
        liButton.setAttribute("class", "btn btn-dark");
        doneList.appendChild(listObject);
        return;
    }
        
    liButton.innerHTML = done;
    liButton.setAttribute("class", "btn btn-success");
    toDoList.appendChild(listObject);
}

/* 
            DONE/UNDO BUTTON FUNCTION LOGIC 
*/
function doneUndoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    button.onclick = function() {
        if(assignment.done == false) {
            doneButton(aDiv, assignment, button);
            return;
        }
        undoButton(aDiv, assignment, button);    
    };
}

// DONE FUNCTION
function doneButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = true;
    button.setAttribute("class", "btn btn-dark");
    button.innerHTML = undo;
    assignment.doneAt = new Date();
    doneList.appendChild(aDiv);
    toDones.push(assignment);
    toDos.splice(toDos.indexOf(assignment), 1);
}
// UNDO FUNCTION
function undoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = false;
    button.setAttribute("class", "btn btn-success");
    button.innerHTML = done;
    assignment.doneAt = null;
    toDoList.appendChild(aDiv);
    toDos.push(assignment);
    toDones.splice(toDones.indexOf(assignment), 1);
}


/* 
            SORT
*/

// CHECK ALPHABETIC
function isAlphabeticOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }
    else {
      return (el.title.toLowerCase() >= arr[index - 1].title.toLowerCase());
    }
}

// CHECK ADDED DATE
function isTodoOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }
    else {
      return (el.addedAt >= arr[index - 1].addedAt);
    }
}

// CHECK COMPLETED DATE
function isDoneOrder(el: Assignment, index: number, arr: Assignment[]) {
    if (index === 0){
      return true;
    }
    else {
      return (el.title.toLowerCase() >= arr[index - 1].title.toLowerCase());
    }
}

// SORT TODO ALPHABETIC
orderAToDo.onclick = function() {
    toDoList.innerHTML = "";

    if (toDos.every(isAlphabeticOrder)) {
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        for (let i = 0; i < toDos.length; i++) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
    } else {
        toDos.sort((a, b) => a.title.localeCompare(b.title));
        for (let i = 0; i < toDos.length; i++) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
    }
}

// SORT TODO DATE ADDED
orderNToDo.onclick = function() {
    toDoList.innerHTML = "";

    if (toDos.every(isTodoOrder)) {
        toDos.sort((dateA, dateB) => dateB.addedAt.getTime() - dateA.addedAt.getTime());
        for (let i = 0; i < toDos.length; i++) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
    } else {
        toDos.sort((dateA, dateB) => dateA.addedAt.getTime() - dateB.addedAt.getTime());
        for (let i = 0; i < toDos.length; i++) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
    }
}

// SORT DONE ALPHABETIC
orderADone.onclick = function() {
    doneList.innerHTML = "";

    if (toDones.every(isAlphabeticOrder)) {
        toDones.sort((a, b) => b.title.localeCompare(a.title));
        for (let i = 0; i < toDones.length; i++) {
            const assignment = toDones[i];
            createListObject(assignment);
        }
    } else {
        toDones.sort((a, b) => a.title.localeCompare(b.title));
        for (let i = 0; i < toDones.length; i++) {
            const assignment = toDones[i];
            createListObject(assignment);
        }  
    }
}

// SORT DONE DATE ADDED
orderNDone.onclick = function() {
    doneList.innerHTML = "";

    if (toDones.every(isTodoOrder)) {
        toDones.sort((dateA, dateB) => dateB.doneAt.getTime() - dateA.doneAt.getTime());
        for (let i = 0; i < toDones.length; i++) {
            const assignment = toDones[i];
            createListObject(assignment);
        }
    } else {
        toDones.sort((dateA, dateB) => dateA.doneAt.getTime() - dateB.doneAt.getTime());
        for (let i = 0; i < toDones.length; i++) {
            const assignment = toDones[i];
            createListObject(assignment);
        }
    }
}