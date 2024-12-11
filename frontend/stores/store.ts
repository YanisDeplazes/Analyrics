import { reactive } from "vue";
import type { SpotifyTrack, SpotifyProfile, PlaybackState } from "~/model/spotify";
import type LineAnalysis from "~/model/line-analysis";
import type Critic from "~/model/critic";

export const store = reactive<{
  selectedTrack: SpotifyTrack | null;
  playingTrack: SpotifyTrack | null;
  
  isPlaying: true | false;
  selectedCritic: Critic | null;
  spotifyProfile: SpotifyProfile | null;
  currentAnalysis: Array<LineAnalysis> | null;
  lineIndex: number;
  spotifyUserAccessToken: string | null;
  EmbedController: any | null;
  setSelectedTrack: (song: SpotifyTrack) => void;
  setCritic: (critic: Critic) => void;
  setLineAnalysis: (lineAnalysis: Array<LineAnalysis>) => void;
  setProfile: (profile: SpotifyProfile) => void;
  setAccessToken: (accessToken: string) => void;
  setLineIndex: (currentLineIndex: number) => void;
  setEmbedController: (controller: any) => void;
  clearSong: () => void;
  setSong: (track: SpotifyTrack) => void;
  toggleSong: (track: SpotifyTrack) => void;
  playSong: () => void;
  stopSong: () => void;
  pauseSong: () => void;
  resetAll: () => void;
  resetSelectedTrack: () => void;
  resetSelectedCritic: () => void;
}>({
  selectedTrack: null,
  selectedCritic: null,
  playingTrack: null,
  isPlaying: false,
  currentAnalysis: null,
  lineIndex: 0,
  spotifyProfile: null,
  spotifyUserAccessToken: null,
  EmbedController: null,
  setSelectedTrack: function (track) {
    this.selectedTrack = track;
  },
  setCritic: function (critic) {
    this.selectedCritic = critic;
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
  setEmbedController: function (controller) {
    this.EmbedController = controller;

  // Listen for playback updates
  this.EmbedController.addListener("playback_update", (state: PlaybackState) => {

    // Track finished check
    if (state.data.position >= state.data.duration ) {
      this.clearSong();
    }
  });

  },
  toggleSong: function(track: SpotifyTrack) {

    if (this.playingTrack === track) {
        if (this.isPlaying) {
          this.pauseSong();
        } else {
          this.playSong();
        }
    } else {
      this.setSong(track);
      this.playSong();
    }

  },
 
  setSong: function (track: SpotifyTrack) {
    if (this.EmbedController) {
      this.EmbedController.loadUri(track.uri);
      this.playingTrack = track;
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },
  playSong: function () {
    if (this.EmbedController) {
      this.isPlaying = true;
        this.EmbedController.resume();
      }
    else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },
  pauseSong: function () {
    if (this.EmbedController) {
      this.isPlaying = false;
      this.EmbedController.pause();
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }

  },
  stopSong: function () {
    if (this.EmbedController) {
      this.EmbedController.pause();
    } else {
      console.error("Spotify Embed Controller not initialized yet.");
    }
  },

  resetSelectedTrack: function () {
    this.clearSong(); 
    this.selectedTrack = null;
    this.currentAnalysis = null;
    this.lineIndex = 0;
    this.EmbedController = null;
  },
  resetSelectedCritic: function () {
    this.selectedCritic = null;
  },


  clearSong: function () {
    console.log("test");
    this.isPlaying = false; 
    this.playingTrack = null;
    this.stopSong();
  },

  resetAll: function () {
    this.selectedTrack = null;
    this.selectedCritic = null;
    this.currentAnalysis = null;
    this.lineIndex = 0;
    this.EmbedController = null;
  },

});
