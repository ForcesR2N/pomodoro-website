import { taskStore } from './Store/taskStore';
import { TaskCard } from './Utils/taskCard';
import { Modal } from './Utils/modal';
import { STATUS } from './Store/constants';

class TaskManager {
    constructor() {
        if (typeof window !== 'undefined') {
            this.modal = new Modal();
            this.init();
            // Make it globally accessible
            window.taskManager = this;
        }
    }

    init() {
        this.setupEventListeners();
        taskStore.subscribe(this.render.bind(this));
        this.render(taskStore.tasks);
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('task-form')?.addEventListener('submit', this.handleFormSubmit.bind(this));

        // Add task button
        const addTaskBtn = document.querySelector('[data-action="add-task"]');
        addTaskBtn?.addEventListener('click', () => this.modal.open('create'));

        // Global click handler for task actions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.options-btn')) {
                document.querySelectorAll('.options-menu').forEach(menu => {
                    menu.classList.add('hidden');
                });
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const task = {
            title: formData.get('task-title'),
            description: formData.get('task-description'),
            dueDate: formData.get('task-due-date'),
            priority: formData.get('task-priority')
        };

        const status = formData.get('task-status');
        const taskId = formData.get('task-id');

        try {
            if (taskId) {
                taskStore.updateTask(status, taskId, task);
            } else {
                taskStore.addTask('ongoing', task);
            }
            this.modal.close();
        } catch (error) {
            alert(error.message);
        }
    }

    render(tasks) {
        ['ongoing', 'done'].forEach(status => {
            const container = document.getElementById(`${status}-tasks-list`);
            if (!container) return;

            container.innerHTML = '';
            const taskList = tasks[status] || [];

            if (taskList.length === 0) {
                container.innerHTML = `
                    <div class="flex items-center justify-center h-32 text-gray-400">
                        <p>No tasks yet</p>
                    </div>
                `;
                return;
            }

            taskList.forEach(task => {
                const card = TaskCard.create(task, status, {
                    onEdit: this.handleEdit.bind(this),
                    onDelete: this.handleDelete.bind(this),
                    onComplete: this.handleComplete.bind(this)
                });
                container.appendChild(card);
            });
        });
    }

    handleEdit(task, status) {
        this.modal.open('edit', task, status);
    }

    handleDelete(taskId, status) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskStore.deleteTask(status, taskId);
        }
    }

    handleComplete(taskId) {
        taskStore.moveTask(STATUS.ONGOING, STATUS.DONE, taskId);
    }
}

// Initialize if we're on the notes page
if (document.getElementById('ongoing-tasks-list')) {
    new TaskManager();
}

export default TaskManager;
