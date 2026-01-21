let taskList=document.getElementById("taskList");
function addTask(){
    let taskInput=document.getElementById("taskInput");
    let taskText= taskInput.value.trim();
    if(taskText===""){
        taskInput.style.border="2px solid red";
        alert("Please enter a task");
        return;
    }
    else{
        taskInput.style.border="1px solid #ccc";
    }

    let li=document.createElement("li");
    li.innerHTML= `<span onclick="toggleComplete(this)">${taskText}</span>
    <div>
    <button onclick="deleteTask(this)">X</button>
    <button onclick="editTask(this)">Edit</button>
    </div>
    `;
    taskList.appendChild(li);
    saveData();
    taskInput.value="";
}
function deleteTask(btn){
    btn.parentElement.parentElement.remove();
    saveData();
}
function toggleComplete(task){
    task.classList.toggle("completed");
    saveData();
}
function editTask(btn){
    let li = btn.parentElement.parentElement;
    let span = li.querySelector("span");
    if(span.classList.contains("completed")){
        alert("completed task cannot be edited");
        return;
    }
    let newTask = prompt("Edit your task", span.innerText);
    if(newTask !== null && newTask.trim()!==""){
        span.innerText= newTask;
        saveData();
    }
}
function saveData(){
    localStorage.setItem("tasks",taskList.innerHTML);
}
function loadData(){
    taskList.innerHTML= localStorage.getItem("tasks") || "";
}
loadData();
document.getElementById("taskInput").addEventListener("keyup",function(e){
    if(e.key==="Enter"){
        addTask();
    }
});
