import { PRIORITY_CLASSES } from '../Store/constants';

export class TaskCard {
    static create(task, status, handlers) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-4 relative';
        card.setAttribute('data-task-id', task.id);

        card.innerHTML = `
            <div class="flex items-start gap-3">
                <div class="pt-1">
                    <input type="checkbox"
                        class="w-4 h-4 rounded-full border-gray-300 text-orange-500 focus:ring-orange-500"
                        ${status === 'done' ? 'checked' : ''}>
                </div>
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
                        <div class="options-menu hidden absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                            <button class="edit-btn block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Edit
                            </button>
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
        // Checkbox handler
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox?.addEventListener('change', () => handlers.onComplete(task.id));

        // Menu button and options
        const optionsBtn = card.querySelector('.options-btn');
        const optionsMenu = card.querySelector('.options-menu');

        optionsBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            optionsMenu.classList.toggle('hidden');
        });

        card.querySelector('.edit-btn')?.addEventListener('click', () => {
            handlers.onEdit(task, status);
            optionsMenu.classList.add('hidden');
        });

        card.querySelector('.delete-btn')?.addEventListener('click', () => {
            handlers.onDelete(task.id, status);
            optionsMenu.classList.add('hidden');
        });
    }
}
