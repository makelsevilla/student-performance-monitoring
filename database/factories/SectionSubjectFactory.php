<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SectionSubject>
 */
class SectionSubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $section = Section::inRandomOrder()->first();
        $teacher = User::where('role', 'teacher')->inRandomOrder()->first();

        return [
            'section_id' => $section->id,
            'teacher_id' => $teacher->id,
            'name' => fake()->word,
        ];
    }
}
