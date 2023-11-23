<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
