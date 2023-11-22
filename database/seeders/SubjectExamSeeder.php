<?php

namespace Database\Seeders;

use App\Models\SubjectExam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SubjectExam::factory(10)->create();
    }
}
