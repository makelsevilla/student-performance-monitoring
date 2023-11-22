<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subject_quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId("section_subject_id")->constrained("section_subjects");
            $table->string("name");
            $table->integer("total_score");
            $table->integer("grading_period");

            $table->unique(["section_subject_id", "name"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_quizzes');
    }
};
