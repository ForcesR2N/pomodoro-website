class TaskStore {
    constructor() {
        this.tasks = {
            ongoing: [],
            done: []
        };
        this.subscribers = [];
        this.loadFromLocalStorage();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notify() {
        this.saveToLocalStorage();
        this.subscribers.forEach(callback => callback(this.tasks));
    }

    loadFromLocalStorage() {
        try {
            const savedTasks = localStorage.getItem('pomodoro_tasks');
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('pomodoro_tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }

    addTask(status, task) {
        this.tasks[status].push({
            ...task,
            id: Date.now(),
            createdAt: new Date().toISOString()
        });
        this.notify();
    }

    updateTask(status, taskId, updatedTask) {
        const index = this.tasks[status].findIndex(t => t.id === parseInt(taskId));
        if (index !== -1) {
            this.tasks[status][index] = {
                ...this.tasks[status][index],
                ...updatedTask,
                updatedAt: new Date().toISOString()
            };
            this.notify();
        }
    }

    deleteTask(status, taskId) {
        this.tasks[status] = this.tasks[status].filter(task => task.id !== parseInt(taskId));
        this.notify();
    }

    moveTask(fromStatus, toStatus, taskId) {
        const taskIndex = this.tasks[fromStatus].findIndex(task => task.id === parseInt(taskId));
        if (taskIndex !== -1) {
            const [task] = this.tasks[fromStatus].splice(taskIndex, 1);
            this.tasks[toStatus].push({
                ...task,
                movedAt: new Date().toISOString()
            });
            this.notify();
        }
    }

    getTasks(status) {
        return this.tasks[status];
    }
}

export const taskStore = new TaskStore();
