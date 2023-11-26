<?php

namespace App\Models;

use App\Http\Controllers\StudentController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'section_id',
        'name',
    ];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public function studentAssessmentScores(): HasMany
    {
        return $this->hasMany(StudentAssessmentScore::class);
    }

    public function getPerSubjectGrades()
    {
        // get the section subjects of the student
        $subjects = $this->section->sectionSubjects()->get();

        $student = $this;
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
                    $per_quarter_grades[$period_txt] = StudentController::transmuteInitGrade($initialGrade);
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

        return $subjectGrades;
    }

    public function generalAverage()
    {
        $subjectGrades = $this->getPerSubjectGrades();
        $grades = $subjectGrades->map(function ($subjectGrade) {
            return $subjectGrade["final_grade"];
        });

        $filtered_grades = $grades->filter(function ($grade) {
            return $grade !== null;
        });

        if ($grades->count() > 0) {
            return round($filtered_grades->sum() / $grades->count());
        } else {
            return null;
        }
    }
}
