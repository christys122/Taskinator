var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
  event.preventDefault();
  
 var taskNameInput = document.querySelector("input[name='task-name']").value;
 var taskTypeInput = document.querySelector("select[name='task-type']").value;
 //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
//create new div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //add the class name
  taskInfoEl.className = "task-info";
  //add content to new div in html
  taskInfoEl.innerHTML = "<h3 class ='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + "</span>";
//append it
  listItemEl.appendChild(taskInfoEl);

// add entire list item to list
  //listItemEl.textContent = taskNameInput;
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
