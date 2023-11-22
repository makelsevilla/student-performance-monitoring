import { Button } from "@/Components/ui/button.jsx";
import { Icons } from "@/Components/Icons.jsx";
import { Link } from "@inertiajs/react";

export default function TeacherLayout({ children }) {
    return (
        <div className="flex h-screen flex-col p-4">
            <Button className="mb-2 sm:hidden" variant="ghost" size="icon">
                <Icons.sidebar className="h-6 w-6" />
            </Button>

            <div className="h-full rounded-lg border sm:grid sm:grid-cols-[256px_1fr]">
                <aside className=" hidden rounded-l-lg bg-slate-500 p-4 text-white shadow sm:flex sm:flex-col">
                    <Link href="/" className="mb-4 space-y-4 text-center">
                        <Icons.dashboard className="mx-auto h-12 w-12" />
                        <h1 className="text-xl font-bold">
                            Student Monitoring
                        </h1>
                    </Link>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                asChild
                            >
                                <Link
                                    href={route("teacher.my-classes-sections")}
                                >
                                    <Icons.users className="h-5 w-5" />
                                    <span className="ps-3">Class Sections</span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                            >
                                <Icons.library className="h-5 w-5" />
                                <span className="ps-3">Subjects</span>
                            </Button>
                        </li>
                    </ul>

                    {/*    sidebar footer */}
                    <ul className="mt-auto space-y-2 font-medium">
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                            >
                                <Icons.settings className="h-5 w-5" />
                                <span className="ps-3">Settings</span>
                            </Button>
                        </li>
                        <li>
                            <Button className="w-full justify-start text-lg hover:bg-destructive hover:text-destructive-foreground">
                                <Icons.logout className="h-5 w-5" />
                                <span className="ps-3">Log out</span>
                            </Button>
                        </li>
                    </ul>
                </aside>

                <main className="h-full overflow-auto p-4">{children}</main>
            </div>
        </div>
    );
}
