import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";

export default function StudentPerformance() {
    return (
        <TeacherLayout>
            <PageHeader heading="Student Performance" />
            <div className="mt-4">
                <div>Content</div>
            </div>
        </TeacherLayout>
    );
}
