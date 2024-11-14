<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="profile">
      <p><strong>Display Name:</strong> {{ profile.display_name }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>Country:</strong> {{ profile.country }}</p>
      <img
        v-if="profile.images.length"
        :src="profile.images[0].url"
        alt="Profile Picture"
      />
      <SearchComponent @play-track="playTrack" />
      <PlayerControls :player="player" />
    </div>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Loading...</p>

    <div v-if="playerReady" class="webplayer-container">
      <p>Web Player is ready.</p>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";
import PlayerControls from "@/components/PlayerControls.vue";

export default {
  data() {
    return {
      profile: null,
      error: null,
      playerReady: false,
      player: null,
      deviceId: null, // Neu hinzugefügt, um die Device ID zu speichern
    };
  },
  methods: {
    async playTrack(uri) {
      const accessToken =
        localStorage.getItem("spotifyAccessToken") ||
        new URLSearchParams(window.location.search).get("access_token");
      if (!accessToken) {
        console.error("Access token not found in localStorage.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/player/play", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: accessToken,
            trackUri: uri,
            device_id: this.deviceId, // Übergabe des device_id
          }),
        });

        if (!response.ok) {
          console.error("Error starting playback:", await response.json());
        }
      } catch (error) {
        console.error("Error playing the track:", error);
      }
    },
  },
  async mounted() {
    const accessToken =
      localStorage.getItem("spotifyAccessToken") ||
      new URLSearchParams(window.location.search).get("access_token");

    if (!accessToken) {
      this.error = "Access token not found. Please log in.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/me?access_token=${accessToken}`
      );
      const data = await response.json();
      this.profile = data;

      // Load the Spotify Web Playback SDK script
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("Player ready");
        this.player = new window.Spotify.Player({
          name: "Analyrics",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
          volume: 0.5,
        });

        this.player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID:", device_id);
          this.deviceId = device_id; // Speichert die Device ID
          this.playerReady = true;
        });

        this.player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        this.player.connect();
      };
    } catch (error) {
      this.error = "Could not load profile data.";
    }
  },
};
</script>

<style scoped>
.webplayer-container {
  margin-top: 20px;
}
</style>
