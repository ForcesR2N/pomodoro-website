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


<div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold text-orange-500 mb-8">Pomodoro Task List</h1>

    <div class="grid grid-cols-2 gap-8">
        <!-- Ongoing Tasks -->
        <div class="bg-gray-50 rounded-xl p-6" id="ongoing-tasks">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-semibold">Ongoing</h2>
                <button
                    class="text-orange-500 hover:text-orange-600"
                    onclick="openTaskModal('create', 'ongoing')"
                >
                    Add Task
                </button>
            </div>
            <div id="ongoing-tasks-list" class="space-y-3">
                <!-- Tasks will be dynamically added here -->
            </div>
        </div>

        <!-- Done Tasks -->
        <div class="bg-gray-50 rounded-xl p-6" id="done-tasks">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg font-semibold">Done</h2>

            </div>
            <div id="done-tasks-list" class="space-y-3">
                <!-- Tasks will be dynamically added here -->
            </div>
        </div>
    </div>
</div>

<!-- Task Modal -->
<div
    id="task-modal"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center hidden"
>
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 id="modal-title" class="text-lg font-semibold mb-4">Add Task</h3>
        <form id="task-form">
            <input type="hidden" id="task-id">
            <input type="hidden" id="task-status">
            <div class="mb-4">
                <label for="task-title" class="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    id="task-title"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-500"
                    required
                >
            </div>
            <div class="mb-4">
                <label for="task-description" class="block text-sm font-medium">Description</label>
                <textarea
                    id="task-description"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-500"
                    rows="3"
                    required
                ></textarea>
            </div>
            <div class="mb-4">
                <label for="task-due-date" class="block text-sm font-medium">Due Date</label>
                <input
                    type="date"
                    id="task-due-date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-500"
                    required
                >
            </div>
            <div class="mb-4">
                <label for="task-priority" class="block text-sm font-medium">Priority</label>
                <select
                    id="task-priority"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-orange-500"
                    required
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
            </div>
            <div class="flex justify-end space-x-3">
                <button
                    type="button"
                    onclick="closeTaskModal()"
                    class="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</div>
<script src="{{ mix('resources/js/Note/note.js') }}"></script>

</div>
@endsection
