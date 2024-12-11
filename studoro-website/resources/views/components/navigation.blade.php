@props(['type' => 'default'])

<nav class="fixed top-4 mx-14 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-sm shadow-lg transition-all duration-300 rounded-full">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
            <!-- Left section -->
            <div class="flex items-center">
                <a href="{{ route('home') }}" class="text-xl font-bold text-white">Studoro</a>
            </div>

            <!-- Center section -->
            @if($type === 'homepage')
            <div class="flex items-center justify-center space-x-8">
                <a href="#features"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors"
                   onclick="event.preventDefault(); document.getElementById('features').scrollIntoView({ behavior: 'smooth', block: 'center' })">
                    FEATURES
                </a>
                <a href="#why-us"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors"
                   onclick="event.preventDefault(); document.getElementById('why-us').scrollIntoView({ behavior: 'smooth', block: 'center' })">
                    WHY US
                </a>
                <a href="#faq"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors"
                   onclick="event.preventDefault(); document.getElementById('faq').scrollIntoView({ behavior: 'smooth', block: 'center' })">
                    FAQ
                </a>
            </div>
            @else
            <div class="flex items-center justify-center space-x-8">
                <a href="{{ route('home') }}"
                   class="text-sm font-medium text-white/90 hover:text-white transition-colors">
                    HOME
                </a>
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
            @endif

            <!-- Right section -->
            <div class="flex items-center">
                @if($type === 'homepage')
                    <a href="{{ route('pomodoro') }}"
                       class="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors">
                        Try Now
                    </a>
                @else
                    <button class="px-6 py-2 bg-white rounded-full text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                        Contact us
                    </button>
                @endif
            </div>
        </div>
    </div>
</nav>
