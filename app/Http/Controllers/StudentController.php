<?php

namespace App\Http\Controllers;

use App\Models\SectionSubject;
use App\Models\Student;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
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
        $validated = $request->validate([
            "name" => "required|string|max:255",
            "section_id" => "required|exists:sections,id",
        ]);

        Student::create($validated);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        // get the section subjects of the student
        $subjects = $student->section->sectionSubjects()->select("id", "name")->get();

        $subjectsBreakdown = $subjects->map(function ($sectionSubject) use ($student) {
            $periods = ["1" => "first_grading_period", "2" => "second_grading_period", "3" => "third_grading_period", "4" => "fourth_grading_period"];
            $per_grading_period_assessments = [];

            foreach ($periods as $key => $value) {
                $per_grading_period_assessments[$value] = [
                    "quizzes" => $sectionSubject->byPeriodAndTypeAssessments($key, "quiz")->select("id", "name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    }),
                    "tasks" => $sectionSubject->byPeriodAndTypeAssessments($key, "task")->select("name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    }),
                    "exams" => $sectionSubject->byPeriodAndTypeAssessments($key, "exam")->select("name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    })
                ];
            }

            return array_merge($sectionSubject->toArray(), ["per_grading_period_assessments" => $per_grading_period_assessments]);
        });;


        return Inertia::render("Teacher/StudentPerformance", [
            "student" => $student,
            "subjects" => $subjects,
            "subjectsBreakdown" => $subjectsBreakdown,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return back();
    }
}
