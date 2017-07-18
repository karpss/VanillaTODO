//Event handler for form submission
document.getElementById('taskInput').addEventListener('submit', saveTask);
//Define and assign variables and user input values
function saveTask(e) {
    var taskDesc = document.getElementById('taskDesc').value;
    var taskUrgency = document.getElementById('taskUrgency').value;
    var taskHandler = document.getElementById('taskHandler').value;
    //Task ID generated through chance.js
    var taskId = chance.guid();
    var taskStatus = 'Open';

    //New issue object
    var task = {
        id:taskId,
        description:taskDesc,
        urgency:taskUrgency,
        handler:taskHandler,
        status:taskStatus
    }


}
//Get tasks from local storage
function getTasks() {
    //parse the items called from the local storage
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
//loop to iterate over the task items
    for (var i = 0; i < tasks.length; i++) {
        var id = tasks[i].id;
        var desc = tasks[i].description;
        var urgency = tasks[i].urgency;
        var handler = tasks[i].handler;
        var status = tasks[i].status;

        // html for generated output
        taskList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + urgency + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + taskHandler + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}
