<?php

namespace Database\Seeders;

use App\Models\StudentSubjectQuizScore;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSubjectQuizScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudentSubjectQuizScore::factory()
            ->count(50)
            ->create();
    }
}
