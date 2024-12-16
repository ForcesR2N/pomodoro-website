import { taskStore } from '../Store/taskStore.js';

export class Modal {
    constructor() {
        this.modal = document.getElementById('task-modal');
        this.form = document.getElementById('task-form');
        this.submitButton = this.form?.querySelector('button[type="submit"]');
        this.isSubmitting = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });

        if (this.form) {
            this.form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (this.isSubmitting) return;

                try {
                    this.isSubmitting = true;
                    this.submitButton.disabled = true;
                    this.submitButton.innerHTML = 'Saving...';

                    const formData = new FormData(this.form);
                    const rawDate = formData.get('task-due-date');
                    const dateObj = new Date(rawDate);
                    const formattedDate = dateObj.toISOString().split('T')[0];

                    const task = {
                        title: formData.get('task-title'),
                        description: formData.get('task-description'),
                        priority: formData.get('task-priority'),
                        due_date: formattedDate
                    };

                    const status = formData.get('task-status') || 'ongoing';
                    const taskId = formData.get('task-id');

                    let result;
                    if (taskId) {
                        result = await taskStore.updateTask(status, taskId, task);
                    } else {
                        result = await taskStore.addTask(status, task);
                    }

                    if (result !== null) {
                        this.close();
                        this.showNotification('success', taskId ? 'Task updated successfully' : 'Task created successfully');
                    } else {
                        this.close();
                    }

                } catch (error) {
                    console.error('Error submitting form:', error);
                    this.showNotification('error', error.message || 'Failed to save task. Please try again.');
                } finally {
                    this.isSubmitting = false;
                    this.submitButton.disabled = false;
                    this.submitButton.innerHTML = 'Save Task';
                }
            });
        }}

    showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    open(mode = 'create', task = null, status = 'ongoing') {
        const title = document.getElementById('modal-title');
        title.textContent = mode === 'edit' ? 'Edit Task' : 'Add Task';

        if (task) {
            this.form['task-id'].value = task.id;
            this.form['task-title'].value = task.title;
            this.form['task-description'].value = task.description;
            this.form['task-due-date'].value = task.dueDate;
            this.form['task-priority'].value = task.priority;
        } else {
            this.form.reset();
        }

        this.form['task-status'].value = status;
        this.modal.classList.remove('hidden');
        this.form['task-title'].focus();
    }

    close() {
        this.modal.classList.add('hidden');
        this.form.reset();
        this.isSubmitting = false;  // Reset on close
    }
}
