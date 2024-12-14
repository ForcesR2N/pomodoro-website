export class Modal {
    constructor() {
        this.modal = document.getElementById('task-modal');
        this.form = document.getElementById('task-form');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
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
    }
}
