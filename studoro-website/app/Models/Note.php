<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = [
        'title',
        'description',
        'priority',
        'due_date',
        'status'
    ];

    protected $casts = [
        'due_date' => 'date'
    ];

    public function statistic()
    {
        return $this->hasOne(NoteStatistic::class);
    }
}
