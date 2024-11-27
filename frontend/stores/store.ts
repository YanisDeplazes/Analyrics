import type LineAnalysis from '~/model/line-analysis';
import type Persona from '~/model/persona';
import type { SpotifyTrack, SpotifyProfile } from '~/model/spotify';


export const store = reactive<{
    selectedTrack: SpotifyTrack | null,
    selectedPersona: Persona | null,
    spotifyProfile: SpotifyProfile | null,
    currentAnalysis: Array<LineAnalysis> | null,
    setSelectedTrack: (song: SpotifyTrack) => void,
    setPersona: (persona: Persona) => void,
    setLineAnalysis: (lineAnalyis: Array<LineAnalysis>) => void,
    setProfile: (profile: SpotifyProfile) => void
}>({
    selectedTrack: null,
    selectedPersona: null,
    currentAnalysis: null,
    spotifyProfile: null,
    setSelectedTrack: function (song) {
        this.selectedTrack = song;
    },
    setPersona: function (persona) {
        this.selectedPersona = persona;
    },
    setLineAnalysis: function (lineAnalysis) {
        this.currentAnalysis = lineAnalysis;
    },
    setProfile: function (profile) {
        this.spotifyProfile = profile;
    }
});