import type LineAnalysis from '~/model/line-analysis';
import type Critic from '~/model/critic';
import type { SpotifyTrack, SpotifyProfile } from '~/model/spotify';


export const store = reactive<{
    selectedTrack: SpotifyTrack | null,
    selectedCritic: Critic | null,
    spotifyProfile: SpotifyProfile | null,
    currentAnalysis: Array<LineAnalysis> | null,
    setSelectedTrack: (song: SpotifyTrack) => void,
    setCritic: (persona: Critic) => void,
    setLineAnalysis: (lineAnalyis: Array<LineAnalysis>) => void,
    setProfile: (profile: SpotifyProfile) => void
}>({
    selectedTrack: null,
    selectedCritic: null,
    currentAnalysis: null,
    spotifyProfile: null,
    setSelectedTrack: function (track) {
        this.selectedTrack = track;
    },
    setCritic: function (persona) {
        this.selectedCritic = persona;
    },
    setLineAnalysis: function (lineAnalysis) {
        this.currentAnalysis = lineAnalysis;
    },
    setProfile: function (profile) {
        this.spotifyProfile = profile;
    }
});