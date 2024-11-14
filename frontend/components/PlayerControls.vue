<template>
  <div class="player-controls">
    <button @click="togglePlayPause">{{ isPlaying ? "Pause" : "Play" }}</button>
    <button @click="nextTrack">Next</button>
    <button @click="previousTrack">Previous</button>
    <div>
      <label for="volume">Volume:</label>
      <input
        type="range"
        id="volume"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        @input="changeVolume"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object, // Das player-Objekt, das vom Profil übergeben wird
  },
  data() {
    return {
      isPlaying: false, // Verfolgt, ob der Player gerade spielt
      volume: 0.5, // Standardlautstärke
    };
  },
  methods: {
    // Wiedergabe oder Pause toggeln
    async togglePlayPause() {
      if (!this.player) {
        console.error("Player not available.");
        return;
      }

      if (this.isPlaying) {
        await this.player.pause(); // Pausieren des Tracks
      } else {
        await this.player.resume(); // Fortsetzen der Wiedergabe
      }

      this.isPlaying = !this.isPlaying; // Status umkehren
    },

    // Nächsten Track abspielen
    async nextTrack() {
      if (!this.player) {
        console.error("Player not available.");
        return;
      }

      try {
        await this.player.nextTrack();
      } catch (error) {
        console.error("Error skipping to the next track:", error);
      }
    },

    // Vorherigen Track abspielen
    async previousTrack() {
      if (!this.player) {
        console.error("Player not available.");
        return;
      }

      try {
        await this.player.previousTrack();
      } catch (error) {
        console.error("Error skipping to the previous track:", error);
      }
    },

    // Lautstärke ändern
    async changeVolume() {
      if (!this.player) {
        console.error("Player not available.");
        return;
      }

      try {
        await this.player.setVolume(this.volume); // Lautstärke setzen
      } catch (error) {
        console.error("Error changing volume:", error);
      }
    },
  },
  watch: {
    // Beobachten des `player`-Objekts, um Änderungen zu reagieren
    player(newPlayer) {
      if (newPlayer) {
        newPlayer.addListener("play", () => {
          this.isPlaying = true;
        });
        newPlayer.addListener("pause", () => {
          this.isPlaying = false;
        });
      }
    },
  },
};
</script>

<style scoped>
.player-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

input[type="range"] {
  width: 100px;
}
</style>
