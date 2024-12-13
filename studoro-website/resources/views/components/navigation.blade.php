@props(['type' => 'default'])

<div class="pt-10">
    <nav id="navbar" class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center px-8 py-4 max-w-6xl w-full rounded-full border border-black bg-white shadow-md transition-all duration-300">
        <!-- Left Section: Logo -->
        <div class="flex items-center">
            <a href="{{ route('home') }}" class="flex items-center">
                <img src="{{ asset('image/logo.png') }}" class="h-8 w-auto" alt="Studoro Logo"/>
            </a>
        </div>

        <!-- Center Section: Navigation -->
        @if($type === 'homepage')
        <div class="flex items-center space-x-8">
            <a href="#home" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">HOME</a>
            <a href="#features" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">FEATURES</a>
            <a href="#why-us" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">WHY US</a>
            <a href="#faq" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">FAQ</a>
        </div>
        @else
        <div class="flex items-center space-x-8">
            <a href="{{ route('home') }}" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">HOME</a>
            <a href="#timer" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">POMODORO</a>
            <a href="#tasks" class="text-sm font-medium text-black hover:text-gray-700 transition-colors">TASKS</a>
        </div>
        @endif

        <!-- Right Section: Account -->
        <div class="flex items-center space-x-2">
            <img src="https://i.pinimg.com/736x/a4/8c/3e/a48c3eddd75956b8cdf9f6b465df605d.jpg"
                 alt="Profile Avatar"
                 class="w-8 h-8 rounded-full object-cover"/>
            <span class="font-medium text-black">UdinTheRock</span>
        </div>
    </nav>
</div>
