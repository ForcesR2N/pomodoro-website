@extends('layout.app')

@section('content')
<div class="min-h-screen">
    <!-- Navigation -->
    <nav class="max-w-3xl mx-auto bg-white rounded-full p-2 m-4">
        <div class="flex justify-end space-x-8 px-6">
            <a href="{{ route('home') }}" class="py-2">HOME</a>
            <button class="py-2 font-medium">POMODORO</button>
            <button class="py-2">TASKS</button>
        </div>
    </nav>

    <!-- Timer Section -->
    <div class="max-w-2xl mx-auto bg-white rounded-2xl p-8 m-4">
        <!-- Timer Tabs -->
        <div class="flex justify-center gap-4 mb-8">
            <button class="px-4 py-2 bg-gray-100 rounded-lg">Pomodoro</button>
            <button class="px-4 py-2 rounded-lg">Short Break</button>
            <button class="px-4 py-2 rounded-lg">Long Break</button>
        </div>

        <!-- Task Title -->
        <h2 class="text-xl text-center mb-8">
            Menyelesaikan tugas matematika
        </h2>

        <!-- Timer Display -->
        <div class="text-7xl text-center mb-8">
            25:00
        </div>

        <!-- Timer Controls -->
        <div class="flex justify-center items-center gap-8 mb-6">
            <button class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </button>
            <button class="w-14 h-14 rounded-full bg-orange-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </button>
            <button class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 4v6h-6"></path>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
            </button>
        </div>

        <!-- Progress -->
        <div class="flex justify-end">
            <span class="text-sm text-gray-600">Progress</span>
        </div>
    </div>

    <!-- Tasks Section -->
    <div class="max-w-5xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-orange-400 mb-12">
            LIST TASKS
        </h2>

        <!-- Task Lists Container -->
        <div class="flex gap-8">
            <!-- Ongoing Tasks -->
            <div class="flex-1 bg-white rounded-2xl p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-medium">Ongoing</h3>
                    <button class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <!-- Task Items -->
                <div class="space-y-4">
                    <!-- Task 1 -->
                    <div class="p-4 rounded-lg border">
                        <div class="flex justify-between mb-2">
                            <div>
                                <h4 class="font-medium mb-1">Menyelesaikan tugas matematika</h4>
                                <p class="text-sm text-gray-600">Halaman 77 bab 7</p>
                            </div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">2024-12-07</span>
                            <span class="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-600">
                                MEDIUM
                            </span>
                        </div>
                    </div>

                    <!-- Task 2 -->
                    <div class="p-4 rounded-lg border">
                        <div class="flex justify-between mb-2">
                            <div>
                                <h4 class="font-medium mb-1">Menyelesaikan tugas matematika</h4>
                                <p class="text-sm text-gray-600">Halaman 77 bab 7</p>
                            </div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">2024-12-27</span>
                            <span class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                                LOW
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Done Tasks -->
            <div class="flex-1 bg-white rounded-2xl p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-medium">Done</h3>
                    <button class="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <div class="p-4 rounded-lg border">
                    <div class="flex justify-between mb-2">
                        <div>
                            <h4 class="font-medium mb-1">Menyelesaikan tugas Mobile</h4>
                            <p class="text-sm text-gray-600">Reuse dan OOP</p>
                        </div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
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
