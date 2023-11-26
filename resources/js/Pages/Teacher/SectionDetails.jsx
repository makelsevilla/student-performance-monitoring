import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion.jsx";
import CreateSectionSubjectModal from "@/Components/CreateSectionSubjectModal.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { Link, router } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/Components/ui/alert-dialog.jsx";
import { useState } from "react";
import CreateStudentModal from "@/Components/CreateStudentModal.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu.jsx";
import { Icons } from "@/Components/Icons.jsx";
import { Label } from "@/Components/ui/label.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select.jsx";

export default function SectionDetails({ section, students }) {
    const [sortStudentsBy, setSortStudentsBy] = useState("name");
    console.log(students);

    return (
        <TeacherLayout>
            <PageHeader
                heading={<span className="capitalize">{section.name}</span>}
            />
            <div className="mt-4">
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="text-xl">Subjects</div>
                        <CreateSectionSubjectModal sectionId={section.id}>
                            <Button size="sm" className="ml-auto text-xs">
                                Add subject
                            </Button>
                        </CreateSectionSubjectModal>
                    </div>
                    <div className="rounded-lg border">
                        {section.section_subjects
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map((subject) => (
                                <div
                                    key={subject.id}
                                    className="group p-4 hover:bg-secondary"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-semibold capitalize text-gray-700">
                                                {subject.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {subject?.teacher?.name}
                                            </div>
                                        </div>

                                        <div className="ml-auto">
                                            <SectionSubjectActions
                                                sectionSubject={subject}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="mt-8 space-y-2">
                    <div className="mt-4 flex">
                        <div className="text-xl">Students</div>
                        <CreateStudentModal sectionId={section.id}>
                            <Button size="sm" className="ml-auto text-xs">
                                Add student
                            </Button>
                        </CreateStudentModal>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                        <Label>Sort:</Label>
                        <Select
                            value={sortStudentsBy}
                            onValueChange={setSortStudentsBy}
                        >
                            <SelectTrigger className="w-fit">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="rank">Rank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-secondary">
                                    <TableHead>#</TableHead>
                                    <TableHead className="whitespace-nowrap">
                                        Student name
                                    </TableHead>
                                    <TableHead className="w-full text-center">
                                        GA
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {students
                                    .sort((a, b) => {
                                        if (sortStudentsBy === "name") {
                                            return a.name.localeCompare(b.name);
                                        } else {
                                            return (
                                                b.general_average -
                                                a.general_average
                                            );
                                        }
                                    })
                                    .map((student, idx) => (
                                        <TableRow
                                            key={student.id}
                                            className="group"
                                        >
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>
                                                <div className="text-sm font-semibold capitalize text-gray-700">
                                                    {student.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <p>{student.general_average}</p>
                                            </TableCell>
                                            <TableCell>
                                                <StudentActions
                                                    student={student}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
}

function SectionSubjectActions({ sectionSubject: { id } }) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    return (
        <>
            <div className="hidden items-center group-hover:flex">
                <Button
                    onClick={() => setShowDeleteAlert(true)}
                    variant="ghost"
                    className="hover:bg-destructive hover:text-destructive-foreground"
                    size="sm"
                >
                    Remove
                </Button>
            </div>
            <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you sure you want to remove this subject?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive" asChild>
                            <Link
                                href={route("teacher.subjects.destroy", id)}
                                method="delete"
                                as="button"
                            >
                                <span>Delete</span>
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

function StudentActions({ student: { id } }) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <Icons.moreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onSelect={() =>
                            router.get(route("teacher.students.show", id))
                        }
                    >
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowDeleteAlert(true)}>
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you sure you want to remove this student?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive" asChild>
                            <Link
                                href={route("teacher.students.destroy", id)}
                                method="delete"
                                as="button"
                            >
                                <span>Delete</span>
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
