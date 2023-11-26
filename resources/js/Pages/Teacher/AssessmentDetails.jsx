import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table.jsx";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Input } from "@/Components/ui/input.jsx";
import { Button } from "@/Components/ui/button.jsx";

export default function AssessmentDetails({ assessment }) {
    return (
        <TeacherLayout>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Assessment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>
                            <span className="font-bold">Name:</span>{" "}
                            <span className="capitalize">
                                {assessment.name}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Type:</span>{" "}
                            <span className="capitalize">
                                {assessment.type}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Total:</span>{" "}
                            <span className="capitalize">
                                {assessment.total}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Grading Period:</span>{" "}
                            <span className="capitalize">
                                {assessment.grading_period}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Subject:</span>{" "}
                            <span className="capitalize">
                                {assessment.section_subject.name}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Section:</span>{" "}
                            <span className="capitalize">
                                {assessment.section_subject.section.name}
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Student Assessment Scores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StudentScoresTableForm
                            studentsScore={
                                assessment?.section_subject?.section?.students
                            }
                            assessmentId={assessment.id}
                            assessmentTotal={assessment.total}
                        />
                    </CardContent>
                </Card>
            </div>
        </TeacherLayout>
    );
}

function StudentScoresTableForm({
    studentsScore,
    assessmentId,
    assessmentTotal,
}) {
    const { data, setData, put, processing, errors, reset, transform } =
        useForm({});

    transform((data) => {
        // transform data to array student_scores = [{student_id: 1, score: 1}, {student_id: 2, score: 2}]
        const student_scores = Object.keys(data).map((studentId) => {
            return {
                student_id: studentId,
                score: data[studentId],
            };
        });

        return { student_scores };
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("teacher.assessments.update", assessmentId));
    };

    useEffect(() => {
        const data = {};

        studentsScore.forEach((student) => {
            if (student.student_assessment_scores.length > 0) {
                data[student.id] = student.student_assessment_scores[0].score;
            }
        });

        setData(data);
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student name</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentsScore.map((student, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                                <Input
                                    className="w-24"
                                    value={
                                        data?.[student.id] !== undefined
                                            ? data[student.id]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        let value = parseInt(e.target.value);
                                        if (isNaN(value)) {
                                            value = 0;
                                        }
                                        if (value > assessmentTotal) {
                                            value = assessmentTotal;
                                        }

                                        if (value < 0) {
                                            value = 0;
                                        }

                                        setData(`${student.id}`, value);
                                    }}
                                    type="number"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex">
                <Button className="ml-auto">Save Scores</Button>
            </div>
        </form>
    );
}
