import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card.jsx";
import CentralSchoolLogo from "@/Components/CentralSchoolLogo.jsx";

export default function Dashboard({ auth, counts }) {
    return (
        <TeacherLayout>
            <PageHeader heading={`Welcome, ${auth.user.name}!`} />
            <div className="mt-4 flex gap-8">
                <Card className="w-fit">
                    <CardHeader>
                        <CardTitle>Sections: {counts.sections}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="w-fit">
                    <CardHeader>
                        <CardTitle>Subjects: {counts.subjects}</CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <div className="flex w-[80%] mt-10 mx-auto">
                <img
                    alt="central school"
                    src="/central-school.jpg"
                />
            </div>
        </TeacherLayout>
    );
}
