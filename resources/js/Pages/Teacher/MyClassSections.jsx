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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog.jsx";
import { Separator } from "@/Components/ui/separator.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input.jsx";
import InputError from "@/Components/InputError.jsx";

export default function MyClassSections() {
    return (
        <TeacherLayout>
            <PageHeader
                heading="My Class Sections"
                text="Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, voluptatibus."
            >
                <CreateClassSectionModal>
                    <Button size="sm" className="ml-auto text-xs">
                        Add Section
                    </Button>
                </CreateClassSectionModal>
            </PageHeader>
            <div className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-24">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Section Name</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Icons.moreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </TeacherLayout>
    );
}

function CreateClassSectionModal({ children }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Create class section
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <form>
                    {/*First Row*/}
                    <div className="flex">
                        <div className="w-full space-y-1.5">
                            <Label>Section Name</Label>
                            <Input required />
                            <InputError message="This field is required" />
                        </div>
                    </div>

                    {/*Form Footer*/}
                    <div className="mt-4 flex justify-end">
                        <Button>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
