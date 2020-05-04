//(function (){ //SELF INVOKED FUNCTION..THE SCRIPT IS SELF INVOKED

let tasksUI = document.querySelector("ul#tasks");
let taskInput = document.querySelector("input#task");
let form = document.querySelector("form#taskForm");
let tasksArray = [];
let clearButton = document.querySelector("button#clear");

populateTasksArray();
getTasks();
addInputDoClickEvents();//load this functions on page load for already set tasks
addRemoveTaskClickEvents();

form.addEventListener("submit", function(e){
    e.preventDefault(); //prevent form from redirect.

    if(taskInput.value != "")tasksArray.push(taskInput.value);
    taskInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasksArray));//set an object in the localStorage converting the tasksArray to string
    getTasks();
    addInputDoClickEvents();
    addRemoveTaskClickEvents();//run this function when a new task is added
});

function getTasks() {
    if(tasksArray.length > 0){
        tasksUI.innerHTML = "";//the list must display a fresh record each time array is called, so must be set to empty
        tasksArray.forEach((task, index) =>{//arrow function..where task is the value of each element in the array
            let li = document.createElement("li");
            li.innerHTML = `<input type = "text" class="form-control w-50" value = "${task}" readonly /> <span class = "removeTask btn btn-sm btn-danger float-right">
            Remove</span>`;
            li.classList.add("list-group-item");//add bootstrp list class
            li.setAttribute("data-id", index);//use the index value of each array element as its unique id, inorder to remove a specific task by calling that id
            tasksUI.appendChild(li);
            //console.log(tasksUI)
        })
    }else{
        tasksUI.textContent = "There are no tasks available";
    }
}

function populateTasksArray(){ //function to get what is stored in local storage into the task array
    if(localStorage.getItem("tasks") != null){
        let tasks = JSON.parse(localStorage.getItem("tasks")) //to convert the stringnified array back to an array and loop out of it
        tasks.forEach(task =>{
            tasksArray.push(task);
        })
    }
}

//TO EDIT THE LIST INPUT FIELD ON DOUBLE CLCK
function addInputDoClickEvents() {
    let inputs = document.querySelectorAll("ul#tasks input[type = 'text']")//get all input fields that are of type text inside the unorderd list
    inputs.forEach(input => {
        input.addEventListener("dblclick", function(e){
            e.target.removeAttribute("readonly");
        });//end event listener
        input.addEventListener("blur", function(e){
            e.target.setAttribute("readonly", true);
        });//end event listener
        input.addEventListener("change", function(e){
            let index = e.target.parentElement.dataset.id; //to get the id ...where li is the parent element that has the index id set to it
            console.log(index);
            tasksArray[index] = e.target.value;//so e been the listener is targeting the tasksArray with the current index(id)
            localStorage.setItem("tasks", JSON.stringify(tasksArray));//resetting the task in the local storage to what user typed in
        })//end event listener
    })//end for each input arrow function
}

function  addRemoveTaskClickEvents() {
    let spans = document.querySelectorAll("ul#tasks span.removeTask");
      spans.forEach(span =>{
          span.addEventListener("click", function(e){
            if(!confirm("confirm delete")) return; //if the remove button is hit show a confirm prompt..if confirm is false, return
            let removeSpan = e.target; //targeting the remove button
            let index = e.target.parentElement.dataset.id;//catch the particular id 
            tasksArray.splice(index, 1);//delete the task in 'index' position 
            localStorage.setItem("tasks", JSON.stringify(tasksArray))//resetting the task in the local storage to return to object 
            removeSpan.parentElement.remove(); //remove the remove button
            location.reload();//reflect change on refresh
          })//end listener
      })//end loop through remove task buttons
}

let clearAllButton = document.querySelector('#clear');
clearButton.addEventListener("click", function(){
    if(!confirm("confirm delete")) return;    
    localStorage.clear();//reset the local storage
    location.reload();
})

//}) ();//end self invoke funtion