<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function studentSubjectQuizScores(): HasMany
    {
        return $this->hasMany(StudentSubjectQuizScore::class);
    }

    public function studentSubjectTaskScores(): HasMany
    {
        return $this->hasMany(StudentSubjectTaskScore::class);
    }

    public function studentSubjectExamScores(): HasMany
    {
        return $this->hasMany(StudentSubjectExamScore::class);
    }
}
