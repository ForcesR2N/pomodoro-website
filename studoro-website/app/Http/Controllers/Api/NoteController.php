<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\NoteStatistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    public function index()
    {
        try {
            $notes = Note::with('statistic')->get();
            return response()->json($notes);
        } catch (\Exception $e) {
            Log::error('Error fetching notes:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Failed to fetch notes'], 500);
        }
    }

    public function store(Request $request)
{
    try {
        Log::info('Data yang diterima:', $request->all());

        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'priority' => 'required|in:LOW,MEDIUM,HIGH',
            'due_date' => 'required|date',
            'status' => 'required|in:ongoing,done'
        ]);

        // Check for duplicate task
        $existingTask = Note::where('title', $validated['title'])
                           ->where('due_date', $validated['due_date'])
                           ->first();

        if ($existingTask) {
            // Silently return without error message
            return response()->json(null, 204);
        }

        Log::info('Data yang divalidasi:', $validated);

        $note = Note::create($validated);
        Log::info('Note berhasil dibuat:', $note->toArray());

        return response()->json($note, 201);
    } catch (ValidationException $e) {
        Log::error('Validation error:', [
            'message' => $e->getMessage(),
            'errors' => $e->errors()
        ]);
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        Log::error('Error saat membuat note:', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json([
            'message' => 'Failed to create note',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function updateStatus(Note $note)
    {
        try {
            $note->status = $note->status === 'ongoing' ? 'done' : 'ongoing';
            $note->save();
            return response()->json($note);
        } catch (\Exception $e) {
            Log::error('Error updating note status:', [
                'note_id' => $note->id,
                'message' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to update note status'], 500);
        }
    }

    public function updateStatistic(Note $note, Request $request)
    {
        try {
            $validated = $request->validate([
                'focus_sessions' => 'required|integer',
                'total_time' => 'required|integer'
            ]);

            $note->statistic()->updateOrCreate(
                ['note_id' => $note->id],
                [
                    'focus_sessions' => $validated['focus_sessions'],
                    'total_time' => $validated['total_time'],
                    'last_session' => now()
                ]
            );

            return response()->json($note->load('statistic'));
        } catch (\Exception $e) {
            Log::error('Error updating note statistics:', [
                'note_id' => $note->id,
                'message' => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to update note statistics'], 500);
        }
    }

    public function destroy(Note $note)
    {
        try {
            DB::beginTransaction();

            // Log deletion attempt
            Log::info('Attempting to delete note:', ['note_id' => $note->id]);

            // Delete related statistics if exists
            if ($note->statistic) {
                $note->statistic->delete();
                Log::info('Deleted related statistics for note:', ['note_id' => $note->id]);
            }

            // Delete the note
            $note->delete();
            Log::info('Successfully deleted note:', ['note_id' => $note->id]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Note deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to delete note:', [
                'note_id' => $note->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete note'
            ], 500);
        }
    }
}
