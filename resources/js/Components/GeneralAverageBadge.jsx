import { Badge } from "@/Components/ui/badge.jsx";

export default function GeneralAverageBadge({ generalAverage }) {
    // identify the variant to be used based on the general average
    let badgeVariant = "";

    if (96 <= generalAverage && generalAverage <= 100) {
        badgeVariant = "blue";
    } else if (91 <= generalAverage && generalAverage <= 95) {
        badgeVariant = "green";
    } else if (86 <= generalAverage && generalAverage <= 90) {
        badgeVariant = "armyGreen";
    } else if (80 <= generalAverage && generalAverage <= 85) {
        badgeVariant = "yellow";
    } else if (75 <= generalAverage && generalAverage <= 79) {
        badgeVariant = "orange";
    } else if (generalAverage <= 74) {
        badgeVariant = "red";
    }

    return <Badge variant={badgeVariant}>{generalAverage}</Badge>;
}
