import { Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input.jsx";
import InputError from "@/Components/InputError.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select.jsx";
import { Button } from "@/Components/ui/button.jsx";

export default function CreateEditUser({ user }) {
    const { data, setData, errors, post, put, processing, reset } = useForm({
        name: user?.name || "",
        username: user?.username || "",
        role: user?.role || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user?.id) {
            put(route("admin.users.update", user.id));
        } else {
            post(route("admin.users.store"));
        }
    };

    return (
        <AdminLayout>
            <PageHeader heading="Create/Edit User" />
            <form onSubmit={handleSubmit} className="mt-4 space-y-8">
                <div className="grid gap-1.5">
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-1.5">
                    <Label>Username</Label>
                    <Input
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                    />
                    <InputError message={errors.username} />
                </div>

                <div className="grid gap-1.5">
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <p className="text-muted-foreground">
                        If editing, leave the password blank to retain the old
                        password.
                    </p>
                    <p className="text-muted-foreground">
                        Filling this field would update the password
                    </p>
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-1.5">
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </div>

                <div className="grid gap-1.5">
                    <Label>Role</Label>
                    <Select
                        value={data.role}
                        onValueChange={(val) => setData("role", val)}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.role} />
                </div>
                <div className="flex gap-4">
                    <Button>Create / Update</Button>
                    <Button variant="secondary">
                        <Link href={route("admin.users.index")}>Cancel</Link>
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
