// taskCard.js
import { PRIORITY_CLASSES } from '../Store/constants';
import { confirmationDialog } from './confirmationDialog';

export class TaskCard {
    static formatDate(dateString) {
        try {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    }

    static create(task, status, handlers) {
        const card = document.createElement('div');
        card.className = 'task-card bg-white rounded-lg shadow p-4 relative';
        card.setAttribute('data-task-id', task.id);

        const checkboxHtml = status === 'ongoing' ? `
            <div class="pt-1">
                <input type="checkbox" class="task-checkbox" ${status === 'done' ? 'checked' : ''}>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="flex items-start gap-3">
                ${checkboxHtml}
                <div class="flex-1">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="text-gray-900 ${status === 'done' ? 'line-through' : ''}">${task.title}</h3>
                            <p class="text-sm text-gray-500">${task.description}</p>
                        </div>
                        <button class="options-btn p-1 hover:bg-gray-100 rounded">
                            <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <div class="task-actions hidden absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                            ${status === 'ongoing' ? `
                                <button class="start-task-btn block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100">
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        </svg>
                                        Kerjakan Tugas Ini
                                    </div>
                                </button>
                            ` : ''}
                            <button class="edit-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Edit
                            </button>
                            ${status === 'done' ? `
                                <button class="incomplete-btn block w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-gray-100">
                                    Mark as Incomplete
                                </button>
                            ` : ''}
                            <button class="delete-btn block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div class="mt-2 flex items-center gap-2">
                        <span class="text-sm text-gray-500">${this.formatDate(task.due_date)}</span>
                        <span class="text-xs px-2 py-0.5 rounded-full ${PRIORITY_CLASSES[task.priority]}">
                            ${task.priority.toLowerCase()}
                        </span>
                    </div>
                </div>
            </div>
        `;

        this.attachHandlers(card, task, status, handlers);
        return card;
    }

    static attachHandlers(card, task, status, handlers) {
        if (card.hasAttribute('handlers-attached')) return;
        card.setAttribute('handlers-attached', 'true');

        const optionsBtn = card.querySelector('.options-btn');
        const actionsMenu = card.querySelector('.task-actions');
        let isDeleting = false; // Add flag to prevent multiple delete attempts

        if (optionsBtn && actionsMenu) {
            optionsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.task-actions').forEach(menu => {
                    if (menu !== actionsMenu) menu.classList.add('hidden');
                });
                actionsMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!card.contains(e.target)) {
                    actionsMenu.classList.add('hidden');
                }
            });
        }

        // Checkbox handler for ongoing tasks
        if (status === 'ongoing') {
            const checkbox = card.querySelector('.task-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        confirmationDialog.show({
                            type: 'warning',
                            title: 'Complete Task',
                            message: 'Are you sure you want to mark this task as complete?',
                            confirmText: 'Complete',
                            onConfirm: () => {
                                card.classList.add('completing');
                                setTimeout(() => {
                                    handlers.onComplete(task.id);
                                }, 300);
                            },
                            onCancel: () => {
                                checkbox.checked = false;
                            }
                        });
                    }
                });
            }

            // Start task button handler
            const startTaskBtn = card.querySelector('.start-task-btn');
            if (startTaskBtn) {
                startTaskBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    actionsMenu.classList.add('hidden');

                    confirmationDialog.show({
                        type: 'info',
                        title: 'Start Task',
                        message: 'Do you want to start working on this task?',
                        confirmText: 'Start Timer',
                        confirmButtonClass: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
                        onConfirm: () => handlers.onStartTask(task)
                    });
                });
            }
        }

        // Edit button handler
        const editBtn = card.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                actionsMenu.classList.add('hidden');

                confirmationDialog.show({
                    type: 'edit',
                    title: 'Edit Task',
                    message: 'Do you want to edit this task?',
                    confirmText: 'Edit',
                    onConfirm: () => handlers.onEdit(task, status)
                });
            });
        }

        const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            try {
                actionsMenu?.classList.add('hidden');

                confirmationDialog.show({
                    type: 'delete',
                    title: 'Delete Task',
                    message: 'Are you sure you want to delete this task?',
                    confirmText: 'Delete',
                    async onConfirm() {
                        try {
                            // Start animation immediately
                            card.style.transition = 'all 0.3s ease-out';
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(-20px)';

                            // Remove card from DOM after animation
                            setTimeout(() => {
                                card.remove();
                            }, 300);

                            // Delete in background
                            handlers.onDelete(task.id, status).catch(error => {
                                // If delete fails, show error notification
                                confirmationDialog.show({
                                    type: 'warning',
                                    title: 'Error',
                                    message: 'Failed to delete task. The page will refresh.',
                                    confirmText: 'OK',
                                    onConfirm: () => window.location.reload()
                                });
                            });
                        } catch (error) {
                            console.error('Failed to delete task:', error);
                        }
                    }
                });
            } catch (error) {
                console.error('Error showing confirmation:', error);
            }
        });
        }

        // Incomplete button handler
        const incompleteBtn = card.querySelector('.incomplete-btn');
        if (incompleteBtn) {
            incompleteBtn.addEventListener('click', () => {
                actionsMenu.classList.add('hidden');

                confirmationDialog.show({
                    type: 'warning',
                    title: 'Mark as Incomplete',
                    message: 'Do you want to mark this task as incomplete?',
                    confirmText: 'Mark as Incomplete',
                    confirmButtonClass: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
                    onConfirm: () => {
                        card.classList.add('reverting');
                        setTimeout(() => {
                            handlers.onReset(task.id);
                        }, 300);
                    }
                });
            });
        }
    }
}
