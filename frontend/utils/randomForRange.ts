export default function randomForRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
}