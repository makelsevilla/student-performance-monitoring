<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SectionSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'name',
        'quiz_weight',
        'task_weight',
        'exam_weight'
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, "teacher_id");
    }
}
