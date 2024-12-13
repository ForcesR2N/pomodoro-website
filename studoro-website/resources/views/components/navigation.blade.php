{{-- @props(['type' => 'default'])

<nav class="fixed top-4 left-0 right-0 z-50 mx-14 bg-gray-900/60 backdrop-blur-sm shadow-lg rounded-full transition-all duration-300">
    <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
            <!-- Left Section -->
            <div class="flex items-center">
                <a href="{{ route('home') }}" class="text-xl font-bold text-white">
                    Studoro
                </a>
            </div>

            <!-- Center Section -->
            <div class="flex items-center space-x-8">
                @if($type === 'homepage')
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
                @else
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
                @endif
            </div>

            <!-- Right Section -->
            <div class="flex items-center">
                @if($type === 'homepage')
                    <a href="{{ route('pomodoro') }}"
                       class="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors">
                       Try Now
                    </a>
                @else
                    <button class="px-6 py-2 bg-white rounded-full text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                        Contact Us
                    </button>
                @endif
            </div>
        </div>
    </div>
</nav> --}}

<div class="pt-10">
    <nav id="navbar" class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 flex justify-between items-center px-8 py-4 max-w-6xl w-full rounded-full border border-black bg-white shadow-md transition-all duration-300">
        <!-- Left Section: Logo -->
        <img
            src="image/1.png"
            class="w-22 h-auto"
        />

        <!-- Right Section: Account -->
        <div class="flex items-center space-x-2">
            <img
                src="https://i.pinimg.com/736x/a4/8c/3e/a48c3eddd75956b8cdf9f6b465df605d.jpg"
                alt="Profile Avatar"
                class="w-8 h-8 rounded-full"
            />
            <span class="font-medium text-black">UdinTheRock</span>
        </div>
    </nav>
</div>

<script>
    // Add event listener for scroll
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");

        if (window.scrollY > 0) {
            // Remove top border and slightly round the bottom corners
            navbar.classList.remove("top-8", "rounded-full");
            navbar.classList.add("top-0", "border-t-0", "rounded-b-md");
        } else {
            // Reset to original position, border, and full rounding
            navbar.classList.remove("top-0", "border-t-0", "rounded-b-md");
            navbar.classList.add("top-8", "rounded-full");
        }
    });
</script>


