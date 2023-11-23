import PageHeader from "@/Components/PageHeader.jsx";
import { Button } from "@/Components/ui/button.jsx";
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
import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog.jsx";
import { Separator } from "@/Components/ui/separator.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input.jsx";
import InputError from "@/Components/InputError.jsx";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/Components/ui/alert-dialog.jsx";
import { Link, router, useForm } from "@inertiajs/react";

export default function MySections({ sections }) {
    return (
        <TeacherLayout>
            <PageHeader
                heading="My Sections"
                text="Lists of section class that you are handling."
            >
                <CreateSectionModal>
                    <Button size="sm" className="ml-auto text-xs">
                        Add Section
                    </Button>
                </CreateSectionModal>
            </PageHeader>
            <div className="mt-4">
                <div>
                    {sections.length === 0 ? (
                        <div className="text-center text-muted-foreground">
                            No Data Found
                        </div>
                    ) : (
                        <MySectionsTable sections={sections} />
                    )}
                </div>
            </div>
        </TeacherLayout>
    );
}

function MySectionsTable({ sections }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sections.map((section) => (
                    <TableRow key={section.id}>
                        <TableCell>{section.name}</TableCell>
                        <TableCell>
                            <SectionActions section={section} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function SectionActions({ section: { id } }) {
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
                            router.get(
                                route("teacher.sections.show", {
                                    section: id,
                                }),
                            )
                        }
                    >
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setShowDeleteAlert(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        Are you sure you want to delete this section?
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive" asChild>
                            <Link
                                href={route("teacher.sections.destroy", id)}
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

function CreateSectionModal({ children }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({ name: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("teacher.sections.store"), {
            onSuccess: () => {
                setShowModal(false);
                setData("name", "");
            },
        });
    };
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Create Section
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <form onSubmit={handleSubmit}>
                    {/*First Row*/}
                    <div className="flex">
                        <div className="w-full space-y-1.5">
                            <Label>Section name</Label>
                            <Input
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                value={data.name}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>

                    {/*Form Footer*/}
                    <div className="mt-4 flex justify-end">
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
