@extends('layout.app')

@section('content')
<div class="min-h-screen bg-yellow-50">
    <x-navigation type="homepage" />

    <!-- Hero Section -->
    <section class="py-24">
        <div class="max-w-6xl mx-auto px-4">
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

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
            <!-- Add your features content -->
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-us" class="py-20">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <!-- Add your why choose us content -->
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <!-- Add your FAQ content -->
        </div>
    </section>
</div>
@endsection
