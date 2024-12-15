import { taskStore } from './Store/taskStore';
import { TaskCard } from './Utils/taskCard';
import { Modal } from './Utils/modal';
import { STATUS } from './Store/constants';

class TaskManager {
    constructor() {
        if (typeof window !== 'undefined') {
            this.modal = new Modal();
            this.timer = window.timer;
            this.init();
            window.taskManager = this;
        }
    }

    handleStartTask(task) {
        if (this.timer) {
            this.timer.startTaskTimer(task);
        }
    }

    init() {
        this.setupEventListeners();
        taskStore.subscribe(this.render.bind(this));
        this.render(taskStore.tasks);
    }

    setupEventListeners() {
        document.getElementById('task-form')?.addEventListener('submit', this.handleFormSubmit.bind(this));
        const addTaskBtn = document.querySelector('[data-action="add-task"]');
        addTaskBtn?.addEventListener('click', () => this.modal.open('create'));

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.options-btn')) {
                document.querySelectorAll('.task-actions').forEach(menu => {
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
                    <div class="text-center">
                        <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-gray-400">No ${status} tasks yet</p>
                    </div>
                `;
                return;
            }

            taskList.forEach(task => {
                const taskCard = TaskCard.create(task, status, {
                    onEdit: this.handleEdit.bind(this),
                    onDelete: this.handleDelete.bind(this),
                    onComplete: this.handleComplete.bind(this),
                    onReset: this.handleReset.bind(this),
                    onStartTask: this.handleStartTask.bind(this)
                });
                container.appendChild(taskCard);
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

    handleReset(taskId) {
        taskStore.moveTask(STATUS.DONE, STATUS.ONGOING, taskId);
    }
}

if (document.getElementById('ongoing-tasks-list')) {
    new TaskManager();
}

export default TaskManager;
