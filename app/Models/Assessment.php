<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assessment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'section_subject_id',
        'type',
        'name',
        'total',
        'grading_period',
    ];

    public function sectionSubject(): BelongsTo
    {
        return $this->belongsTo(SectionSubject::class);
    }

    public function studentAssessmentScores(): HasMany
    {
        return $this->hasMany(StudentAssessmentScore::class);
    }

}
