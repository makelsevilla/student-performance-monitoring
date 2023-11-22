import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import { Button } from "@/Components/ui/button.jsx";
import PageHeader from "@/Components/PageHeader.jsx";

export default function Dashboard({ auth }) {
    return (
        <TeacherLayout>
            {/*Page header*/}
            <div>
                <PageHeader
                    heading=" My Class Sections"
                    text="     Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, voluptatibus."
                >
                    {" "}
                    <Button size="sm" className="ml-auto text-xs">
                        Add Section
                    </Button>
                </PageHeader>
            </div>
        </TeacherLayout>
    );
}
