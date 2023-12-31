import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Icons } from "@/Components/Icons.jsx";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    {/*<ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />*/}
                    <Icons.dashboard className="h-20 w-20 text-green-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-green-400 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
