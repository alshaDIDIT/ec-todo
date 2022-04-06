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
    printList(toDos, false);
    printList(toDos, true);
}

/* 
            PRINTLIST FUNCTION
*/
function printList(arr: Assignment[], isIt?: boolean) {
    if (isIt) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].done == isIt) {
                const assignment = arr[i];
                createListObject(assignment);
            }
        }
        return;
    }

    if (!isIt) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].done == isIt) {
                const assignment = arr[i];
                createListObject(assignment);
            }
        }
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        const assignment = arr[i];
        createListObject(assignment);
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
            assignment.doneAt = new Date();
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

    if (toDos.every(isAlphabeticOrder)) {
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        printList(toDos, false);
        return;
    }

    toDos.sort((a, b) => a.title.localeCompare(b.title));
    printList(toDos, false);
}

// SORT TODO DATE ADDED
// orderNToDo.onclick = function() {
//     toDoList.innerHTML = "";

//     if (toDos.every(isTodoOrder)) {
//         toDos.sort((dateA, dateB) => dateB.addedAt.getTime() - dateA.addedAt.getTime());

//         printList(toDos, false);
//         return;
//     }

//     toDos.sort((dateA, dateB) => dateA.addedAt.getTime() - dateB.addedAt.getTime());

//     printList(toDos, false);
// }

// SORT DONE ALPHABETIC
orderADone.onclick = function() {
    doneList.innerHTML = "";

    if (toDos.every(isAlphabeticOrder)) {
        toDos.sort((a, b) => b.title.localeCompare(a.title));
        printList(toDos, true);
        return;
    } 

    toDos.sort((a, b) => a.title.localeCompare(b.title));
    printList(toDos, true);
    
}

// SORT DONE DATE ADDED
// orderNDone.onclick = function() {
//     doneList.innerHTML = "";

//     let tempList: Assignment[] = [];

//     fillTempList(toDos, tempList, false);
//     console.log(tempList);

//     if (tempList.every(isDoneOrder)) {
//         tempList.sort((dateA, dateB) => dateB.doneAt.getTime() - dateA.doneAt.getTime());
//         console.log(tempList);
//         printList(tempList, true);
//         console.log(tempList.every(isDoneOrder));
//         return;
//     }
//     tempList.sort((dateA, dateB) => dateA.doneAt.getTime() - dateB.doneAt.getTime());
//     console.log(tempList.every(isDoneOrder));
//     printList(tempList, true);
// }


console.log(toDos);


// OM PARCEL VILL FUNKA
function fillTempList(oArray: Assignment[], tempList: Assignment[], isIt?: boolean) {

    if (oArray == null) {
        return;
    }

    if (isIt) {
        for (let i = 0; i < oArray.length; i++) {
            console.log(1);
            if (oArray[i].done === isIt) {
                tempList.push(oArray[i]);
            }
        }
        return;
    }

    if (!isIt) {
        for (let i = 0; i < oArray.length; i++) {
            if (oArray[i].done != isIt) {
                tempList.push(oArray[i]);
            }
        }
        return;
    }

    for (let i = 0; i < oArray.length; i++) {
        tempList.push(oArray[i]);
    }

}