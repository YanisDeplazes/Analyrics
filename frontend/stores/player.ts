import { reactive } from "vue";
import type { SpotifyTrack, PlaybackState } from "~/model/spotify";

/**
 * Reactive store for managing Spotify player state and controls.
 */
export const player = reactive<{
  playingTrack: SpotifyTrack | null; // The currently playing track
  isPlaying: true | false; // Indicates if the player is currently playing
  EmbedController: any | null; // Spotify Embed Controller instance
  playerInitialized: boolean; // Whether the player has been initialized
  playerInitializedPromise: Promise<void> | null; // Promise that resolves when the player is initialized
  resolvePlayerInitialized: (() => void) | null; // Resolver for the initialization promise
  initializePlayer: () => void; // Method to initialize the player
  setEmbedController: (controller: any) => void; // Method to set the Spotify Embed Controller
  waitForInitialization: () => Promise<void>; // Ensures the player is initialized before proceeding
  clearSong: () => void; // Clears the current playing song
  setSong: (track: SpotifyTrack) => Promise<void>; // Sets the given song for playback
  toggleSong: (track: SpotifyTrack) => void; // Toggles between playing and pausing a given song
  playSong: () => void; // Plays the current song
  stopSong: () => Promise<void>; // Stops playback of the current song
  pauseSong: () => void; // Pauses playback of the current song
}>({
  playingTrack: null, // No track playing initially
  isPlaying: false, // Player is not playing initially
  EmbedController: null, // No controller set initially
  playerInitialized: false, // Player is not initialized initially
  playerInitializedPromise: null, // Initialization promise not set initially
  resolvePlayerInitialized: null, // Resolver not set initially

  /**
   * Initializes the player by creating an initialization promise.
   * Ensures subsequent calls can await player readiness.
   */
  initializePlayer: function () {
    if (!this.playerInitializedPromise) {
      this.playerInitializedPromise = new Promise((resolve) => {
        this.resolvePlayerInitialized = resolve;
      });
    }
  },

  /**
   * Sets the Spotify Embed Controller and marks the player as initialized.
   * Also adds a listener for playback updates to handle song completion.
   * 
   * @param {any} controller - Spotify Embed Controller instance
   */
  setEmbedController: function (controller) {
    this.EmbedController = controller;

    // Mark the player as initialized
    this.playerInitialized = true;
    if (this.resolvePlayerInitialized) {
      this.resolvePlayerInitialized();
    }

    // Add listener for playback updates
    this.EmbedController.addListener("playback_update", (state: PlaybackState) => {
      
      const progressBar = document.getElementById('progressBar') as HTMLElement;  // Assuming your progress bar has id 'progressBar'
      if (progressBar && state.data.duration > 0) {
  
        // Calculate the percentage of playback position relative to duration
        const percentage = (state.data.position / state.data.duration) * 100;
        // Update the width of the progress bar
        progressBar.style.width = `${Math.min(percentage, 100)}%`; // Ensure the width does not exceed 100%
      }


      if (state.data.position >= state.data.duration) {
        if(this.playingTrack){
          this.toggleSong(this.playingTrack);
        } else {
          console.warn('Track is not loaded or playingTrack is not set.');
        }
      }
    });
  },

  /**
   * Waits for the player to be initialized before proceeding.
   * If not already initialized, triggers the initialization process.
   * 
   * @returns {Promise<void>} - Resolves when the player is initialized
   */
  waitForInitialization: function () {
    if (!this.playerInitializedPromise) {
      console.warn("Player initialization promise does not exist. Initializing...");
      this.initializePlayer();
    }
    return this.playerInitializedPromise!;
  },

  /**
   * Toggles between playing and pausing the given track.
   * If the track is already playing, it pauses or resumes playback.
   * Otherwise, it sets the new track and starts playback.
   * 
   * @param {SpotifyTrack} track - The track to toggle
   */
  toggleSong: async function (track: SpotifyTrack) {
    if (this.playingTrack === track) {
      if (this.isPlaying) {
        this.pauseSong();
      } else {
        this.playSong();
      }
    } else {
      await this.setSong(track);
      this.playSong();
    }
  },

  /**
   * Sets the given track for playback.
   * 
   * @param {SpotifyTrack} track - The track to set for playback
   */
  setSong: async function (track: SpotifyTrack): Promise<void> {
    await this.waitForInitialization();
    if (this.EmbedController) {
      this.EmbedController.loadUri(track.uri);
      this.playingTrack = track;
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },

  /**
   * Starts or resumes playback of the current song.
   */
  playSong: function () {
    if (this.EmbedController) {
      this.isPlaying = true;
      this.EmbedController.resume();
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },

  /**
   * Pauses playback of the current song.
   */
  pauseSong: function () {
    if (this.EmbedController) {
      this.isPlaying = false;
      this.EmbedController.pause();
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },

  /**
   * Stops playback of the current song.
   * Waits for the player to be initialized before attempting to stop.
   * 
   * @returns {Promise<void>} - Resolves when playback is stopped
   */
  stopSong: async function (): Promise<void> {
    await this.waitForInitialization();
    if (this.EmbedController) {
      this.pauseSong();
      this.clearSong();
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },

  /**
   * Clears the current song state.
   * Resets the playing track and sets `isPlaying` to false.
   */
  clearSong: function () {
    this.isPlaying = false;
    this.playingTrack = null;
  },
});
