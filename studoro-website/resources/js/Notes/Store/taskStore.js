// taskStore.js

export const taskStore = {
    tasks: {
        ongoing: [],
        done: []
    },
    subscribers: [],
    initialized: false,

    // Subscribe to changes
    subscribe(callback) {
        this.subscribers.push(callback);
        // Only call callback if we already have data
        if (this.initialized) {
            callback({...this.tasks});
        }
    },

    // Notify all subscribers
    notifySubscribers() {
        const tasksCopy = {
            ongoing: [...this.tasks.ongoing],
            done: [...this.tasks.done]
        };
        this.subscribers.forEach(callback => callback(tasksCopy));
    },

    // Load all tasks from database
    async loadTasks() {
        try {
            console.log('Fetching tasks...');
            const response = await fetch('/api/notes');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const notes = await response.json();
            console.log('Received notes:', notes);

            // Clear existing tasks before loading
            this.tasks.ongoing = [];
            this.tasks.done = [];

            // Use Set to track unique IDs
            const processedIds = new Set();

            // Process each note only once
            notes.forEach(note => {
                if (!processedIds.has(note.id)) {
                    processedIds.add(note.id);
                    if (note.status === 'ongoing') {
                        this.tasks.ongoing.push(note);
                    } else if (note.status === 'done') {
                        this.tasks.done.push(note);
                    }
                }
            });

            // Sort by newest first
            this.tasks.ongoing.sort((a, b) => b.id - a.id);
            this.tasks.done.sort((a, b) => b.id - a.id);

            this.initialized = true;
            this.notifySubscribers();

            console.log('Sorted tasks:', this.tasks);
        } catch (error) {
            console.error('Error loading notes:', error);
            throw error;
        }
    },

    // Add new task
    async addTask(status, task) {
        try {
            // First check if a similar task already exists
            const isDuplicate = this.tasks[status].some(existingTask =>
                existingTask.title === task.title &&
                existingTask.due_date === task.due_date
            );

            if (isDuplicate) {
                // Silently return without showing error
                return null;
            }

            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    due_date: task.due_date,
                    status: status
                })
            });

            // Check if the response is ok but empty
            if (response.status === 204) {
                return null;
            }

            // For successful responses with content
            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const savedTask = await response.json();
                    this.tasks[status].unshift(savedTask);
                    this.notifySubscribers();
                    return savedTask;
                }
                return null;
            }

            // Handle error responses
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save note');

        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    },
    // Update existing task
    async updateTask(status, taskId, updatedTask) {
        try {
            let currentStatus = null;
            for (const [key, tasks] of Object.entries(this.tasks)) {
                if (tasks.find(t => t.id === taskId)) {
                    currentStatus = key;
                    break;
                }
            }

            const response = await fetch(`/api/notes/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    title: updatedTask.title,
                    description: updatedTask.description,
                    priority: updatedTask.priority,
                    due_date: updatedTask.due_date,
                    status: status
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update note');
            }

            const updatedNote = await response.json();

            // If status has changed, handle the move
            if (currentStatus && currentStatus !== status) {
                // Remove from old status
                this.tasks[currentStatus] = this.tasks[currentStatus].filter(task => task.id !== taskId);
                // Add to new status
                this.tasks[status] = [updatedNote, ...this.tasks[status]];
            } else {
                // Update in current status
                const index = this.tasks[status].findIndex(task => task.id === taskId);
                if (index !== -1) {
                    this.tasks[status][index] = updatedNote;
                }
            }

            this.notifySubscribers();
            return updatedNote;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error; // Propagate error to handle it in the UI
        }
    },

    // Delete task
    async deleteTask(status, taskId) {
        try {
            // Immediately update UI (optimistic update)
            const taskToDelete = this.tasks[status].find(task => task.id === taskId);
            this.tasks[status] = this.tasks[status].filter(task => task.id !== taskId);
            this.notifySubscribers();

            // Send delete request to server
            const response = await fetch(`/api/notes/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                credentials: 'include'
            });

            if (!response.ok) {
                // If delete fails, rollback the optimistic update
                this.tasks[status].push(taskToDelete);
                this.tasks[status].sort((a, b) => b.id - a.id);
                this.notifySubscribers();
                throw new Error('Failed to delete task');
            }

            return true;
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    },

    // Move task between statuses
    async moveTask(fromStatus, toStatus, taskId) {
        try {
            const response = await fetch(`/api/notes/${taskId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    status: toStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to move note');
            }

            const updatedNote = await response.json();

            // Remove from old status
            this.tasks[fromStatus] = this.tasks[fromStatus].filter(task => task.id !== taskId);

            // Add to new status
            this.tasks[toStatus] = [updatedNote, ...this.tasks[toStatus]];

            this.notifySubscribers();
        } catch (error) {
            console.error('Error moving note:', error);
            alert('Failed to move note. Please try again.');
        }
    },

    // Update task statistics
    async updateTaskStatistics(taskId, statistics) {
        try {
            const response = await fetch(`/api/notes/${taskId}/statistics`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(statistics)
            });

            if (!response.ok) {
                throw new Error('Failed to update statistics');
            }

            const updatedNote = await response.json();

            // Update in both ongoing and done arrays
            ['ongoing', 'done'].forEach(status => {
                const index = this.tasks[status].findIndex(task => task.id === taskId);
                if (index !== -1) {
                    this.tasks[status][index] = updatedNote;
                }
            });

            this.notifySubscribers();
        } catch (error) {
            console.error('Error updating statistics:', error);
            // Silent fail for statistics to not interrupt user experience
        }
    }
};

// Initialize tasks when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    taskStore.loadTasks().catch(error => {
        console.error('Failed to load initial tasks:', error);
    });
});
