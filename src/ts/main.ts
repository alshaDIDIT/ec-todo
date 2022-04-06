import { Assignment } from "./models/Assignment";

let getList: Assignment[] = JSON.parse(localStorage.getItem("todosList"));
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
    if (getList === null) {
        return;
    }
    for (let i = 0; i < getList.length; i++) {
        toDos.push(getList[i]);
    }
    printList(false, toDos);
    printList(true, toDos);
}

/* 
            PRINTLIST FUNCTION
*/
function printList(isIt: boolean, arr: Assignment[]) {
    for (let i = 0; i < toDos.length; i++) {
        if (arr[i].done == isIt) {
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

    doneUndoButtonFunction(listObject, assignment, liButton);

    if (assignment.done == true) {
        newButton(true, listObject, assignment, liButton);
        return;
    }
        
    newButton(false, listObject, assignment, liButton);
}

/* 
            DONE/UNDO BUTTON FUNCTION LOGIC 
*/
function doneUndoButtonFunction(aDiv: HTMLDivElement, assignment: Assignment, button: HTMLButtonElement) {
    button.onclick = function() {
        if(assignment.done == false) {
            newButton(true, aDiv, assignment, button);
            localStorage.setItem("todosList", JSON.stringify(toDos));
            return;
        }
        newButton(false, aDiv, assignment, button);
        localStorage.setItem("todosList", JSON.stringify(toDos));
    };
}

function newButton(isIt: boolean, aDiv: HTMLDivElement, assignment: Assignment, nButton: HTMLButtonElement) {
    if (isIt == true) {
        nButton.innerHTML = undo;
        nButton.setAttribute("class", "btn btn-dark");
        doneList.appendChild(aDiv);
        assignment.done = true;
        assignment.doneAt = new Date();
        return;
    }
    
    nButton.innerHTML = done;
    nButton.setAttribute("class", "btn btn-success");
    toDoList.appendChild(aDiv);
    assignment.done = false;
    assignment.doneAt = null;
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
    
    let tempList = fillTempList(toDos, false);

    if (tempList.every(isAlphabeticOrder)) {
        tempList.sort((a, b) => b.title.localeCompare(a.title));
        printList(false, tempList);
        return;
    }

    tempList.sort((a, b) => a.title.localeCompare(b.title));
    printList(false, tempList);
}

// SORT TODO DATE ADDED
orderNToDo.onclick = function() {
    toDoList.innerHTML = "";

    let tempList = fillTempList(toDos, false);

    if (tempList.every(isTodoOrder)) {
        tempList.sort((dateA, dateB) => dateB.addedAt.getTime() - dateA.addedAt.getTime());

        printList(false, tempList);
        return;
    }

    tempList.sort((dateA, dateB) => dateA.addedAt.getTime() - dateB.addedAt.getTime());

    printList(false, tempList);
}

// SORT DONE ALPHABETIC
orderADone.onclick = function() {
    doneList.innerHTML = "";

    let tempList = fillTempList(toDos, true);

    if (tempList.every(isAlphabeticOrder)) {
        tempList.sort((a, b) => b.title.localeCompare(a.title));
        printList(true, tempList);
        return;
    } 

    tempList.sort((a, b) => a.title.localeCompare(b.title));
    printList(true, tempList);
    
}

// SORT DONE DATE ADDED
orderNDone.onclick = function() {
    doneList.innerHTML = "";

    let tempList = fillTempList(toDos, true);

    if (tempList.every(isDoneOrder)) {
        tempList.sort((dateA, dateB) => dateB.doneAt.getTime() - dateA.doneAt.getTime());
        printList(true, tempList);
        // console.log(tempList + " b");
        return;
    }
    // console.log(tempList + " a");
    tempList.sort((dateA, dateB) => dateA.doneAt.getTime() - dateB.doneAt.getTime());
    printList(true, tempList);
}

/* 
            FILL TEMPLIST FUNCTION
*/
function fillTempList(oArray: Assignment[], isIt: boolean): Assignment[] {
    let tempList: Assignment[] = [];

    if (oArray == null) {
        return;
    }

    for (let i = 0; i < toDos.length; i++) {
        if (oArray[i].done == isIt) {
            tempList.push(oArray[i]);
        }
    }

    return tempList;
}