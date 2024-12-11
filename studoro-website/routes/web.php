<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('pages.homepage');
})->name('home');

Route::get('/pomodoro', function () {
    return view('pages.pomodoro');
})->name('pomodoro');
