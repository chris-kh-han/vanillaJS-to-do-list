
const container = document.querySelector('.container')
const addBtn = document.querySelector('#btn-todo-add');
const textInput = document.querySelector('#todo-text')
const toDoList = document.querySelector('#todos');
const todosCompletedList = document.querySelector('.todos-completed-list')
const deleteAllBtn = document.querySelector('.btn-delete-all');

let todomust;

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        container.classList.add('container-loaded');
        deleteAllBtn.style.display = 'initial';
    }, 1000);
    ;
});

function createToDoList() {
    const ul = document.createElement('ul')
    ul.classList.add('todo-list');
    toDoList.appendChild(ul);
}

createToDoList();

const ul = document.querySelector('.todo-list');

addBtn.addEventListener('click', addToDoListByClick);
textInput.addEventListener('keydown', addToDoListByEnter);

function addToDoListByClick() {
    todomust = textInput.value; 

    if (todomust === '') {
        return;
    }
    
    addToDoList()
    
}

function addToDoListByEnter(e) {
    todomust = textInput.value; 
    if(e.key === "Enter" && todomust !== '') {
        
        addToDoList();
    }
}

function addToDoList() {
    const todos = [...document.querySelectorAll('span')];
    const isSametodo = todos.some(todo => todo.textContent.toLowerCase().replace(/ /gi, "") === todomust.toLowerCase().replace(/ /gi, ""));
    
    if (!isSametodo) {
        const span = document.createElement('span');
        span.append(todomust);
        
        span.addEventListener('click', createCompletedToDo)
        
        textInput.value = '';
    
        const li = document.createElement('li');
        li.classList.add('todo');
    
        const trashBtn = document.createElement('button');
        trashBtn.classList.add('trashBtn');
        trashBtn.innerHTML = '<i class="fas fa-trash-alt" id="removeToDoList"></i>';
    
        li.appendChild(span);
        li.appendChild(trashBtn);
    
        ul.appendChild(li);

        trashBtn.addEventListener('click', removeToDo);

        return;
    }

    alert('You just put same todo!');
    todomust = '';
}

function createCompletedToDo(e) {
    
    const completedToDo = e.target.textContent;
    
    const todosCompleted = [...document.querySelectorAll('.todo-completed')];
    
    const isSameCompletedToDo = todosCompleted.some(todo => {
       return todo.textContent.toLowerCase() === completedToDo.toLowerCase();
    });

    if(!isSameCompletedToDo) {
        e.target.classList.add('todo-completed');
        e.target.parentElement.classList.add('todo-completed-from-list');
        todosCompletedList.innerHTML += `<li class="completed-todo">${completedToDo}</li>`
        return;
    }



}

function removeToDo(e) {    
    const removeList = e.target.parentElement.parentElement;
    removeList.remove();
}

deleteAllBtn.addEventListener('click', deleteAllToDoList);

function deleteAllToDoList() {
    const isLastConfirm = confirm('Are you sure to delete all todo list?');

    if (isLastConfirm) {
        const allToDoList = document.querySelectorAll('.todo');
        allToDoList.forEach(todo => todo.remove());
        const allCompletedToDoList = document.querySelectorAll('.completed-todo').forEach(completedToDO => completedToDO.remove());
    }

    return;
    
}







