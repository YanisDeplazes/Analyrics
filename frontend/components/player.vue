<template>
  <div
    class="player-container"
    :class="{ collapsed: isCollapsed }"
    v-if="player.playingTrack"
    @click="toggleCollapsed"
  >
    <div class="track">
      <div class="image">
        <img
          :src="
            player.playingTrack?.album.images[0].url ||
            '/images/personas/default-cover-image.png'
          "
          alt="Album cover"
          class="cover"
        />
      </div>
    </div>
    <div class="track-info">
      <strong>{{ player.playingTrack?.name }}</strong>
      <small>{{ player.playingTrack?.artists[0].name }}</small>
    </div>
    <div class="controls">
      <div class="button">
        <Icon
          size="xl"
          variant="empty"
          :icon="player.isPlaying ? 'pause' : 'play'"
          @click.stop="player.toggleSong(player.playingTrack)"
        >
          ></Icon
        >
      </div>
    </div>
  </div>

  <div class="spotify-iframe-container">
    <div id="spotify-embed"></div>
  </div>
</template>

<style lang="scss" scoped>
.player-container {
  border: 1px solid var(--bg-secondary);
  margin: 0 auto;
  display: flex;
  width: 361px;
  padding: var(--spacing-md);
  border-radius: var(--border-md);
  background: var(--bg-secondary);
  gap: var(--spacing-md);
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  & .track {
    padding: 0;
    display: flex;
    gap: 0;
    &:hover {
      background: unset;
      box-shadow: unset;
    }

    & .image {
      position: relative;
      height: 50px;
      width: 50px;

      & .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  & .track-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    color: var(--on-secondary, #392467);
    overflow: hidden;
    flex: 1;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }
  & .controls {
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    & .button {
      cursor: pointer;

      & .icon-xl {
        margin: 0;
      }
    }
  }
  &.collapsed {
    gap: 0;
    width: unset;
    padding: 0;
    border-radius: 104px;
    overflow: hidden;
    width: calc(50px + 2 * var(--spacing-md));
    height: calc(50px + 2 * var(--spacing-md));

    & .image {
      width: calc(50px + 2 * var(--spacing-md));
      height: calc(50px + 2 * var(--spacing-md));
    }
    .track-info {
      width: 0px;
      height: 0px;
    }
    .controls {
      width: 0px;
      height: 0px;
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
import { player } from "~/stores/player";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
  }
}

const isCollapsed = ref(true); // State to control the collapsed state

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value; // Toggle the collapsed state
};

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
      player.setEmbedController(controller); // Save controller to store
      console.log("Spotify player initialized.");
    };

    IFrameAPI.createController(element, options, callback);
  };
};

onMounted(async () => {
  try {
    player.initializePlayer(); // Ensure initialization promise is created
    await loadSpotifyScript();
    initializeSpotifyPlayer();
    console.log("Spotify Embed API loaded and player initialized.");
  } catch (error) {
    console.error("Failed to initialize Spotify player:", error);
  }
});
</script>
