export interface TrackLyrics {
    track: string,
    artist: string,
    lyrics: Array<LyricsLine>
}

export interface LyricsLine {
    line: string
}