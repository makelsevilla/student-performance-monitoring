<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentAssessmentScore extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'student_id',
        'assessment_id',
        'score',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, "student_id");
    }

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, "assessment_id");
    }
}
