// confirmationDialog.js
export class ConfirmationDialog {
    constructor() {
        this.dialogElement = null;
        this.createDialogElement();
    }

    createDialogElement() {
        // Create dialog container if it doesn't exist
        if (!document.getElementById('confirmation-dialog')) {
            const dialog = document.createElement('div');
            dialog.id = 'confirmation-dialog';
            dialog.className = 'fixed inset-0 z-50 hidden';
            dialog.innerHTML = `
                <div class="dialog-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0"></div>
                <div class="fixed inset-0 flex items-center justify-center p-4">
                    <div class="dialog-content bg-white rounded-lg shadow-xl transform transition-all duration-300 scale-95 opacity-0 max-w-sm w-full">
                        <div class="p-6">
                            <div class="dialog-icon flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4">
                                <!-- Icon will be injected here -->
                            </div>
                            <h3 class="text-lg font-medium text-center mb-2">
                                <!-- Title will be injected here -->
                            </h3>
                            <p class="text-sm text-gray-500 text-center mb-6">
                                <!-- Message will be injected here -->
                            </p>
                            <div class="flex gap-3 justify-center">
                                <button class="cancel-btn px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                                    Cancel
                                </button>
                                <button class="confirm-btn px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                                    <!-- Confirm button text will be injected here -->
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Add styles for the dialog
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                .dialog-backdrop {
                    transition: opacity 0.3s ease-out;
                }
                .dialog-content {
                    transition: all 0.3s ease-out;
                }
                #confirmation-dialog:not(.hidden) .dialog-backdrop {
                    opacity: 1;
                }
                #confirmation-dialog:not(.hidden) .dialog-content {
                    opacity: 1;
                    transform: scale(1);
                }
            `;
            document.head.appendChild(styleSheet);
            document.body.appendChild(dialog);
            this.dialogElement = dialog;
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Close on backdrop click
        this.dialogElement.querySelector('.dialog-backdrop').addEventListener('click', () => {
            this.close();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.dialogElement.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    getIconForType(type) {
        const baseClass = 'w-6 h-6';
        switch (type) {
            case 'delete':
                return `<svg class="${baseClass} text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>`;
            case 'edit':
                return `<svg class="${baseClass} text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>`;
            case 'warning':
                return `<svg class="${baseClass} text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`;
            default:
                return `<svg class="${baseClass} text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
        }
    }

    show({ type = 'info', title, message, confirmText = 'Confirm', confirmButtonClass = '', onConfirm, onCancel }) {
        const dialog = this.dialogElement;
        const iconContainer = dialog.querySelector('.dialog-icon');
        const confirmBtn = dialog.querySelector('.confirm-btn');

        // Set icon and its background
        iconContainer.className = `flex items-center justify-center w-12 h-12 mx-auto rounded-full mb-4 ${
            type === 'delete' ? 'bg-red-100' :
            type === 'edit' ? 'bg-blue-100' :
            type === 'warning' ? 'bg-yellow-100' :
            'bg-gray-100'
        }`;
        iconContainer.innerHTML = this.getIconForType(type);

        // Set title and message
        dialog.querySelector('h3').textContent = title;
        dialog.querySelector('p').textContent = message;

        // Set confirm button style and text
        confirmBtn.textContent = confirmText;
        confirmBtn.className = `confirm-btn px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            confirmButtonClass || (
                type === 'delete' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
                type === 'edit' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' :
                type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500' :
                'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
            )
        }`;

        // Setup button handlers
        const cancelBtn = dialog.querySelector('.cancel-btn');

        // Remove existing listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        // Add new listeners
        newConfirmBtn.addEventListener('click', () => {
            this.close();
            onConfirm?.();
        });

        newCancelBtn.addEventListener('click', () => {
            this.close();
            onCancel?.();
        });

        // Show dialog with animation
        dialog.classList.remove('hidden');
    }

    close() {
        const dialog = this.dialogElement;
        const content = dialog.querySelector('.dialog-content');
        const backdrop = dialog.querySelector('.dialog-backdrop');

        // Start fade out animation
        content.style.opacity = '0';
        content.style.transform = 'scale(0.95)';
        backdrop.style.opacity = '0';

        // Hide dialog after animation
        setTimeout(() => {
            dialog.classList.add('hidden');
            content.style.opacity = '';
            content.style.transform = '';
            backdrop.style.opacity = '';
        }, 300);
    }
}

// Create a singleton instance
export const confirmationDialog = new ConfirmationDialog();
