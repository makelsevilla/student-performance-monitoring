import { Button } from "@/Components/ui/button.jsx";

export default function PageHeader({ heading, text, children }) {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{heading}</h1>
                {text && <p className="text-muted-foreground">{text}</p>}
            </div>
            {children}
        </div>
    );
}
