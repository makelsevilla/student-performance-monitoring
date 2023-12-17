import { Icons } from "@/Components/Icons.jsx";
import { Button } from "@/Components/ui/button.jsx";

export default function BackButton() {

    return (
        <Button variant="outline" onClick={() => history.back()}><Icons.chevronLeft className="h-4 w-4 mr-2"/> Back</Button>
    )
}
