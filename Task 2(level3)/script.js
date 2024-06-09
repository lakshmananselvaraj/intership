document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('new-task').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const timestamp = new Date().toLocaleString();
    const taskItem = createTaskItem(taskText, timestamp, false);
    document.getElementById('pending-tasks').appendChild(taskItem);
    taskInput.value = '';
}

function createTaskItem(text, timestamp, isCompleted) {
    const li = document.createElement('li');
    li.className = isCompleted ? 'completed' : 'pending';

    const taskText = document.createElement('span');
    taskText.textContent = `${text} (Added: ${timestamp})`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = isCompleted ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => toggleTaskCompletion(li, taskText, completeBtn));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTask(taskText));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(li));

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(actions);

    return li;
}

function toggleTaskCompletion(taskItem, taskText, completeBtn) {
    const isCompleted = taskItem.classList.contains('completed');
    if (isCompleted) {
        taskItem.classList.remove('completed');
        taskItem.classList.add('pending');
        document.getElementById('pending-tasks').appendChild(taskItem);
        completeBtn.textContent = 'Complete';
        const newTimestamp = new Date().toLocaleString();
        taskText.textContent = taskText.textContent.replace`(/(Completed: .*)/, (Added: ${newTimestamp}));`
    } else {
        taskItem.classList.remove('pending');
        taskItem.classList.add('completed');
        document.getElementById('completed-tasks').appendChild(taskItem);
        completeBtn.textContent = 'Undo';
        const newTimestamp = new Date().toLocaleString();
        taskText.textContent += ` (Completed: ${newTimestamp})`;
    }
}

function editTask(taskText) {
    const newText = prompt('Edit your task', taskText.textContent.split(' (')[0]);
    if (newText !== null && newText.trim() !== '') {
        taskText.textContent = taskText.textContent.replace(/^.*(?= \(Added: )/, newText);
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
}