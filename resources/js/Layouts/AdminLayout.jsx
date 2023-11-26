import { Button } from "@/Components/ui/button.jsx";
import { Icons } from "@/Components/Icons.jsx";
import { Link } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen flex-col p-4">
            <Button className="mb-2 sm:hidden" variant="ghost" size="icon">
                <Icons.sidebar className="h-6 w-6" />
            </Button>

            <div className="h-full rounded-lg border sm:grid sm:grid-cols-[256px_1fr]">
                <aside className=" hidden rounded-l-lg bg-green-400 p-4 text-white shadow sm:flex sm:flex-col">
                    <Link href="/admin" className="mb-4 space-y-4 text-center">
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
                                <Link href={route("admin.users.index")}>
                                    <Icons.users className="h-5 w-5" />
                                    <span className="ps-3">Users</span>
                                </Link>
                            </Button>
                        </li>
                    </ul>

                    {/*    sidebar footer */}
                    <ul className="mt-auto space-y-2 font-medium">
                        <li>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-lg"
                                asChild
                            >
                                <Link href={route("profile.edit")}>
                                    <Icons.settings className="h-5 w-5" />
                                    <span className="ps-3">Settings</span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                className="w-full justify-start text-lg hover:bg-destructive hover:text-destructive-foreground"
                                asChild
                            >
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <Icons.logout className="h-5 w-5" />
                                    <span className="ps-3">Log out</span>
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </aside>

                <main className="h-full overflow-auto p-4">{children}</main>
            </div>
        </div>
    );
}
