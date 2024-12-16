<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoteStatistic extends Model
{
    protected $fillable = [
        'note_id',
        'focus_sessions',
        'total_time',
        'last_session'
    ];

    protected $casts = [
        'last_session' => 'datetime'
    ];

    public function note()
    {
        return $this->belongsTo(Note::class);
    }
}
