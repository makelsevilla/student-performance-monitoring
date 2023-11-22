<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentSubjectQuizScore extends Model
{
    use HasFactory;

    protected $fillable = [
        "student_id",
        "subject_quiz_id",
        "score",
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function subjectQuiz(): BelongsTo
    {
        return $this->belongsTo(SubjectQuiz::class);
    }
}
