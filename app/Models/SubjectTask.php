<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubjectTask extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'section_subject_id',
        'name',
        'total_score',
        'grading_period',
    ];

    public function sectionSubject(): BelongsTo
    {
        return $this->belongsTo(SectionSubject::class);
    }

    public function studentSubjectTaskScores()
    {
        return $this->hasMany(StudentSubjectTaskScore::class);
    }
}
