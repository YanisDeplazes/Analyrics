import type LineAnalysis from '~/model/line-analysis';
import type Critic from '~/model/critic';
import type { SpotifyTrack, SpotifyProfile } from '~/model/spotify';


export const store = reactive<{
    selectedTrack: SpotifyTrack | null,
    selectedCritic: Critic | null,
    spotifyProfile: SpotifyProfile | null,
    currentAnalysis: Array<LineAnalysis> | null,
    lineIndex: number,
    spotifyUserAccessToken: string | null,
    setSelectedTrack: (song: SpotifyTrack) => void,
    setCritic: (persona: Critic) => void,
    setLineAnalysis: (lineAnalyis: Array<LineAnalysis>) => void,
    setProfile: (profile: SpotifyProfile) => void,
    setAccessToken: (accesToken: string) => void,
    setLineIndex: (currentLineIndex: number) => void
    reset: () => void
}>({
    selectedTrack: null,
    selectedCritic: null,
    currentAnalysis: null,
    lineIndex: 0,
    spotifyProfile: null,
    spotifyUserAccessToken: null,
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
    },
    setAccessToken: function (accessToken) {
        this.spotifyUserAccessToken = accessToken;
    },
    setLineIndex: function (currentLineIndex) {
        this.lineIndex = currentLineIndex;
    },
    reset: function () {
        this.selectedTrack = null;
        this.selectedCritic = null;
        this.currentAnalysis = null;
        this.lineIndex = 0;
        this.spotifyProfile = null;
        this.spotifyUserAccessToken = null;
    }
});