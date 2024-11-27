export default function removeTextInBraces(text: string): string {
    return text.replace(/\s*\(.*?\)\s*/g, "");
}