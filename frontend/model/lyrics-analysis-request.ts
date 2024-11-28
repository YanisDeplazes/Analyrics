import type Critic from "./critic";
import type { TrackLyrics } from "./tracklyrics";

export default interface LyricsAnalysisRequest {
    track: TrackLyrics,
    critic: Critic
}