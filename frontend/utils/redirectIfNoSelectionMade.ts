import { store } from "~/stores/store";

export default function redirectIfNoSelectionMade() {
    if (!store.selectedTrack && !store.selectedCritic) {
        navigateTo("/")
    }
}