
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskFormHandler = function(event) {
  event.preventDefault();

 var taskNameInput = document.querySelector("input[name='task-name']").value;
 var taskTypeInput = document.querySelector("select[name='task-type']").value;
 //package data as an object
 var isEdit = formEl.hasAttribute("data-task-id");
 //has data attribute, get task id and call function to complete edit process
 if (isEdit) {
 var taskId = formEl.getAttribute("data-task-id");
 }
 //no data attribute
 else {
   var taskDataObj = {
     name: taskNameInput,
     type: taskTypeInput
   };
   createTaskEl(taskDataObj);
 }
  completeEditTask(taskNameInput, taskTypeInput, taskId);
 var taskDataObj = {
   name: taskNameInput,
   type: taskTypeInput
 };
 //check if input values are empty strings
 if (!taskNameInput || !taskTypeInput) {
   alert("You need to fill out the task form!");
   return false;
 }
 //reset form fields to add a new task
 formEl.reset();
 //send it as an argument to createTaskEl
 createTaskEl(taskDataObj);
 }
var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //sets new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  alert("task updated!");
  //reset form by removing task id and changing button back to normal
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
}

var createTaskEl = function(taskDataObj) {
//create list item


var listItemEl = document.createElement("li");
listItemEl.className = "task-item";
//add task id as a custom attribute (data-*)
listItemEl.setAttribute("data-task-id", taskIdCounter);


//create new div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
//add the class name
taskInfoEl.className = "task-info";
//add content to new div in html
taskInfoEl.innerHTML = "<h3 class='task-name'>" +taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

//append it
listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);


// add entire list item to list
  //listItemEl.textContent = taskNameInput;
  tasksToDoEl.appendChild(listItemEl);

  // increast task counter by one for the next unique ID
  taskIdCounter++;

};

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  

 //create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

//create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);
//dropdown
var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

//create array and For Loop 
var statusChoices = ["To Do", "In-Progress", "Completed"];
for (var i = 0; i <statusChoices.length; i++) {
//create option element
var statusOptionEl = document.createElement("option");
statusOptionEl.textContent = statusChoices[i];
statusOptionEl.setAttribute("value", statusChoices[i]);
//append to select
statusSelectEl.appendChild(statusOptionEl);
}

actionContainerEl.appendChild(statusSelectEl);


return actionContainerEl;
};
formEl.addEventListener("submit", createTaskFormHandler);

var taskButtonHandler = function(event) {
  //get target element from event
  var targetEl = event.target;
  //edit button was clicked
  if(targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  //delete button is clicked
  else if (event.target.matches(".delete-btn")) {
    //get the elements task id
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

var editTask = function(taskId) {
//get task lit item element
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

//get content from name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
var taskType = taskSelected.querySelector("span.task-type").textContent;

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("date-task-id", taskId);
};
//change event
var taskStatusChangeHandler = function(event) {
  //get the task item's id
var taskId = event.tart.getAttribute("data-task-id");
//get the currently selected ooption's value and convert to lower case
var statusValue =event.tart.value.toLowerCase();
//find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
}
else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);
}
else if (statusValue === "completed") {
  tasksCompletedEl.appendChild(taskSelected);
}
};


pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
