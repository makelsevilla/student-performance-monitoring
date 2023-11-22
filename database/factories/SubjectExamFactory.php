<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubjectExam>
 */
class SubjectExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random section_subject
        $sectionSubject = \DB::table("section_subjects")->inRandomOrder()->first();

        return [
            'section_subject_id' => $sectionSubject->id,
            'name' => fake()->word,
            'total_score' => fake()->numberBetween(50, 100),
            'grading_period' => fake()->numberBetween(1, 4),
        ];
    }
}
