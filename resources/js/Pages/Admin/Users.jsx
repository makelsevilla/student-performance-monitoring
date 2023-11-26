import AdminLayout from "@/Layouts/AdminLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table.jsx";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
} from "@/Components/ui/dialog.jsx";
import { useState } from "react";
import { Button } from "@/Components/ui/button.jsx";
import { Link } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog.jsx";

export default function Users({ users }) {
    console.log(users);
    return (
        <AdminLayout>
            <PageHeader heading="Manage Users">
                <Button size="sm" className="ml-auto text-xs" asChild>
                    <Link href={route("admin.users.create")}>Add User</Link>
                </Button>
            </PageHeader>

            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="border-none">
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.created_at}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            className="text-sm text-blue-500 hover:text-blue-700"
                                        >
                                            <Link
                                                href={route(
                                                    "admin.users.edit",
                                                    user.id,
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        </button>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <button
                                                    type="button"
                                                    className="text-sm text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    Delete User
                                                </AlertDialogHeader>
                                                <AlertDialogDescription>
                                                    Are you sure you want to
                                                    delete this user? This
                                                    action is irreversible.
                                                </AlertDialogDescription>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="hover:bg-destructive hover:text-destructive-foreground"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                "admin.users.destroy",
                                                                user.id,
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
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}
