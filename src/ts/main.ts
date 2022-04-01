import { Assignment } from "./models/Assignment";

let assignment1 = new Assignment("JavaScript", false, new Date(), null);
let assignment2 = new Assignment("Avancerad JavaScript", false, new Date(), null);
let assignment3 = new Assignment("HTML & CSS", true, new Date(), null);
let assignment4 = new Assignment("Praktisk databasdesign", true, new Date(), null);
let assignment5 = new Assignment("Mobilutveckling med Java", false, new Date(), null);
let assignment6 = new Assignment("Java web-services", true, new Date(), null);

let toDos: Assignment[] = [
    assignment1,
    assignment2,
    assignment5
];

let toDones: Assignment[] = [
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
            INIT CALL FOR LIST
*/
for (let i = 0; i < toDos.length; i++) {
    const assignment = toDos[i];
    const doneAssignment = toDones[i];
    createListObject(assignment);
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
/* DONE FUNCTION */
function doneButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = true;
    button.setAttribute("class", "btn btn-dark");
    button.innerHTML = undo;
    assignment.doneAt = new Date();
    doneList.appendChild(aDiv);
    console.log(toDos.indexOf(assignment));
    toDones.push(assignment);
    toDos.splice(toDos.indexOf(assignment), 1);
    console.log(toDos);
    console.log(toDones);
}
/* UNDO FUNCTION */
function undoButton(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    assignment.done = false;
    button.setAttribute("class", "btn btn-success");
    button.innerHTML = done;
    assignment.doneAt = null;
    console.log(toDones.indexOf(assignment));
    toDoList.appendChild(aDiv);
    toDos.push(assignment);
    toDones.splice(toDones.indexOf(assignment), 1);
    
    console.log(toDos);
    console.log(toDones);
}

/* 
            SORT
*/
  
function isAOrder(el,index,arr) {
    // Return true for the first element
    if (index === 0){
      return true;
    }
    else {
    // Compare the value of the previous element
      return (el.title >= arr[index - 1].title);
    }
}

orderAToDo.onclick = function() {
    if (toDos.every(isAOrder)) {
        toDoList.innerHTML = "";
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        for (let i = 0; i < toDos.length; i++) {
            const assignment = toDos[i];
            createListObject(assignment);
        }
        return;
    }
    
    toDoList.innerHTML = "";
    toDos.sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < toDos.length; i++) {
        const assignment = toDos[i];
        createListObject(assignment);
    }    
}

orderADone.onclick = function() {
    if (toDones.every(isAOrder)) {
        doneList.innerHTML = "";
        toDones.sort((a, b) => b.title.localeCompare(a.title));
        for (let i = 0; i < toDones.length; i++) {
            const assignment = toDones[i];
            createListObject(assignment);
        }
        return;
    }
    
    doneList.innerHTML = "";
    toDones.sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < toDones.length; i++) {
        const assignment = toDones[i];
        createListObject(assignment);
    }  
}