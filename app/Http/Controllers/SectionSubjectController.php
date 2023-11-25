<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionSubjectRequest;
use App\Models\SectionSubject;
use Illuminate\Http\Request;
use Illuminate\Session\Store;
use Inertia\Inertia;

class SectionSubjectController extends Controller
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
    public function store(StoreSectionSubjectRequest $request)
    {
        SectionSubject::create($request->validated());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(SectionSubject $sectionSubject)
    {
        // get the subject section assessments
        $per_grading_period_assessments = [];

        $periods = ["1" => "first_grading_period", "2" => "second_grading_period", "3" => "third_grading_period", "4" => "fourth_grading_period"];
        foreach ($periods as $key => $value) {
            $per_grading_period_assessments[$value] = [
                "quizzes" => $sectionSubject->byPeriodAndTypeAssessments($key, "quiz")->select("id", "name", "total")->get(),
                "tasks" => $sectionSubject->byPeriodAndTypeAssessments($key, "task")->select("id", "name", "total")->get(),
                "exams" => $sectionSubject->byPeriodAndTypeAssessments($key, "exam")->select("id", "name", "total")->get()
            ];
        }

        return Inertia::render("Teacher/SubjectDetails", [
            "subject" => $sectionSubject->load(["section"]),
            "periodicAssessments" => $per_grading_period_assessments,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SectionSubject $sectionSubject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SectionSubject $sectionSubject)
    {
        // updating the weight of the assessments
        $rules = [
            "exam_weight" => "required|integer|between:0,100",
            "task_weight" => "required|integer|between:0,100",
            "quiz_weight" => "required|integer|between:0,100",
        ];

        $messages = [
            "sum" => "The sum of the assessment weights must be 100."
        ];

        $validator = \Validator::make($request->all(), $rules, $messages);
        $validator->after(function ($validator) use ($request) {
            $sum = $request->input('exam_weight') + $request->input('task_weight') + $request->input('quiz_weight');
            if ($sum !== 100) {
                $validator->errors()->add('sum', 'The sum of the assessment weights must be 100.');
            }
        });

        // Check if the validation fails
        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }


        // Continue with your logic if validation passes
        $sectionSubject->update($validator->validated());

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SectionSubject $sectionSubject)
    {
        $sectionSubject->delete();
        return back();
    }
}
