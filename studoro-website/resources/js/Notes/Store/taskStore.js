// resources/js/Notes/Store/taskStore.js
export const taskStore = {
    tasks: {
        ongoing: [],
        done: []
    },
    subscribers: [],

    subscribe(callback) {
        this.subscribers.push(callback);
        callback(this.tasks); // Panggil callback langsung untuk inisialisasi
    },

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.tasks));
    },

    addTask(status, task) {
        const newTask = {
            ...task,
            id: Date.now().toString()
        };
        this.tasks[status] = [newTask, ...this.tasks[status]];
        this.notifySubscribers();
    },

    updateTask(status, taskId, updatedTask) {
        const index = this.tasks[status].findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks[status][index] = {
                ...updatedTask,
                id: taskId
            };
            this.notifySubscribers();
        }
    },

    deleteTask(status, taskId) {
        this.tasks[status] = this.tasks[status].filter(task => task.id !== taskId);
        this.notifySubscribers();
    },

    moveTask(fromStatus, toStatus, taskId) {
        const taskIndex = this.tasks[fromStatus].findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const task = this.tasks[fromStatus][taskIndex];
            this.tasks[fromStatus] = this.tasks[fromStatus].filter(t => t.id !== taskId);
            this.tasks[toStatus] = [task, ...this.tasks[toStatus]];
            this.notifySubscribers();
        }
    }
};
