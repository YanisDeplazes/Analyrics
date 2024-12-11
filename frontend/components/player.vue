<template>
  <div class="player-container" v-if="store.playingTrack">
    <div class="track">
      <div class="image">
        <img
          :src="
            store.playingTrack?.album.images[0].url ||
            '/images/personas/default-cover-image.png'
          "
          alt="Album cover"
          class="cover"
        />
      </div>
      <div class="track-info">
        <strong>{{ store.playingTrack?.name }}</strong>
        <small>{{ store.playingTrack?.artists[0].name }}</small>
      </div>
    </div>
    <div class="controls">
      <div class="button">
        <Icon
          size="xl"
          variant="empty"
          :icon="store.isPlaying ? 'pause' : 'play'"
          @click="store.toggleSong(store.playingTrack)"
        ></Icon>
      </div>
    </div>
  </div>

  <div class="spotify-iframe-container">
    <div id="spotify-embed"></div>
  </div>
</template>

<style lang="scss" scoped>
.player-container {
  margin: auto;
  display: flex;
  width: 361px;
  padding: var(--spacing-md);
  border-radius: var(--border-md);
  background: var(--bg-secondary);
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  gap: var(--spacing-md);
  justify-content: center;
  align-items: center;

  & .track {
    padding: var(--spacing-sm);
    display: flex;
    gap: var(--spacing-lg);
    flex: 1;
    &:hover {
      background: unset;
      box-shadow: unset;
    }

    & .image {
      position: relative;
      & .cover {
        width: 50px;
        height: 50px;
      }
    }
    & .track-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      color: var(--on-secondary, #392467);
    }
  }
  & .controls {
    & .button {
      &:hover {
        cursor: pointer;
      }
      & .icon-xl {
        margin: 0;
      }
    }
  }
}

.spotify-iframe-container {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>

<script setup lang="ts">
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
  }
}

import { store } from "~/stores/store";
import type { SpotifyTrack } from "~/model/spotify";

const loadSpotifyScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById("spotify-iframe-api")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "spotify-iframe-api";
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

const initializeSpotifyPlayer = () => {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById("spotify-embed");
    if (!element) {
      console.error("Spotify embed element not found.");
      return;
    }

    const options = {
      width: "100%",
      height: "80",
      uri: "", // Start with an empty embed
    };

    const callback = (controller: any) => {
      store.setEmbedController(controller); // Save controller to store
      console.log("Spotify player initialized.");
    };

    IFrameAPI.createController(element, options, callback);
  };
};

onMounted(async () => {
  try {
    await loadSpotifyScript();
    console.log("Spotify Embed API loaded.");
    initializeSpotifyPlayer(); // Initialize the player once
  } catch (error) {
    console.error("Failed to load Spotify Embed API:", error);
  }
});
</script>
