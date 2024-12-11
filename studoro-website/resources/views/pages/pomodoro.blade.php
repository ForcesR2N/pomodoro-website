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


    {{-- Tasks Section --}}
    <div id="tasks" class="max-w-5xl mx-auto px-4 mt-8 scroll-mt-24">
        <h2 class="text-3xl font-bold text-center text-orange-400 mb-12">
            LIST TASKS
        </h2>

        {{-- Tasks Container --}}
        <div class="flex gap-8">
            {{-- Ongoing Tasks --}}
            <div class="flex-1 bg-white rounded-2xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-medium">Ongoing</h3>
                    <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {{-- Task Items --}}
                <div class="space-y-4">
                    @foreach(['MEDIUM', 'LOW'] as $priority)
                    <div class="p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-all">
                        <div class="flex justify-between mb-2">
                            <div>
                                <h4 class="font-medium mb-1">Menyelesaikan tugas matematika</h4>
                                <p class="text-sm text-gray-600">Halaman 77 bab 7</p>
                            </div>
                            <button class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">2024-12-07</span>
                            <span class="text-xs px-2 py-1 rounded-full {{ $priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600' }}">
                                {{ $priority }}
                            </span>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- Done Tasks --}}
            <div class="flex-1 bg-white rounded-2xl p-6 shadow-sm">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-medium">Done</h3>
                    <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                <div class="p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-all">
                    <div class="flex justify-between mb-2">
                        <div>
                            <h4 class="font-medium mb-1">Menyelesaikan tugas Mobile</h4>
                            <p class="text-sm text-gray-600">Reuse dan OOP</p>
                        </div>
                        <button class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">2024-12-01</span>
                        <span class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                            HIGH
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
