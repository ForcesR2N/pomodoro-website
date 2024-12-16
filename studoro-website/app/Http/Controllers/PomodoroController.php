<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class PomodoroController extends Controller
{
    public function index()
    {
        // Ambil data notes untuk ditampilkan di view
        $notes = Note::with('statistic')
            ->latest()
            ->get()
            ->groupBy('status');

        return view('pages.pomodoro', [
            'notes' => $notes
        ]);
    }
}
