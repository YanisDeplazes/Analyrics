import type LineAnalysis from '~/model/line-analysis';
import type Critic from '~/model/critic';
import type { SpotifyTrack, SpotifyProfile } from '~/model/spotify';


export const store = reactive<{
    selectedTrack: SpotifyTrack | null,
    selectedCritic: Critic | null,
    spotifyProfile: SpotifyProfile | null,
    currentAnalysis: Array<LineAnalysis> | null,
    spotifyUserAccessToken: string | null,
    setSelectedTrack: (song: SpotifyTrack) => void,
    setCritic: (persona: Critic) => void,
    setLineAnalysis: (lineAnalyis: Array<LineAnalysis>) => void,
    setProfile: (profile: SpotifyProfile) => void,
    setAccessToken: (accesToken: string) => void
}>({
    selectedTrack: null,
    selectedCritic: null,
    currentAnalysis: null,
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
    }
});