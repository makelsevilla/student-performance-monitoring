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
        Schema::create('student_assessment_scores', function (Blueprint $table) {
            $table->foreignId("student_id")->constrained()->cascadeOnDelete();
            $table->foreignId("assessment_id")->constrained()->cascadeOnDelete();
            $table->integer("score")->default(0);

            $table->unique(["student_id", "assessment_id"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_assessment_scores');
    }
};
