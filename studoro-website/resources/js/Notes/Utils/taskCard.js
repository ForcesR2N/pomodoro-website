import { PRIORITY_CLASSES } from '../Store/constants';

export class TaskCard {
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
                        <span class="text-sm text-gray-500">${new Date(task.dueDate).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</span>
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
        if (status === 'ongoing') {
            const checkbox = card.querySelector('.task-checkbox');
            checkbox?.addEventListener('change', () => {
                if (checkbox.checked) {
                    card.classList.add('completing');
                    setTimeout(() => {
                        handlers.onComplete(task.id);
                    }, 300);
                }
            });

            const startTaskBtn = card.querySelector('.start-task-btn');
            startTaskBtn?.addEventListener('click', () => {
                handlers.onStartTask(task);
                card.querySelector('.task-actions').classList.add('hidden');
            });
        }

        const optionsBtn = card.querySelector('.options-btn');
        const optionsMenu = card.querySelector('.task-actions');

        optionsBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.task-actions').forEach(menu => {
                if (menu !== optionsMenu) menu.classList.add('hidden');
            });
            optionsMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!card.contains(e.target)) {
                optionsMenu.classList.add('hidden');
            }
        });

        card.querySelector('.edit-btn')?.addEventListener('click', () => {
            handlers.onEdit(task, status);
            optionsMenu.classList.add('hidden');
        });

        card.querySelector('.delete-btn')?.addEventListener('click', () => {
            card.classList.add('deleting');
            setTimeout(() => {
                handlers.onDelete(task.id, status);
            }, 300);
            optionsMenu.classList.add('hidden');
        });

        const incompleteBtn = card.querySelector('.incomplete-btn');
        if (incompleteBtn) {
            incompleteBtn.addEventListener('click', () => {
                card.classList.add('reverting');
                setTimeout(() => {
                    handlers.onReset(task.id);
                }, 300);
                optionsMenu.classList.add('hidden');
            });
        }
    }
}
