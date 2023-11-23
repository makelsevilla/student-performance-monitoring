import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import { Separator } from "@/Components/ui/separator.jsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select.jsx";
import { useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs.jsx";
import { replaceUnderscoresWithSpaces } from "@/lib/utils.js";
import { Card } from "@/Components/ui/card.jsx";

export default function StudentPerformance({
    student,
    subjects,
    subjectsBreakdown,
}) {
    const [selectedSubject, setSelectedSubject] = useState(null);

    return (
        <TeacherLayout>
            <PageHeader heading="Student Performance" />
            <div className="mt-4">
                {/*Display the student name*/}
                <h1 className="text-xl font-bold">
                    Student Name: <span className="italic">{student.name}</span>
                </h1>
                <Separator className="mb-6" />
                {/*Display the student's performance*/}
                <div className="container">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary">
                                <TableHead>
                                    <span className="font-bold">
                                        Subject Name
                                    </span>
                                </TableHead>
                                <TableHead>
                                    1<sup>st</sup> Period
                                </TableHead>
                                <TableHead>
                                    2<sup>nd</sup> Period
                                </TableHead>
                                <TableHead>
                                    3<sup>rd</sup> Period
                                </TableHead>
                                <TableHead>
                                    4<sup>th</sup> Period
                                </TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Remark</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>subj name</TableCell>
                                <TableCell>80</TableCell>
                                <TableCell>80</TableCell>
                                <TableCell>80</TableCell>
                                <TableCell>80</TableCell>
                                <TableCell>80</TableCell>
                                <TableCell>Passed</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableCaption>Student Overall Perfomance</TableCaption>
                    </Table>
                </div>

                <div className="mt-8">
                    <h1 className="text-xl font-bold">Subject Breakdown</h1>
                    <div className="mt-4">
                        <Select
                            onValueChange={(value) => setSelectedSubject(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select subject to view" />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects?.map((subject) => (
                                    <SelectItem
                                        key={subject.id}
                                        value={subject.id}
                                    >
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Subject breakdown tab*/}
                        {selectedSubject ? (
                            <div className="mt-8">
                                <SubjectBreakdownTab
                                    subject={subjectsBreakdown.find(
                                        (subject) =>
                                            subject.id ===
                                            parseInt(selectedSubject),
                                    )}
                                />
                            </div>
                        ) : (
                            <div className="mt-4">
                                <h1 className="text-muted-foreground">
                                    no subject selected
                                </h1>
                            </div>
                        )}

                        <div></div>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}

function SubjectBreakdownTab({ subject }) {
    console.log(subject);

    return (
        <div className="flex justify-center">
            <Tabs>
                <TabsList>
                    {Object.keys(subject.per_grading_period_assessments).map(
                        (period) => (
                            <TabsTrigger key={period} value={period}>
                                <span className="capitalize">
                                    {replaceUnderscoresWithSpaces(period)}
                                </span>
                            </TabsTrigger>
                        ),
                    )}
                </TabsList>
                {Object.entries(subject.per_grading_period_assessments).map(
                    ([period, assessments]) => (
                        <TabsContent value={period} className="space-y-8">
                            <Card>
                                {Object.entries(assessments).map(
                                    ([assessment, results]) => (
                                        <div className="p-4">
                                            <h1 className="text-xl capitalize">
                                                {assessment}
                                            </h1>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Name
                                                        </TableHead>
                                                        <TableHead>
                                                            Total
                                                        </TableHead>
                                                        <TableHead>
                                                            Score
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {results.map((result) => (
                                                        <TableRow>
                                                            <TableCell>
                                                                {result.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {result.total}
                                                            </TableCell>
                                                            <TableCell>
                                                                {result.score}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ),
                                )}
                            </Card>
                        </TabsContent>
                    ),
                )}
            </Tabs>
        </div>
    );
}
