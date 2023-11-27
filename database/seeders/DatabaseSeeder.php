<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(5)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'username' => 'admin',
            'role' => 'admin'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Bryan Domondon',
            'username' => 'bryandomondon',
            'role' => 'teacher'
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Mary Jane',
            'username' => 'maryjane',
            'role' => 'admin'
        ]);

        /*$this->call([
            SectionSeeder::class,
            SectionSubjectSeeder::class,
            StudentSeeder::class,
            AssessmentSeeder::class,
            StudentAssessmentScoreSeeder::class,
        ]);*/
    }
}
