import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
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
import { Link } from "@inertiajs/react";

export default function MySubjects({ subjects }) {
    return (
        <TeacherLayout>
            <PageHeader
                heading="My Subjects"
                text="Lists of subject class that you are handling."
            ></PageHeader>
            <div className="mt-4">
                <div>
                    {subjects.length === 0 ? (
                        <div className="text-center text-muted-foreground">
                            No Data Found
                        </div>
                    ) : (
                        <MySubjectsTable subjects={subjects} />
                    )}
                </div>
            </div>
        </TeacherLayout>
    );
}

function MySubjectsTable({ subjects }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <p className="text-lg">Subject name</p>
                        <p className="text-xs text-muted-foreground">
                            Section name
                        </p>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subjects.map((subject) => (
                    <TableRow key={subject.id}>
                        <TableCell>
                            <Link
                                href={route(
                                    "teacher.subjects.show",
                                    subject.id,
                                )}
                            >
                                <p className="text-lg">{subject.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {subject?.section?.name}
                                </p>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
