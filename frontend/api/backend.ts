import type { SpotifyTopTracks, SpotifyProfile } from "~/model/spotify";

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
}