import { reactive } from "vue";
import type { SpotifyTrack, SpotifyProfile, PlaybackState } from "~/model/spotify";
import type LineAnalysis from "~/model/line-analysis";
import type Critic from "~/model/critic";
import { player } from "~/stores/player";

/**
 * Reactive store for managing application state related to Spotify tracks, critics, and user profiles.
 */
export const store = reactive<{
  selectedTrack: SpotifyTrack | null; // The currently selected Spotify track
  selectedCritic: Critic | null; // The currently selected critic
  spotifyProfile: SpotifyProfile | null; // The user's Spotify profile information
  currentAnalysis: Array<LineAnalysis> | null; // The analysis of the selected track's lyrics
  lineIndex: number; // The current index of the line being analyzed
  spotifyUserAccessToken: string | null; // The user's Spotify API access token
  setSelectedTrack: (song: SpotifyTrack) => void; // Sets the selected track and triggers playback
  setCritic: (critic: Critic) => void; // Sets the selected critic
  setLineAnalysis: (lineAnalysis: Array<LineAnalysis>) => void; // Sets the analysis data for the selected track
  setProfile: (profile: SpotifyProfile) => void; // Sets the user's Spotify profile information
  setAccessToken: (accessToken: string) => void; // Sets the Spotify API access token
  setLineIndex: (currentLineIndex: number) => void; // Updates the index of the currently analyzed line
  resetAll: () => void; // Resets all store state to its initial values
  resetSelectedTrack: () => void; // Resets the selected track and related analysis
  resetSelectedCritic: () => void; // Resets the selected critic
  isEndscreen: boolean; // Indicates if the endscren is active
}>({
  // Properties

  selectedTrack: null, // No track selected initially
  selectedCritic: null, // No critic selected initially
  currentAnalysis: null, // No analysis data initially
  lineIndex: 0, // Default to the first line
  spotifyProfile: null, // No Spotify profile information initially
  spotifyUserAccessToken: null, // No access token initially
  isEndscreen: false, // Endscren is not active initially

  // Methods

  /**
   * Sets the selected track and starts playback using the `player` store.
   * 
   * @param {SpotifyTrack} track - The track to set as the selected track
   */
  setSelectedTrack: function (track) {
    player.toggleSong(track); // Start or toggle playback for the selected track
    this.selectedTrack = track; // Update the selected track in the store
  },

  /**
   * Sets the selected critic for the track analysis.
   * 
   * @param {Critic} critic - The critic to set as the selected critic
   */
  setCritic: function (critic) {
    this.selectedCritic = critic;
  },

  /**
   * Sets the analysis data for the selected track's lyrics.
   * 
   * @param {Array<LineAnalysis>} lineAnalysis - The analysis data for the track's lyrics
   */
  setLineAnalysis: function (lineAnalysis) {
    this.currentAnalysis = lineAnalysis;
  },

  /**
   * Sets the user's Spotify profile information.
   * 
   * @param {SpotifyProfile} profile - The Spotify profile information
   */
  setProfile: function (profile) {
    this.spotifyProfile = profile;
  },

  /**
   * Sets the Spotify API access token for the user.
   * 
   * @param {string} accessToken - The access token for Spotify API authentication
   */
  setAccessToken: function (accessToken) {
    this.spotifyUserAccessToken = accessToken;
  },

  /**
   * Updates the index of the currently analyzed line in the lyrics.
   * 
   * @param {number} currentLineIndex - The index of the current line
   */
  setLineIndex: function (currentLineIndex) {
    this.lineIndex = currentLineIndex;
  },

  /**
   * Resets the selected track and clears associated analysis data.
   */
  resetSelectedTrack: function () {
    this.selectedTrack = null;
    this.currentAnalysis = null;
    this.lineIndex = 0;
  },

  /**
   * Resets the selected critic to null.
   */
  resetSelectedCritic: function () {
    this.selectedCritic = null;
    this.lineIndex = 0;
  },

  /**
   * Resets all store state to its initial values.
   */
  resetAll: function () {
    this.selectedTrack = null;
    this.selectedCritic = null;
    this.currentAnalysis = null;
    this.lineIndex = 0;
    this.isEndscreen = false;
  },
});
