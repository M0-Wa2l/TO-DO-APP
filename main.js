// setting up variables

let theinput = document.getElementById("ban")
let addplus = document.querySelector(".tasks-add .plus");
let taskscont = document.querySelector(".task-content");
let taskscount = document.querySelector(".tasks-count span");
let taskscomp = document.querySelector(".tasks-completed span");
let red = document.getElementById('read');
let clr = document.getElementById('clr');

// focus on field input 

window.onload = function() {
    theinput.focus();
    loadFromStorage();
};

// add task 

addplus.onclick = function() {
    // if input empty
    if(theinput.value === '')
    {
        console.log ("no value");
    } 
    else {

        let notasks = document.querySelector(".no-tasks-message");
        if(document.body.contains(document.querySelector(".no-tasks-message"))){
            // remove tasks message   
            notasks.remove();
        }
        
        // creat elements 
        let mainspan = document.createElement('span');
        let deleteb = document.createElement('span');

        // creat the span text 
        let textin = document.createTextNode(theinput.value);
        let textd = document.createTextNode('Delete');

        // add the text to span
        mainspan.appendChild(textin);
        mainspan.className="task-box";
        // add the text to deletb
        deleteb.appendChild(textd);
        deleteb.className="delete";
        //add delete b to mainspan
        mainspan.appendChild(deleteb);

        // add the task to container 
        taskscont.appendChild(mainspan);

        // add to local storage
        saveToStorage();

        // empty the input 
        theinput.value='';

        theinput.focus();

        calculatetask();

    }
}

// delete task

document.addEventListener('click', function(e){
    // delete
    if(e.target.className =='delete'){
        e.target.parentNode.remove();
        saveToStorage();

        if(taskscont.childElementCount == 0){
            creatnotasks();
        }
    }

 // finsh 

    if(e.target.classList.contains('task-box')){
        e.target.classList.toggle("finished");
    }
    saveToStorage();
    calculatetask();
})

// add message of no tasks 
function creatnotasks(){
let notaskmsg = document.createElement('span');
let textsp = document.createTextNode('No Tasks To Show');

notaskmsg.appendChild(textsp);

notaskmsg.className = 'no-tasks-message';

taskscont.appendChild(notaskmsg);
};

// buttons of mark all and clear all
clr.onclick = function io(){
    taskscont.innerHTML='';
    creatnotasks();
    saveToStorage();
}
red.onclick = function lo(){
    let cam =document.querySelectorAll('.task-box');
    cam.forEach(cam => {
        cam.classList.toggle("finished")
    });
    calculatetask();
}
// function to tasks 
function calculatetask(){
    taskscount.innerHTML = document.querySelectorAll('.task-content .task-box').length;

    taskscomp.innerHTML = document.querySelectorAll('.task-box.finished').length;

}

// local storage 
    function saveToStorage() {
    let allTasks = [];

    document.querySelectorAll('.task-box').forEach(task => {
        allTasks.push({
            text: task.childNodes[0].textContent.trim(),
            completed: task.classList.contains('finished')
        });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
};
function loadFromStorage() {
    let data = JSON.parse(localStorage.getItem("tasks"));

    if (data && data.length > 0) {
        taskscont.innerHTML = "";

        data.forEach(task => {
            let mainspan = document.createElement('span');
            let deleteb = document.createElement('span');

            mainspan.className = "task-box";
            if (task.completed) {
                mainspan.classList.add("finished");
            }

            mainspan.appendChild(document.createTextNode(task.text));

            deleteb.className = "delete";
            deleteb.appendChild(document.createTextNode('Delete'));

            mainspan.appendChild(deleteb);

            taskscont.appendChild(mainspan);
        });
    }

    calculatetask();
}
