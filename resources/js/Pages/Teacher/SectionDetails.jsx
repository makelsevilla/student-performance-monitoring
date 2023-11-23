import TeacherLayout from "@/Layouts/TeacherLayout.jsx";
import PageHeader from "@/Components/PageHeader.jsx";

export default function SectionDetails({ section }) {
    console.log(section);
    return (
        <TeacherLayout>
            <PageHeader
                heading={<span className="capitalize">{section.name}</span>}
            />
        </TeacherLayout>
    );
}
