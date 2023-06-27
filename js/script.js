const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const setData = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const render = function () {
    const toDoData = getData('toDoData');

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

        item.completed ? todoCompleted.append(li) : todoList.append(li);

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;

            setData('toDoData', toDoData);
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(i, 1);

            setData('toDoData', toDoData);
            render();
        });
    });
};

todoControl.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const toDoData = getData('toDoData');

    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        }

        toDoData.push(newToDo);
        setData('toDoData', toDoData);

        render();
    }

    headerInput.value = '';
});

render();