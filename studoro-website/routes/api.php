<?php

use App\Http\Controllers\Api\NoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('notes')->group(function () {
    Route::get('/', [NoteController::class, 'index']);
    Route::post('/', [NoteController::class, 'store']);
    Route::put('/{note}', [NoteController::class, 'update']);
    Route::delete('/{note}', [NoteController::class, 'destroy']);
    Route::patch('/{note}/status', [NoteController::class, 'updateStatus']);
    Route::patch('/{note}/statistics', [NoteController::class, 'updateStatistics']);
});
