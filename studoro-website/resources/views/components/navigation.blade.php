<nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-sm shadow-lg transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
            <!-- Left section -->
            <div class="flex items-center">
                <span class="text-xl font-bold text-white">Studoro</span>
            </div>

            <!-- Center section -->
            <div class="flex items-center justify-center space-x-8">
                <a href="#timer"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors"
                   onclick="event.preventDefault(); document.getElementById('timer').scrollIntoView({ behavior: 'smooth', block: 'center' })">
                    POMODORO
                </a>

                <a href="#tasks"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors"
                   onclick="event.preventDefault(); document.getElementById('tasks').scrollIntoView({ behavior: 'smooth', block: 'center' })">
                    TASKS
                </a>
            </div>

            <!-- Right section -->
            <div class="flex items-center">
                <button class="px-6 py-2 bg-white rounded-full text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                    Contact us
                </button>
            </div>
        </div>
    </div>
</nav>
