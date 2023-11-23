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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select.jsx";
import useApi from "@/Components/useApi.js";

export default function CreateSectionSubjectModal({ sectionId, children }) {
    const [showModal, setShowModal] = useState(false);
    const { data: teachers } = useApi({ url: "/user/teachers", method: "get" });
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        teacher_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        data.section_id = sectionId;
        post(route("teacher.subjects.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset("name", "teacher_id");
            },
        });
    };
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Add Section Subject
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/*First Row*/}
                    <div className="w-full space-y-1.5">
                        <Label>Subject name</Label>
                        <Input
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="w-full space-y-1.5">
                        <Label>Subject teacher</Label>
                        <Select
                            value={data.teacher_id}
                            onValueChange={(value) =>
                                setData("teacher_id", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers?.map((teacher) => (
                                    <SelectItem
                                        key={teacher.id}
                                        value={`${teacher.id}`}
                                    >
                                        {teacher.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.teacher_id} />
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
