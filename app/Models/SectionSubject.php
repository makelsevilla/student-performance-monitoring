<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SectionSubject extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'section_id',
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

    public function quizzes(): HasMany
    {
        return $this->hasMany(SubjectQuiz::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(SubjectTask::class);
    }

    public function exams(): HasMany
    {
        return $this->hasMany(SubjectExam::class);
    }
}
