@extends('layout.app')

@section('content')
<div class="min-h-screen bg-yellow-50 pt-20">
    <x-navigation />

    {{-- Timer Section --}}
    <div id="timer" class="max-w-2xl mx-auto bg-white rounded-2xl p-8 m-4 shadow-sm">
        <div class="mt-8 text-center">
            <!-- Session Counter -->
            <div class="text-sm text-gray-500 mb-4">
                Session <span id="sessionCount">1</span>/4
            </div>

            <h2 id="timerTitle" class="text-2xl font-medium mb-6 text-gray-700 transition-all duration-300">Time to focus!</h2>
            <div id="timerDisplay" class="text-8xl font-bold mb-10 text-gray-800 transition-all duration-300">25:00</div>
        </div>

        <div class="flex justify-center items-center gap-6 mb-8">
            <button id="resetBtn"
                    class="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>

            <button id="startBtn"
                    class="w-16 h-16 rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
            </button>

            <button id="stopBtn"
                    class="w-12 h-12 rounded-full hover:bg-red-100 flex items-center justify-center text-red-500 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="mt-6">
            <div class="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Progress</span>
                <span id="timerProgress" class="font-medium">0%</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div id="progressBar"
                     class="bg-orange-400 h-2 rounded-full transition-all duration-300 ease-out"
                     style="width: 0%"></div>
            </div>
        </div>
    </div>

    {{-- Notes Section --}}
    <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-2xl font-bold text-orange-500">Pomodoro Task List</h1>
            <button
            onclick="window.taskManager?.modal?.open('create')"
            class="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
            <svg class="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Task
        </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Ongoing Tasks -->
            <div class="bg-gray-50 rounded-xl p-6 min-h-[200px]">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-800">Ongoing</h2>
                </div>
                <div id="ongoing-tasks-list" class="space-y-3">
                    <!-- Tasks will be added here -->
                </div>
            </div>

            <!-- Done Tasks -->
            <div class="bg-gray-50 rounded-xl p-6 min-h-[200px]">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-gray-800">Done</h2>
                </div>
                <div id="done-tasks-list" class="space-y-3">
                    <!-- Tasks will be added here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Task Modal -->
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

    @push('scripts')
    <script src="{{ mix('js/Notes/note.js') }}" defer></script>
@endpush
</div>
@endsection
