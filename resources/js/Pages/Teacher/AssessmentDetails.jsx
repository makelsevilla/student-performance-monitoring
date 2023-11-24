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
    console.log(assessment);

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
    const { data, setData, put, processing, errors, reset } = useForm({});

    useEffect(() => {
        const data = {};

        studentsScore.forEach((student) => {
            if (student.student_assessment_scores.length > 0) {
                data[student.id] = student.student_assessment_scores[0];
            }
        });

        setData(data);
    }, []);
    console.log(data);

    return (
        <form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student name</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentsScore.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                                <Input
                                    className="w-24"
                                    value={
                                        data?.[student.id]
                                            ? data[student.id]
                                            : ""
                                    }
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (value > assessmentTotal) {
                                            value = assessmentTotal;
                                        }

                                        setData(`${student.id}`, value);
                                    }}
                                    type="number"
                                />
                                {student.student_assessment_scores[0]}
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
