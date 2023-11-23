<?php

namespace Database\Seeders;

use App\Models\StudentAssessmentScore;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentAssessmentScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudentAssessmentScore::factory(50)->create();
    }
}
