// note.js
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
        const timerSection = document.getElementById('timer');

        if (timerSection && window.timer) {
            // Scroll to timer
            timerSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Start timer immediately
            window.timer.startTaskTimer(task);
        }
    }

    init() {
        this.setupEventListeners();
        taskStore.subscribe(this.render.bind(this));
        taskStore.loadTasks();
    }

    setupEventListeners() {
        // Listen for custom form submit event
        document.addEventListener('taskFormSubmit', (e) => {
            this.handleFormSubmit(e.detail.formData);
        });

        const addTaskBtn = document.querySelector('[data-action="add-task"]');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.modal.open('create'));
        }
    }

    handleFormSubmit(formData) {
        console.log('Form submitted');
        const task = {
            title: formData.get('task-title'),
            description: formData.get('task-description'),
            priority: formData.get('task-priority'),
            due_date: formData.get('task-due-date')
        };

        console.log('Processed task data:', task);

        const status = formData.get('task-status') || 'ongoing';
        const taskId = formData.get('task-id');

        // Debug validasi
        console.log('Validation check:', {
            hasTitle: Boolean(task.title),
            hasDescription: Boolean(task.description),
            hasDueDate: Boolean(task.due_date),
            hasPriority: Boolean(task.priority),
            isValid: isValid
        });

        try {
            if (taskId) {
                taskStore.updateTask(status, taskId, task);
            } else {
                taskStore.addTask(status, task);
            }
            this.modal.close();
        } catch (error) {
            console.error('Error submitting form:', error);
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
        taskStore.deleteTask(status, taskId);
    }

    handleComplete(taskId) {
        taskStore.moveTask(STATUS.ONGOING, STATUS.DONE, taskId);
    }

    handleReset(taskId) {
        taskStore.moveTask(STATUS.DONE, STATUS.ONGOING, taskId);
    }
}

if (document.getElementById('ongoing-tasks-list')) {
    document.addEventListener('DOMContentLoaded', () => {
        new TaskManager();
    });
}

export default TaskManager;
