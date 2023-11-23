import { useForm } from "@inertiajs/react";
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
import { Button } from "@/Components/ui/button.jsx";
import { useState } from "react";

export default function CreateStudentModal({ sectionId, children }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.section_id = sectionId;
        post(route("teacher.students.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset("name");
            },
        });
    };
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Add Section Student
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/*First Row*/}
                    <div className="w-full space-y-1.5">
                        <Label>Student name</Label>
                        <Input
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/*Form Footer*/}
                    <div className="mt-4 flex justify-end">
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
