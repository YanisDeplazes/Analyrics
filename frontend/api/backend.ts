import type TrackLyrics from "~/model/tracklyrics";
import type { SpotifyTopTracks, SpotifyProfile, SpotifyAudioFeatures, SpotifyTrack } from "~/model/spotify";
import removeTextInBraces from "~/utils/removeTextInBraces";

export default class Backend {
    me = async (accessToken: string): Promise<SpotifyProfile> => {
        const profileFetch = await fetch(
            `http://localhost:3000/me?access_token=${accessToken}`
        );
        const profile = await profileFetch.json();
        return profile as SpotifyProfile;
    }

    topTracks = async (accessToken: string): Promise<SpotifyTopTracks> => {
        const topTracksFetch = await fetch(
            `http://localhost:3000/me/top/tracks?access_token=${accessToken}`
        );

        const topTracks = await topTracksFetch.json();
        return topTracks as SpotifyTopTracks;
    }

    audioFeatures = async (trackId: string): Promise<SpotifyAudioFeatures> => {
        const audioFeaturesFetch = await fetch(
            `http://localhost:3000/audio-features/?id=${trackId}`
        );
        const audioFeatures = await audioFeaturesFetch.json();
        return audioFeatures as SpotifyAudioFeatures;
    }
    lyrics = async (track: SpotifyTrack): Promise<TrackLyrics> => {
        const response = await fetch(
            `http://localhost:3000/lyrics?q=${removeTextInBraces(track.name).trim()} ${track.artists[0].name}`,
            {
                method: "GET",
            }
        );
        const result = await response.json();
        return result as TrackLyrics;
    }
}