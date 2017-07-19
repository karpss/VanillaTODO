//Event handler for form submission
document.getElementById('taskInput').addEventListener('submit', saveTask);
//Define and assign variables and user input values
function saveTask(e) {
    let taskDesc = document.getElementById('taskDesc').value;
    let taskUrgency = document.getElementById('taskUrgency').value;
    let taskHandler = document.getElementById('taskHandler').value;
    //Task ID generated through chance.js
    let taskId = chance.guid();
    let taskStatus = 'Open';

    //New issue object
    let task = {
        id: taskId,
        description: taskDesc,
        urgency: taskUrgency,
        handler: taskHandler,
        status: taskStatus
    };
    //Check and Insert into local storage
    if (localStorage.getItem('tasks') === null) {
        //Initialise empty array
        let tasks = [];
        //Push into array
     tasks.push(task);
        //set issue
        localStorage.setItem('tasks', JSON.stringify(tasks));

    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    //reset input elements
    document.getElementById('taskInput').reset();
    //new elements inserted into local storage, we need to call
    //getTasks() so the list can be regenerated
    getTasks();
    //prevent form from submitting
    e.preventDefault();


}
//Close Status Function
function setClosedStatus(id) {
    //retrieve from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    //Iterate over the array to find if there's a match in order to change status
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === id){
            tasks[i].status = 'Closed'
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();

}
//Function to delete tasks
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++){
        if(tasks[i].id === id){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}
//Get tasks from local storage
function getTasks() {
    //parse the items called from the local storage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
//loop to iterate over the task items
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let desc = tasks[i].description;
        let urgency = tasks[i].urgency;
        let handler = tasks[i].handler;
        let status = tasks[i].status;

        // html for generated output
        taskList.innerHTML += '<div class="well">' +
            '<h6>Task ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + urgency + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + handler + '</p>' +
            '<a href="#" onclick="setClosedStatus(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteTask(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}
