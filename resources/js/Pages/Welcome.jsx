import { Link, Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <Button variant="secondary">Test</Button>
        </>
    );
}
