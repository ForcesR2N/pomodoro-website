@extends('layout.app')

@section('content')
<div class="min-h-screen">
    <!-- Header Navigation -->
    <header class="w-full py-4 px-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center">
                <span class="text-2xl font-bold">Studoro</span>
            </div>
            <div class="flex items-center">
                <a href="{{ route('pomodoro') }}"
                   class="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-all">
                    Account Name
                </a>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-6">
                    Optimalkan Belajarmu dengan Teknik
                    <span class="text-orange-500">Pomodoro</span>
                </h1>
                <p class="text-lg text-gray-600 mb-8">
                    Website manajemen tugas yang memadukan produktivitas dan
                    metode pembelajaran efektif.
                </p>
                <a href="{{ route('pomodoro') }}"
                   class="px-8 py-3 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-all inline-block">
                    Try Now
                </a>
            </div>
        </div>
    </section>
</div>
@endsection
