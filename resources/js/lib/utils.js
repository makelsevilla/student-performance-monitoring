import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function replaceUnderscoresWithSpaces(snakeCaseString) {
    return snakeCaseString.replace(/_/g, " ");
}
