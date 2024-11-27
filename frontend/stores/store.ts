import type LineAnalysis from '~/model/line-analysis';
import type Persona from '~/model/persona';
import type { SpotifyTrack } from '~/model/spotify';


export const store = reactive<{
    selectedTrack: SpotifyTrack | null,
    selectedPersona: Persona | null,
    currentAnalysis: Array<LineAnalysis> | null,
    setSelectedTrack: (song: SpotifyTrack) => void,
    setPersona: (persona: Persona) => void,
    setLineAnalysis: (lineAnalyis: Array<LineAnalysis>) => void
}>({
    selectedTrack: null,
    selectedPersona: null,
    currentAnalysis: null,
    setSelectedTrack: function (song) {
        this.selectedTrack = song;
    },
    setPersona: function (persona) {
        this.selectedPersona = persona;
    },
    setLineAnalysis: function (lineAnalysis) {
        this.currentAnalysis = lineAnalysis;
    }
});