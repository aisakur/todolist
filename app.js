// app.js

document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById('input-box');
    const todoList = document.getElementById('todo-list');
    const filterTodo = document.querySelector('.filter-todo');
    const addButton = document.querySelector('button');

    addButton.addEventListener('click', addTodo);

    // Load todos from local storage
    loadTodos();

    function addTodo() {
        if (inputBox.value.trim() === '') return;

        const todoItem = createTodoItem(inputBox.value);
        todoList.appendChild(todoItem);

        saveLocalTodos(inputBox.value);

        inputBox.value = '';
    }

    function createTodoItem(text) {
        const todoItem = document.createElement('li');
        todoItem.innerText = text;

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoItem.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoItem.appendChild(deleteButton);

        completeButton.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            updateLocalTodos();
        });

        deleteButton.addEventListener('click', () => {
            todoItem.remove();
            removeLocalTodos(todoItem.innerText);
        });

        return todoItem;
    }

    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(todo => {
            const todoItem = createTodoItem(todo);
            todoList.appendChild(todoItem);
        });
    }

    function removeLocalTodos(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.splice(todos.indexOf(todo), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateLocalTodos() {
        let todos = [];
        todoList.childNodes.forEach(todoItem => {
            if (todoItem.nodeType === 1) {
                todos.push(todoItem.innerText);
            }
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    filterTodo.addEventListener('change', filterTodos);

    function filterTodos(e) {
        const todos = todoList.childNodes;
        todos.forEach(todo => {
            switch (e.target.value) {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'completed':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'uncompleted':
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        });
    }
});
