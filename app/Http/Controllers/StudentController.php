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
        $subjects = $student->section->sectionSubjects()->get();

        $subjectGrades = $subjects->map(function ($sectionSubject) use ($student) {
            $per_quarter_grades = [];
            $periods = [1 => "first_quarter", 2 => "second_quarter", 3 => "third_quarter", 4 => "fourth_quarter"];
            foreach ($periods as $period => $period_txt) {
                $initialGrade = null;

                $types = ["quiz", "task", "exam"];
                foreach ($types as $type) {
                    $typed_assessments = $sectionSubject->byPeriodAndTypeAssessments($period, $type)->get();
                    $typed_assessments_count = $typed_assessments->count();
                    $type_weight = $sectionSubject->typeWeight($type);

                    // get the sum of assessment total
                    $assessments_total = $typed_assessments->sum((function ($assessment) {
                        return $assessment->total;
                    }));

                    $student_scores = $typed_assessments->map(function ($assessment) use ($student) {
                        return $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                    });


                    $score_sum = 0;
                    foreach ($student_scores as $score) {
                        if ($score) {
                            $score_sum += $score;
                        }
                    }

                    if ($typed_assessments_count > 0 && $type_weight && count($student_scores) > 0 && $assessments_total && $score_sum > 0) {
                        $weighted_score = $score_sum / $assessments_total * $type_weight;
                        $initialGrade += $weighted_score;
                    }


                }

                if ($initialGrade === null)
                    $per_quarter_grades[$period_txt] = null;
                else
                    $per_quarter_grades[$period_txt] = $this->transmuteInitGrade($initialGrade);
            }

            // compute the final grade
            $finalGradeAvg = null;
            foreach ($per_quarter_grades as $quarter => $grade) {
                if ($grade === null) {
                    $finalGradeAvg = null;
                    break;
                }

                if ($finalGradeAvg === null) {
                    $finalGradeAvg = $grade / 4;
                } else {
                    $finalGradeAvg += $grade / 4;
                }
            }

            $remark = "";
            if ($finalGradeAvg !== null) {
                if ($finalGradeAvg >= 75) {
                    $remark = "Passed";
                } else {
                    $remark = "Failed";
                }
            }

            return array_merge($sectionSubject->toArray(), $per_quarter_grades, ["final_grade" => $finalGradeAvg, "remark" => $remark]);
        });


        $subjectsBreakdown = $subjects->map(function ($sectionSubject) use ($student) {
            $periods = ["1" => "first_grading_period", "2" => "second_grading_period", "3" => "third_grading_period", "4" => "fourth_grading_period"];
            $per_grading_period_assessments = [];

            foreach ($periods as $key => $value) {
                $per_grading_period_assessments[$value] = [
                    "quizzes" => $sectionSubject->byPeriodAndTypeAssessments($key, "quiz")->select("id", "name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    }),
                    "tasks" => $sectionSubject->byPeriodAndTypeAssessments($key, "task")->select("id", "name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    }),
                    "exams" => $sectionSubject->byPeriodAndTypeAssessments($key, "exam")->select("id", "name", "total")->get()->map(function ($assessment) use ($student) {
                        $score = $assessment->studentAssessmentScores()->where("student_id", $student->id)->first()?->score;
                        return array_merge($assessment->toArray(), ["score" => $score]);
                    })
                ];
            }

            return array_merge($sectionSubject->toArray(), ["per_grading_period_assessments" => $per_grading_period_assessments]);
        });;

        // get the overall grade of student in every subject (per grading period)


        return Inertia::render("Teacher/StudentPerformance", [
            "student" => $student,
            "subjects" => $subjects,
            "subjectsBreakdown" => $subjectsBreakdown,
            "subjectGrades" => $subjectGrades,
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

    private function transmuteInitGrade($initialGrade)
    {
        if ($initialGrade == 100) {
            return 100;
        } elseif (98.4 <= $initialGrade && $initialGrade <= 99.99) {
            return 99;
        } elseif (96.8 <= $initialGrade && $initialGrade <= 98.39) {
            return 98;
        } elseif (95.2 <= $initialGrade && $initialGrade <= 96.79) {
            return 97;
        } elseif (93.6 <= $initialGrade && $initialGrade <= 95.19) {
            return 96;
        } elseif (92.0 <= $initialGrade && $initialGrade <= 93.59) {
            return 95;
        } elseif (90.4 <= $initialGrade && $initialGrade <= 91.99) {
            return 94;
        } elseif (88.8 <= $initialGrade && $initialGrade <= 90.39) {
            return 93;
        } elseif (87.2 <= $initialGrade && $initialGrade <= 88.79) {
            return 92;
        } elseif (85.6 <= $initialGrade && $initialGrade <= 87.19) {
            return 91;
        } elseif (84.0 <= $initialGrade && $initialGrade <= 85.59) {
            return 90;
        } elseif (82.4 <= $initialGrade && $initialGrade <= 83.99) {
            return 89;
        } elseif (80.8 <= $initialGrade && $initialGrade <= 82.39) {
            return 88;
        } elseif (79.2 <= $initialGrade && $initialGrade <= 80.79) {
            return 87;
        } elseif (77.6 <= $initialGrade && $initialGrade <= 79.19) {
            return 86;
        } elseif (76.0 <= $initialGrade && $initialGrade <= 77.59) {
            return 85;
        } elseif (74.4 <= $initialGrade && $initialGrade <= 75.99) {
            return 84;
        } elseif (72.8 <= $initialGrade && $initialGrade <= 74.39) {
            return 83;
        } elseif (71.2 <= $initialGrade && $initialGrade <= 72.79) {
            return 82;
        } elseif (69.6 <= $initialGrade && $initialGrade <= 71.19) {
            return 81;
        } elseif (68.0 <= $initialGrade && $initialGrade <= 69.59) {
            return 80;
        } elseif (61.6 <= $initialGrade && $initialGrade <= 63.19) {
            return 76;
        } elseif (60.0 <= $initialGrade && $initialGrade <= 61.59) {
            return 75;
        } elseif (56.0 <= $initialGrade && $initialGrade <= 59.99) {
            return 74;
        } elseif (52.0 <= $initialGrade && $initialGrade <= 55.99) {
            return 73;
        } elseif (48.0 <= $initialGrade && $initialGrade <= 51.99) {
            return 72;
        } elseif (44.0 <= $initialGrade && $initialGrade <= 47.99) {
            return 71;
        } elseif (40.0 <= $initialGrade && $initialGrade <= 43.99) {
            return 70;
        } elseif (36.0 <= $initialGrade && $initialGrade <= 39.99) {
            return 69;
        } elseif (32.0 <= $initialGrade && $initialGrade <= 35.99) {
            return 68;
        } elseif (28.0 <= $initialGrade && $initialGrade <= 31.99) {
            return 67;
        } elseif (24.0 <= $initialGrade && $initialGrade <= 27.99) {
            return 66;
        } elseif (20.0 <= $initialGrade && $initialGrade <= 23.99) {
            return 65;
        } elseif (16.0 <= $initialGrade && $initialGrade <= 19.99) {
            return 64;
        } elseif (12.0 <= $initialGrade && $initialGrade <= 15.99) {
            return 63;
        } elseif (8.0 <= $initialGrade && $initialGrade <= 11.99) {
            return 62;
        } elseif (4.0 <= $initialGrade && $initialGrade <= 7.99) {
            return 61;
        } elseif (0.0 <= $initialGrade && $initialGrade <= 3.99) {
            return 60;
        } else {
            return null;
        }
    }
}
