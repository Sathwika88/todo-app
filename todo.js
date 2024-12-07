let todos = JSON.parse(localStorage.getItem('todos')) || [];
let completed_array = JSON.parse(localStorage.getItem('completed')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completed', JSON.stringify(completed_array));
}

const todoInput = document.getElementById('todo-input');
const todoButton = document.getElementById('todo-button');
const todoList1 = document.getElementById('todo-list1');
const todoList2 = document.getElementById('todo-list2');

todoButton.addEventListener('click', addTodo);

todoInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        addTodo();
    }
})

function addTodo() {

    const task = todoInput.value.trim();

    if (!task) {
        alert('Please add task');
        return;
    }

    const isDuplicate = todos.some((todo) => todo.text.toLowerCase() === task.toLowerCase());
    if (isDuplicate) {
        alert('Task already exists');
        return;
    }

    todos.push({
        text: task,
        completed: false,
    })
    todoInput.value = "";
    saveTodos();
    displayTodos();
}


function displayTodos() {
    todoList1.innerHTML = "";
    
    todos.forEach((todo, index) => {        
        todoList1.innerHTML += `
        <li> ${todo.text}
            <button class="done" onclick="doneTodos(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </li>
        `;
    });
}

displayTodos();

function displayCompletedTodos() {
    todoList2.innerHTML = "";

    completed_array.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerText = todo.text;

        const undoButton = document.createElement("button");
        undoButton.innerHTML = ` <i class="fa-solid fa-arrow-rotate-left"></i>`;
        undoButton.className = "undo";
        undoButton.onclick = () => {
            undoTodos(index);
        }

        li.appendChild(undoButton);
        todoList2.append(li);
    })
}
displayCompletedTodos();

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    displayTodos();
}

function doneTodos(index) {
    todos[index].completed = true;
    completed_array.push(todos[index]);
    todos.splice(index, 1);
    saveTodos();
    displayTodos();
    displayCompletedTodos();
}

function undoTodos(index) {
    completed_array[index].completed = false;
    todos.push(completed_array[index]);
    completed_array.splice(index, 1);
    saveTodos();
    displayTodos();
    displayCompletedTodos();
}

// let todo = [
//     {text: "cake bake", completed:false},
//     {text:"code", completed:true},
//     {text:"sing", completed:false},
//     {text: "dsnce", completed:true},
// ]

// todo=todo.filter(task=>{
//     if(task.completed)
//     {
//         completed_array.push(task);
//         return false;
//     }
//     return true;
// })
// todo.forEach((task, index)=>{
//     if(task.completed)
//     {
//         completed_array.push(task);
//         todo.splice(index, 1);
//     }
// })

// console.log(completed_array);
// console.log(todo);