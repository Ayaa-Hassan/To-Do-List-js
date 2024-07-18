//!================HTML Elements=========================
const root = document.querySelector(":root");
const body = document.body;
const newAddBtn = document.getElementById('newTask');
const model = document.getElementById('model');
const statusInput = document.getElementById('status');
const categoryInput = document.getElementById('category');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const addTaskBtn = document.getElementById('addBtn');
const modeBtn = document.getElementById("mode");
const sections = document.querySelectorAll("section");
const gridBtn = document.getElementById("gridBtn");
const barsBtn = document.getElementById("barsBtn");
const tasksContainer = document.querySelectorAll(".tasks");


const nextUpCountElement = document.getElementById("nextUpCount");
const inProgressCountElement = document.getElementById("inProgressCount");
const doneCountElement = document.getElementById("doneCount");

const searchInput = document.getElementById("searchInput");



const remainingCounterElement = document.getElementById("remainingCounter");



const nextUpTasksContainer = document.getElementById("toDo");
const inProgressTasksContainer = document.getElementById("inProgress");
const doneTasksContainer = document.getElementById("done");





// const container = {
//     nextUp: document.getElementById("toDo"),
//     inProgress: document.getElementById("inProgress"),
//     done: document.getElementById("done"),
// }


//^================App Variables====================
let taskArr = JSON.parse(localStorage.getItem('tasks')) || [];
let updateIndex = 0;

let nextUpCount = 0;
let inProgressCount = 0;
let doneCount = 0;
let remainingCounter = 100;


for (let i = 0; i < taskArr.length; i++) {
    displayTask(i);
    
}
// ^=====> Regular Expressions
const titleRegex = /^\w{3,}(\s\w+)*$/;
const descriptionRegex = /^(?=.{5,100}$)\w{1,}(\s\w*)*$/;




//?==================Functions====================
function showModel() {
    model.classList.replace('d-none', 'd-flex');
    scroll(0, 0);
    body.style.overflow = "hidden";

}
function hideModel() {
    model.classList.replace('d-flex', 'd-none');
    body.style.overflow = "auto";
    resetInput();
    addBtn.innerHTML = "Add Task";
    addBtn.classList.remove("btn-update");
    addBtn.classList.add("btn-new-task");;

}

function addTask() {
    if (
        validate(titleRegex, titleInput) &&
        validate(descriptionRegex, descriptionInput)
    ) {
        if (addBtn.innerHTML.trim() == "Add Task") {
    let task = {
        title: titleInput.value,
        description: descriptionInput.value,
        status: statusInput.value,
        category: categoryInput.value,
    }
    taskArr.push(task);
     saveTasksToLocal();
    displayTask(taskArr.length - 1)
    hideModel();
    resetInput()
        } else if (addBtn.innerHTML == "Update Task") {
            updateTask(updateIndex);
        }
    }
    


}

function displayTask(index) {
     taskHTML = `
    <div class="task">
        <h3 class="text-capitalize">${taskArr[index]?.title}</h3>
        <p class="description text-capitalize">${taskArr[index]?.description}</p>
        <h4 class="category ${taskArr[index]?.category} text-capitalize">${taskArr[index]?.category}</h4>
        <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
          <li><i class="bi bi-pen fs-5" onclick="getTaskInfo(${index})"></i></li>
          <li><i class="bi bi-trash3" onclick="deleteTask(${index})"></i></li>
          <li><i class="bi bi-paint-bucket" onclick="changeColor(event)"></i></li>
        </ul>
    </div>
    `
    // container[taskArr[index].status].innerHTML += taskHTML;
    setHTMLocation(taskArr[index]?.status);
    
}
function setHTMLocation(status) {
    switch (status) {
        case "nextUp":
            nextUpTasksContainer.innerHTML += taskHTML;
            nextUpCount++;
            nextUpCountElement.innerHTML = nextUpCount;
            break;
        case "inProgress":
            inProgressTasksContainer.innerHTML += taskHTML;
            inProgressCount++;
            inProgressCountElement.innerHTML = inProgressCount;
            break;
        case "done":
            doneTasksContainer.innerHTML += taskHTML;
            doneCount++;
            doneCountElement.innerHTML = doneCount;
            break;
    }
}
function saveTasksToLocal() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function deleteTask(index) {
   
    taskArr.splice(index, 1)
    saveTasksToLocal();
    emptyContainer()
    for (let i = 0; i < taskArr.length; i++) {
        displayTask(i);

    }
}

function getTaskInfo(index) {
    showModel();
    statusInput.value = taskArr[index].status;
    categoryInput.value = taskArr[index].category;
    titleInput.value = taskArr[index].title;
    descriptionInput.value = taskArr[index].description;

    addBtn.innerHTML = "Update Task";
    addBtn.classList.remove("btn-new-task");
    addBtn.classList.add("btn-update-task");
  
    updateIndex = index;

}


function updateTask() {
    taskArr[updateIndex].status = statusInput.value;
    taskArr[updateIndex].category = categoryInput.value;
    taskArr[updateIndex].title = titleInput.value;
    taskArr[updateIndex].description = descriptionInput.value;

    saveTasksToLocal();
    emptyContainer();
    resetCount();
    for (let i = 0; i < taskArr.length; i++) {
        displayTask(i);

    }

    resetInput();
    addBtn.innerHTML = "Add Task";
    addBtn.classList.remove("btn-update-task");
    addBtn.classList.add("btn-new-task");
    hideModel();

}


function generateColor() {
    let colorChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#';
    for (let i = 0; i < 6; i++) {
        let random = Math.trunc(Math.random() * colorChars.length)
        color += colorChars[random];
    }
    
    return color +'22'
}

function changeColor(e) {
   
    e.target.closest(".task").style.backgroundColor = generateColor();
    
   
}

function searchTask() {
    emptyContainer();
    resetCount();
    var searchKey = searchInput.value;
    for (var i = 0; i < taskArr.length; i++) {
        if (
            taskArr[i].title.toLowerCase().includes(searchKey.toLowerCase()) ||
            taskArr[i].category.toLowerCase().includes(searchKey.toLowerCase())
        ) {
            displayTask(i);
        }
    }
}

function emptyContainer() {
    nextUpTasksContainer.innerHTML = "";
    inProgressTasksContainer.innerHTML = "";
    doneTasksContainer.innerHTML = "";
    
}


function resetCount() {
    nextUpCount = 0;
    inProgressCount = 0;
    doneCount = 0;
    nextUpCountElement.innerHTML = nextUpCount;
    inProgressCountElement.innerHTML = inProgressCount;
    doneCountElement.innerHTML = doneCount;
}



function resetInput() {
    statusInput.value = 'nextUp';
    categoryInput.value = 'education';
    titleInput.value = ''
    descriptionInput.value=''
    
}

function changeMode() {
    if (modeBtn.dataset.mode == "night") {
        root.style.setProperty('--main-dark', '#fff');
        root.style.setProperty('--sec-dark', '#a8e6cf');
        root.style.setProperty('--active-text-color', '#1470a9');
        root.style.setProperty('--text-color', '#1da1f2');
        modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
        modeBtn.dataset.mode = "light";
    } else if (modeBtn.dataset.mode == "light") {
        root.style.setProperty("--main-dark", "#15202b");
        root.style.setProperty("--sec-dark", "#192734");
        root.style.setProperty("--text-color", "#fff");
        root.style.setProperty('--active-text-color', '#1da1f2');
        modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
        modeBtn.dataset.mode = "night";
    }





  
    
}

function changeToBars() {
    gridBtn.classList.remove("active");
    barsBtn.classList.add("active");

    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove("col-md-6", "col-lg-4");
        sections[i].style.overflow = "auto";
    }

    for (var j = 0; j < tasksContainer.length; j++) {
        tasksContainer[j].setAttribute("data-view", "bars");
    }
}

function changeToGrid() {
    barsBtn.classList.remove("active");
    gridBtn.classList.add("active");

    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.add("col-md-6", "col-lg-4");
    }

    for (var j = 0; j < tasksContainer.length; j++) {
        tasksContainer[j].removeAttribute("data-view");
    }
}


function validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        element.parentElement.nextElementSibling.classList.replace("d-block","d-none");
       
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.parentElement.nextElementSibling.classList.replace("d-none","d-block");
        
    }

    return regex.test(element.value);
}










//&==================Events=========================
newAddBtn.addEventListener("click", showModel);
addTaskBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", searchTask);
modeBtn.addEventListener('click', changeMode);
barsBtn.addEventListener("click", changeToBars);
gridBtn.addEventListener("click", changeToGrid);





document.addEventListener("keydown", function (e) {
    if (e.key === 'Escape') {
        hideModel();
    }
    
});

model.addEventListener("click", function (e) {
    if (e.target.id=='model') {
        hideModel();
        }
    
})


titleInput.addEventListener("input", function () {
    validate(titleRegex, titleInput);
});

descriptionInput.addEventListener("input", function () {
    validate(descriptionRegex, descriptionInput);
    remainingCounter = 100 - descriptionInput.value.split("").length;
    remainingCounterElement.innerHTML = remainingCounter;
});