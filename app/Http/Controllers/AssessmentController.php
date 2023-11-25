<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\StudentAssessmentScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'section_subject_id' => 'required|exists:section_subjects,id',
            'type' => 'required|in:quiz,exam,task',
            'name' => 'required|string',
            'total' => 'required|integer',
            'grading_period' => 'required|integer|between:1,4',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }

        Assessment::create($validator->validated());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Assessment $assessment)
    {
        $assessment->load(["sectionSubject" => ["section" => ["students" => ["studentAssessmentScores" => function ($query) use ($assessment) {
            $query->where("assessment_id", $assessment->id);
        }]]]]);
        return Inertia::render("Teacher/AssessmentDetails", ["assessment" => $assessment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assessment $assessment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Assessment $assessment)
    {
        // update the student_scores
        $validated = $request->validate([
            'student_scores' => 'required|array',
            'student_scores.*.student_id' => 'required|exists:students,id',
            'student_scores.*.score' => 'integer',
        ]);

        // iterate over the student_scores and update the score
        foreach ($validated['student_scores'] as $student_score) {
            DB::table("student_assessment_scores")->updateOrInsert([
                "student_id" => $student_score["student_id"],
                "assessment_id" => $assessment->id,
            ], [
                "score" => $student_score["score"],
            ]);
        }

        return back();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assessment $assessment)
    {
        $assessment->delete();

        return back();
    }
}
