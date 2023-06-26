const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const getData = function () {
    if (JSON.parse(localStorage.getItem('toDoData'))) {
        toDoData = JSON.parse(localStorage.getItem('toDoData'));
    };

    render();
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `
        <li class="todo-item">
            <span class="text-todo">${item.text}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        </li>`;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(i, 1);
            render();
        })
    });

    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

todoControl.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }

        toDoData.push(newToDo);
        localStorage.setItem('toDoData', JSON.stringify(toDoData));

        render();
    }

    headerInput.value = '';
});

getData();