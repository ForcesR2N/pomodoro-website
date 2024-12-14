import { DEFAULT_CARD_HEIGHT, EMPTY_STATE_MESSAGE } from '../Store/constants';

export class EmptyState {
    static create() {
        const card = document.createElement('div');
        card.className = `bg-white rounded-lg p-4 mb-3 shadow-sm empty-state ${DEFAULT_CARD_HEIGHT}`;

        card.innerHTML = `
            <div class="text-center">
                <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p class="text-gray-400">${EMPTY_STATE_MESSAGE}</p>
            </div>
        `;
        return card;
    }
}
