/*input elements and buttons*/

document.addEventListener('DOMContentLoaded', function() {//triggers event when the content is loaded on page
    /* Input elements and buttons */

    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const completeTask = document.getElementById('CompleteTasks');
    const clearTask = document.getElementById('ClearTasks');
    const todolist = document.querySelector('.toDoList');
    const totalTask = document.querySelector('.TotalTasks');

    //event listeners

    addButton.addEventListener("click", taskAddition);
    completeTask.addEventListener("click", completeTasks);
    clearTask.addEventListener("click", clearList);

    // adding event listener for the keydowm which is only for enter key

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            taskAddition(event);
        }
    });

    //function to add task

    function taskAddition(event){
        
        const taskValue = taskInput.value.trim();
        if(taskValue !== ""){
            const li = document.createElement('li');
            li.innerHTML=`
                <span class="check">&#10003;</span>
                <span>${taskValue}</span>
                <span class="delete">X</span>
            `;
            todolist.appendChild(li);
            /*li.querySelector('.check').addEventListener('click', (event)=>{
                alert(taskValue+" is completed");
                let checkTask = event.target.parentElement;//selecting the paticular list element
                checkTask.classList.toggle("completed");
                updateTotalTask();
                
            });
            li.querySelector('.delete').addEventListener('click', (event)=>{
                alert(taskValue+" deleted succeddfully");
                li.innerHTML="";//removing that task
                updateTotalTask();
            });*/
            li.querySelector('.check').addEventListener('click', markTaskComplete);
            li.querySelector('.delete').addEventListener('click', deleteTask);
            taskInput.value = ""; // Reset input field
            updateTotalTask();//calling updateTotalTask function
        } else {
            alert('Please enter some To Do list item');
        }
    }

    //function for marktask completed

    function markTaskComplete(event) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle("completed");//this will add class name to completed to parentelement
        updateTotalTask();
    }

    //function for delete task
    
    function deleteTask(event) {
        const taskItem = event.target.parentElement;
        taskItem.remove(); // This will remove the taskItem from the DOM
        updateTotalTask();
    }



    //CompleteAll Tasks function

    function completeTasks(){
        alert('All tasks are completed');
        console.log(todolist.children);
        const task = todolist.children;
        for(let tasks of task){ // loop to iterate over the children of the todoList 
             tasks.classList.toggle("completed");
        }
        updateTotalTask();
        
    }
    
    //clearList function 

    function clearList(){
        todolist.innerHTML=""; // clearing the complete todo list
        updateTotalTask();
    }

    //update total function

    function updateTotalTask(){
        const totalTasks = todolist.children.length;
        const completedTasks = todolist.querySelectorAll(".completed").length;
        let totalTaskLeft = totalTasks - completedTasks;
        totalTask.textContent = `${totalTaskLeft} tasks left out of ${totalTasks} tasks`;

    }
});