export default function removeTextAfterComma(text: string): string {
    return text.replace(/,.*$/, "");
}