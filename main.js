let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
//
let arrayOfTasks = [];
//
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
//
getDataFromLocalStorage();

//
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //
    input.value = ""; //
  }
};
//
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    //
    e.target.parentElement.remove();
    //
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
});
//
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //
  arrayOfTasks.push(task);
  //
  addElementsToPageFrom(arrayOfTasks);
  //
  addDataToLocalStorageFrom(arrayOfTasks);
}
//
function addElementsToPageFrom(arrayOfTasks) {
  //
  tasksDiv.innerHTML = "";
  //
  arrayOfTasks.forEach((task) => {
    //
    let div = document.createElement("div");
    div.className = "task";
    //
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));
    div.appendChild(p);

    let trash = document.createElement("div");
    trash.className = "del";
    trash.appendChild(document.createTextNode("Delete"))
    div.appendChild(trash);
    //
    tasksDiv.appendChild(div);
  });
}
//
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
//
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
