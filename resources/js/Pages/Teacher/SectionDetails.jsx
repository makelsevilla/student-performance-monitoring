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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu.jsx";
import { Icons } from "@/Components/Icons.jsx";
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

export default function SectionDetails({ section }) {
    console.log(section);
    return (
        <TeacherLayout>
            <PageHeader
                heading={<span className="capitalize">{section.name}</span>}
            />
            <div className="mt-4">
                <Accordion type="multiple">
                    <AccordionItem value="subjects">
                        <AccordionTrigger>Subjects</AccordionTrigger>
                        <AccordionContent>
                            <div className="rounded-lg border">
                                {section.section_subjects.map((subject) => (
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

                            <div className="mt-4 flex">
                                <CreateSectionSubjectModal
                                    sectionId={section.id}
                                >
                                    <Button
                                        size="sm"
                                        className="ml-auto text-xs"
                                    >
                                        Add subject
                                    </Button>
                                </CreateSectionSubjectModal>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="students">
                        <AccordionTrigger>Students</AccordionTrigger>
                        <AccordionContent>Heyhey</AccordionContent>
                    </AccordionItem>
                </Accordion>
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
