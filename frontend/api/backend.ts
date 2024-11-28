import type { SpotifyTopTracks, SpotifyProfile, SpotifyAudioFeatures, SpotifyTrack } from "~/model/spotify";
import removeTextInBraces from "~/utils/removeTextInBraces";
import type LineAnalysis from "~/model/line-analysis";
import type { TrackLyrics } from "~/model/tracklyrics";
import type Critic from "~/model/critic";
import type lyricsAnalysisRequest from "~/model/lyrics-analysis-request";

export default class Backend {
    baseUrl: string = "http://localhost:3000";
    me = async (accessToken: string): Promise<SpotifyProfile> => {
        const profileFetch = await fetch(
            `${this.baseUrl}/me?access_token=${accessToken}`
        );
        const profile = await profileFetch.json();
        return profile as SpotifyProfile;
    }

    topTracks = async (accessToken: string): Promise<SpotifyTopTracks> => {
        const topTracksFetch = await fetch(
            `${this.baseUrl}/me/top/tracks?access_token=${accessToken}`
        );

        const topTracks = await topTracksFetch.json();
        return topTracks as SpotifyTopTracks;
    }

    audioFeatures = async (trackId: string): Promise<SpotifyAudioFeatures> => {
        const audioFeaturesFetch = await fetch(
            `${this.baseUrl}/audio-features/?id=${trackId}`
        );
        const audioFeatures = await audioFeaturesFetch.json();
        return audioFeatures as SpotifyAudioFeatures;
    }
    lyrics = async (track: SpotifyTrack): Promise<TrackLyrics> => {
        const response = await fetch(
            `${this.baseUrl}/lyrics?q=${removeTextInBraces(track.name).trim()} ${track.artists[0].name}`,
            {
                method: "GET",
            }
        );
        const lyrics = await response.json();
        return lyrics as TrackLyrics;
    }
    analyseLyrics = async (lyrics: TrackLyrics, critic: Critic): Promise<Array<LineAnalysis>> => {
        const requestBody: lyricsAnalysisRequest = {
            track: lyrics,
            critic: critic
        }
        const response = await fetch(
            `${this.baseUrl}/analyzer`,
            {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const analysisResult = await response.json();
        return analysisResult as Array<LineAnalysis>
    }

    search = async (query: string): Promise<Array<SpotifyTrack>> => {
        const response = await fetch(
            `${this.baseUrl}/search?query=${query}`
        );
        const data = await response.json();
        return data.tracks.items as Array<SpotifyTrack>;
    }
}