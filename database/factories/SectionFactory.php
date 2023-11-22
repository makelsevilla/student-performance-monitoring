<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random user with the role of 'teacher' to be the adviser
        $adviser = User::where('role', 'teacher')->inRandomOrder()->first();

        return [
            'adviser_id' => $adviser->id,
            'name' => fake()->unique()->word, // Generate a unique name
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
