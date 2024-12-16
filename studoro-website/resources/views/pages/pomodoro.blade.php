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
    <div id = "notes"class="max-w-6xl mx-auto px-4 py-8">
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

         <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-gray-800">Ongoing</h2>
                <div id="ongoing-tasks-list" class="task-list-container">
                    @forelse($notes['ongoing'] ?? [] as $note)
                    @empty
                        <p class="text-gray-400">No ongoing tasks yet</p>
                    @endforelse
                </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-6">
                <h2 class="text-lg font-semibold text-gray-800">Done</h2>
                <div id="done-tasks-list" class="task-list-container">
                    @forelse($notes['done'] ?? [] as $note)
                    @empty
                        <p class="text-gray-400">No completed tasks yet</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    @include('components.Notes.taskForm')
    @push('scripts')
    <script src="{{ mix('js/Notes/note.js') }}" defer></script>
@endpush
</div>
@endsection
