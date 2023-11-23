<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assessment>
 */
class AssessmentFactory extends Factory
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
            'type' => fake()->randomElement(['quiz', 'exam', 'tasks']),
            'name' => fake()->word,
            'total' => fake()->numberBetween(20, 100),
            'grading_period' => fake()->numberBetween(1, 4),
        ];
    }
}
