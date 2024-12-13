import criticsData from "assets/data/critics.json"
import type Critic from "~/model/critic";
export default function getRandomizedCritics() {
    return randomizeOrder(criticsData.critics);
}
function randomizeOrder(array: Array<Critic>) {
    return array;
    // Create a copy of the array to avoid mutating the original
    let shuffled = [...array];

    // Implement the Fisher-Yates Shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // Swap the elements at i and randomIndex
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
    }
    console.log(shuffled)
    return shuffled;
}