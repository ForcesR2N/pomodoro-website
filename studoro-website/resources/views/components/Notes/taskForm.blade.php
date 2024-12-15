<div id="task-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-4">
            <h3 id="modal-title" class="text-lg font-semibold">Add Task</h3>
            <button onclick="window.taskManager.modal.close()" class="text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>

        <form id="task-form">
            <input type="hidden" id="task-id" name="task-id">
            <input type="hidden" id="task-status" name="task-status" value="ongoing">

            <div class="mb-4">
                <label for="task-title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" id="task-title" name="task-title"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                       placeholder="Enter task title"
                       required>
            </div>

            <div class="mb-4">
                <label for="task-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="task-description" name="task-description" rows="3"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter task description"
                          required></textarea>
            </div>

            <div class="mb-4">
                <label for="task-due-date" class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" id="task-due-date" name="task-due-date"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                       required>
            </div>

            <div class="mb-6">
                <label for="task-priority" class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select id="task-priority" name="task-priority"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>

            <div class="flex justify-end gap-2">
                <button type="button" onclick="window.taskManager.modal.close()"
                        class="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                </button>
                <button type="submit"
                        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                    Save Task
                </button>
            </div>
        </form>
    </div>
</div>
