import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card.jsx";

export default function Dashboard({ auth, counts }) {
    console.log(counts);
    return (
        <TeacherLayout>
            <PageHeader heading={`Welcome, ${auth.user.name}!`} />
            <div className="mt-4">
                <Card className="w-fit">
                    <CardHeader>
                        <CardTitle>Sections: {counts.sections}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="mt-8 w-fit">
                    <CardHeader>
                        <CardTitle>Subjects: {counts.subjects}</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </TeacherLayout>
    );
}
