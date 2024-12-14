import { TaskCard } from './taskCard';
import { Modal } from './modal';

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
        this.modal = new Modal('note-modal');
        this.container = document.getElementById('notes-container');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
        // Make modal accessible globally
        window.taskModal = this.modal;
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('note-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e);
        });
    }

    handleFormSubmit(e) {
        const form = e.target;
        const noteId = form['note-id'].value;

        const note = {
            title: form['note-title'].value,
            content: form['note-content'].value,
            timestamp: new Date().toISOString()
        };

        if (noteId) {
            // Update existing note
            const index = this.notes.findIndex(n => n.id === noteId);
            if (index !== -1) {
                this.notes[index] = { ...this.notes[index], ...note };
            }
        } else {
            // Add new note
            note.id = Date.now().toString();
            this.notes.unshift(note); // Add to beginning of array
        }

        this.saveNotes();
        this.render();
        this.modal.close();
    }

    createNoteCard(note) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="font-semibold text-lg text-gray-800">${note.title}</h3>
                <div class="flex gap-2">
                    <button class="edit-btn text-gray-400 hover:text-blue-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                    </button>
                    <button class="delete-btn text-gray-400 hover:text-red-500">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            <p class="text-gray-600 mb-4 whitespace-pre-wrap">${note.content}</p>
            <div class="text-sm text-gray-500">
                ${new Date(note.timestamp).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        `;

        // Add event listeners
        card.querySelector('.edit-btn').addEventListener('click', () => this.editNote(note));
        card.querySelector('.delete-btn').addEventListener('click', () => this.deleteNote(note.id));

        return card;
    }

    editNote(note) {
        const form = document.getElementById('note-form');
        form['note-id'].value = note.id;
        form['note-title'].value = note.title;
        form['note-content'].value = note.content;

        document.getElementById('modal-title').textContent = 'Edit Note';
        this.modal.open();
    }

    deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.saveNotes();
            this.render();
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (this.notes.length === 0) {
            this.container.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center p-8 text-center">
                    <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <p class="text-gray-500">No notes yet. Click "Add New Note" to create one!</p>
                </div>
            `;
            return;
        }

        this.notes.forEach(note => {
            this.container.appendChild(this.createNoteCard(note));
        });
    }
}

// Initialize if we're on the notes page
if (document.getElementById('notes-container')) {
    new NoteManager();
}

export default NoteManager;
