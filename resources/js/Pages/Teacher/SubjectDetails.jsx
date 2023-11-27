import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/tabs.jsx";
import { replaceUnderscoresWithSpaces } from "@/lib/utils.js";
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
import { Button } from "@/Components/ui/button.jsx";
import { Icons } from "@/Components/Icons.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog.jsx";
import { Link, useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog.jsx";
import { Label } from "@/Components/ui/label.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select.jsx";
import { Input } from "@/Components/ui/input.jsx";
import InputError from "@/Components/InputError.jsx";
import { useState } from "react";
import GeneralAverageBadge from "@/Components/GeneralAverageBadge.jsx";

export default function SubjectDetails({ subject, periodicAssessments }) {
    console.log(periodicAssessments);

    return (
        <TeacherLayout>
            <PageHeader
                heading={
                    <div>
                        <span className="capitalize">{subject.name}</span>
                        <p className="text-lg capitalize">
                            Section: {subject?.section?.name}
                        </p>
                    </div>
                }
            />
            <div className="mt-4">
                <PageHeader heading="Assessments">
                    <CreateAssessmentModal subjectId={subject.id}>
                        <Button className="ml-auto text-xs" size="sm">
                            Add Assessment
                        </Button>
                    </CreateAssessmentModal>
                </PageHeader>
                <div>
                    <div className="mb-4">
                        <AssessmentTypeWeightsForm subject={subject} />
                    </div>
                    <AssessmentsTab periodicAssessments={periodicAssessments} />
                </div>
            </div>
        </TeacherLayout>
    );
}

function AssessmentTypeWeightsForm({
    subject: { id, quiz_weight, exam_weight, task_weight },
}) {
    const { data, setData, put, processing, errors } = useForm({
        quiz_weight: quiz_weight,
        exam_weight: exam_weight,
        task_weight: task_weight,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("teacher.subjects.update", id));
    };
    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        Assessment Type Weights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="w-fit">
                        <TableBody>
                            {[
                                { label: "Quiz", name: "quiz_weight" },
                                { label: "Exam", name: "exam_weight" },
                                { label: "Task", name: "task_weight" },
                            ].map(({ label, name }) => (
                                <TableRow key={label}>
                                    <TableCell className="font-bold">
                                        {label}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={data[name]}
                                            onChange={(e) => {
                                                setData(
                                                    `${name}`,
                                                    e.target.value,
                                                );
                                            }}
                                            className="w-24"
                                            type="number"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="text-muted-foreground">
                        Sum of 3 assessment types should equal to 100
                    </p>
                    {Object.entries(errors).map(([key, message]) => (
                        <InputError key={key} message={message} />
                    ))}
                    <div>
                        <Button disabled={processing}>Save</Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

function CreateAssessmentModal({ subjectId, children }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        total: "",
        grading_period: "",
        type: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.section_subject_id = subjectId;
        post(route("teacher.assessments.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Assessment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-8">
                        <div className="space-y-1.5">
                            <Label>Type</Label>
                            <Select
                                value={data.type}
                                onValueChange={(val) => setData("type", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Assessment type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="quiz">
                                        <span>Quiz</span>
                                    </SelectItem>
                                    <SelectItem value="exam">
                                        <span>Exam</span>
                                    </SelectItem>
                                    <SelectItem value="task">
                                        <span>Task</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Grading Period</Label>
                            <Select
                                value={data.grading_period}
                                onValueChange={(val) =>
                                    setData("grading_period", val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Grading Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">
                                        <span>First Grading Period</span>
                                    </SelectItem>
                                    <SelectItem value="2">
                                        <span>Second Grading Period</span>
                                    </SelectItem>
                                    <SelectItem value="3">
                                        <span>Third Grading Period</span>
                                    </SelectItem>
                                    <SelectItem value="4">
                                        <span>Fourth Grading Period</span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.grading_period} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Total</Label>
                            <Input
                                value={data.total}
                                onChange={(e) =>
                                    setData("total", e.target.value)
                                }
                                type="number"
                            />
                            <InputError message={errors.total} />
                        </div>
                        <div className="flex">
                            <Button className="ml-auto">Add</Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function AssessmentsTab({ periodicAssessments }) {
    const [currentTab, setCurrentTab] = useState("first_grading_period");

    return (
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
                {Object.keys(periodicAssessments).map((period) => (
                    <TabsTrigger
                        key={period}
                        value={period}
                        className="capitalize"
                    >
                        {replaceUnderscoresWithSpaces(period)}
                    </TabsTrigger>
                ))}
            </TabsList>

            {Object.entries(periodicAssessments).map(
                ([period, assessments]) => (
                    <TabsContent
                        value={period}
                        key={period}
                        className="space-y-8"
                    >
                        {Object.entries(assessments).map(
                            ([type, assessmentsDetail], index) => {
                                if (type === "studentScores") {
                                    const studentScores = assessmentsDetail;

                                    return (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>
                                                    Student Scores
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="overflow-auto">
                                                <Table className="border">
                                                    <TableHeader>
                                                        <TableRow>
                                                            {studentScores?.head.map(
                                                                (head, idx) => (
                                                                    <TableHead
                                                                        className="border bg-secondary text-center text-xl font-bold uppercase"
                                                                        key={
                                                                            idx
                                                                        }
                                                                        colSpan={
                                                                            head.subHeader
                                                                                ? head
                                                                                      .subHeader
                                                                                      .length ||
                                                                                  1
                                                                                : 1
                                                                        }
                                                                    >
                                                                        {
                                                                            head.header
                                                                        }
                                                                    </TableHead>
                                                                ),
                                                            )}
                                                        </TableRow>

                                                        {/*Sub Headers*/}
                                                        <TableRow>
                                                            {studentScores?.head.map(
                                                                (head, idx) => {
                                                                    {
                                                                        if (
                                                                            head.subHeader &&
                                                                            head
                                                                                .subHeader
                                                                                .length >
                                                                                0
                                                                        ) {
                                                                            return head.subHeader.map(
                                                                                (
                                                                                    subHead,
                                                                                    idx,
                                                                                ) => (
                                                                                    <TableHead
                                                                                        className="border text-center"
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                    >
                                                                                        <div>
                                                                                            {
                                                                                                subHead.assessmentName
                                                                                            }
                                                                                        </div>
                                                                                        <div className="mt-1">
                                                                                            {
                                                                                                subHead.assessmentTotal
                                                                                            }
                                                                                        </div>
                                                                                    </TableHead>
                                                                                ),
                                                                            );
                                                                        }

                                                                        return (
                                                                            <TableHead
                                                                                key={
                                                                                    idx
                                                                                }
                                                                            ></TableHead>
                                                                        );
                                                                    }
                                                                },
                                                            )}
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {studentScores?.body.map(
                                                            (body, idx) => (
                                                                <TableRow
                                                                    key={idx}
                                                                >
                                                                    {body.map(
                                                                        (
                                                                            item,
                                                                            idx,
                                                                        ) => (
                                                                            <TableCell
                                                                                className="border text-center"
                                                                                key={
                                                                                    idx
                                                                                }
                                                                            >
                                                                                {idx ===
                                                                                body.length -
                                                                                    1 ? (
                                                                                    <GeneralAverageBadge
                                                                                        generalAverage={
                                                                                            item
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    item
                                                                                )}
                                                                            </TableCell>
                                                                        ),
                                                                    )}
                                                                </TableRow>
                                                            ),
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    );
                                }

                                return (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="capitalize">
                                                {type}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table className="w-fit">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Name
                                                        </TableHead>
                                                        <TableHead>
                                                            Total
                                                        </TableHead>
                                                        <TableHead>
                                                            Action
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {assessmentsDetail.map(
                                                        (assessment) => (
                                                            <TableRow
                                                                key={
                                                                    assessment.id
                                                                }
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        assessment.name
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        assessment.total
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex items-center">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            asChild
                                                                        >
                                                                            <Link
                                                                                href={route(
                                                                                    "teacher.assessments.show",
                                                                                    assessment.id,
                                                                                )}
                                                                            >
                                                                                <Icons.clipboardEdit className="h-4 w-4" />
                                                                            </Link>
                                                                        </Button>

                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    className="hover:bg-destructive hover:text-destructive-foreground"
                                                                                >
                                                                                    <Icons.trash className="h-4 w-4" />
                                                                                </Button>
                                                                            </AlertDialogTrigger>
                                                                            <AlertDialogContent>
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogHeader>
                                                                                        Are
                                                                                        you
                                                                                        sure
                                                                                        you
                                                                                        want
                                                                                        to
                                                                                        delete
                                                                                        this
                                                                                        assessment?
                                                                                    </AlertDialogHeader>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>
                                                                                        Cancel
                                                                                    </AlertDialogCancel>
                                                                                    <AlertDialogAction
                                                                                        className="bg-destructive"
                                                                                        asChild
                                                                                    >
                                                                                        <Link
                                                                                            href={route(
                                                                                                "teacher.assessments.destroy",
                                                                                                assessment.id,
                                                                                            )}
                                                                                            method="delete"
                                                                                            as="button"
                                                                                        >
                                                                                            Delete
                                                                                        </Link>
                                                                                    </AlertDialogAction>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ),
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                );
                            },
                        )}
                    </TabsContent>
                ),
            )}
        </Tabs>
    );
}
