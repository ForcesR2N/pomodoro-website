<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PomodoroController;

// Halaman utama
Route::get('/', function () {
    return view('pages.homepage');
})->name('home');

// Halaman pomodoro dengan data dari database
Route::get('/pomodoro', [PomodoroController::class, 'index'])->name('pomodoro');
