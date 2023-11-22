<?php

namespace Database\Seeders;

use App\Models\SectionSubject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SectionSubject::factory()->count(10)->create();
    }
}
