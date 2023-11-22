import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";

export default function Dashboard({ auth }) {
    return (
        <TeacherLayout>
            <PageHeader heading="Dashboard" />
            <div className="mt-4">Contents</div>
        </TeacherLayout>
    );
}
