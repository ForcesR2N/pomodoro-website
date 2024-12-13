const tasks = {
    ongoing: [],
    done: []
};

// Render tasks in their respective sections
const renderTasks = () => {
    const ongoingTasksList = document.getElementById('ongoing-tasks-list');
    const doneTasksList = document.getElementById('done-tasks-list');

    ongoingTasksList.innerHTML = '';
    doneTasksList.innerHTML = '';

    tasks.ongoing.forEach(task => ongoingTasksList.appendChild(createTaskCard(task, 'ongoing')));
    tasks.done.forEach(task => doneTasksList.appendChild(createTaskCard(task, 'done')));
};

// Create task card
const createTaskCard = (task, status) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg p-4 mb-3 shadow-sm hover:shadow-md';

    card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium text-gray-900">${task.title}</h3>
            <div class="flex gap-2">
                <button class="text-gray-400 hover:text-gray-600" onclick="openTaskModal('edit', '${status}', ${task.id})">Edit</button>
                <button class="text-gray-400 hover:text-red-600" onclick="deleteTask(${task.id}, '${status}')">Delete</button>
                ${status === 'ongoing' ? `<button class="text-gray-400 hover:text-green-600" onclick="markTaskDone(${task.id})">Done</button>` : ''}
            </div>
        </div>
        <p class="text-sm text-gray-600 mb-2">${task.description}</p>
        <div class="flex justify-between items-center">
            <span class="text-xs text-gray-500">${task.dueDate}</span>
            <span class="text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}">${task.priority}</span>
        </div>
    `;
    return card;
};

// Get priority class for styling
const getPriorityClass = (priority) => {
    switch (priority) {
        case 'HIGH': return 'bg-red-100 text-red-800';
        case 'MEDIUM': return 'bg-orange-100 text-orange-800';
        case 'LOW': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

// Open task modal
const openTaskModal = (mode, status, taskId = null) => {
    const modal = document.getElementById('task-modal');
    const form = document.getElementById('task-form');
    const title = document.getElementById('modal-title');

    if (mode === 'edit') {
        const task = tasks[status].find(t => t.id === taskId);
        title.textContent = 'Edit Task';
        form['task-id'].value = task.id;
        form['task-title'].value = task.title;
        form['task-description'].value = task.description;
        form['task-due-date'].value = task.dueDate;
        form['task-priority'].value = task.priority;
    } else {
        title.textContent = 'Add Task';
        form.reset();
    }

    form['task-status'].value = status;
    modal.classList.remove('hidden');
};

// Close task modal
const closeTaskModal = () => {
    const modal = document.getElementById('task-modal');
    modal.classList.add('hidden');
};

// Delete a task
const deleteTask = (taskId, status) => {
    tasks[status] = tasks[status].filter(task => task.id !== taskId);
    renderTasks();
};

// Mark a task as done
const markTaskDone = (taskId) => {
    const taskIndex = tasks.ongoing.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        const [task] = tasks.ongoing.splice(taskIndex, 1);
        tasks.done.push(task);
    }
    renderTasks();
};

// Handle form submission
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    const task = {
        id: form['task-id'].value || Date.now(),
        title: form['task-title'].value,
        description: form['task-description'].value,
        dueDate: form['task-due-date'].value,
        priority: form['task-priority'].value
    };

    const status = form['task-status'].value;

    if (form['task-id'].value) {
        const index = tasks[status].findIndex(t => t.id === parseInt(task.id));
        tasks[status][index] = task;
    } else {
        tasks[status].push(task);
    }

    closeTaskModal();
    renderTasks();
});

// Initial render
renderTasks();
