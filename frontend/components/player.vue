<template>
  <div
    class="player-container"
    :class="{ isPlaying: player.isPlaying }"
    v-if="player.playingTrack"
    @mousedown="startDrag"
  >
    <div class="track">
      <div class="image">
        <div id="progressBar"></div>
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
  transition: width 0.2s ease-in-out;
  cursor: grab;
  border: 1px solid var(--bg-secondary);
  margin: 0 auto;
  display: flex;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  user-select: none;
  position: fixed;
  z-index: 10;
  gap: 0;
  border-radius: 104px;
  overflow: hidden;
  width: calc(50px + 2 * var(--spacing-md));
  height: 50px;
  padding-left: 0;
  padding-right: 0;
  bottom: 15px;
  left: clamp(15px, calc((100vw - 1200px) / 2), calc(100vw - 100px));

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
      width: calc(50px + 2 * var(--spacing-md));
      height: calc(50px + 2 * var(--spacing-md));
      transition: all 0.2s ease-in-out;

      & .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        user-select: none; /* Prevent image selection */
        pointer-events: none; /* Ignore pointer events on the image */
      }
      & #progressBar {
        background: var(--bg-primary);
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        z-index: 1;
        opacity: 0.7;
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
    width: 0px;
    height: 0px;
    strong {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    small {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  & .controls {
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    width: 0px;
    height: 0px;
    & .button {
      cursor: pointer;

      & .icon-xl {
        margin: 0;
      }
    }
  }
  &:hover {
    gap: var(--spacing-md);
    width: 361px;
    border-radius: var(--border-md);
    overflow: hidden;
    height: 50px;
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);

    & .image {
      width: 50px;
      height: 50px;

      .cover {
        animation: unset;
      }
    }
    .track-info {
      width: unset;
      height: unset;
    }
    .controls {
      width: unset;
      height: unset;
    }
  }
  &.isPlaying {
    .cover {
      animation: spin 30s linear infinite;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
const isDragging = ref(false);
const dragOffset = ref({ x: 0, y: 0 });
const playerContainer = ref<HTMLDivElement | null>(null);

const startDrag = (event: MouseEvent) => {
  if (event.button !== 0) return; // Allow only left mouse button

  playerContainer.value = event.currentTarget as HTMLDivElement;
  if (!playerContainer.value) return;

  isDragging.value = true;

  const rect = playerContainer.value.getBoundingClientRect();
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };

  playerContainer.value.style.cursor = "grabbing";

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDrag);

  event.preventDefault(); // Prevent default actions
};

const handleDrag = (event: MouseEvent) => {
  if (!isDragging.value || !playerContainer.value) return;

  const newLeft = event.clientX - dragOffset.value.x;
  const newTop = event.clientY - dragOffset.value.y;

  const parent = document.documentElement;
  const maxLeft = parent.clientWidth - playerContainer.value.offsetWidth;
  const maxTop = parent.clientHeight - playerContainer.value.offsetHeight;

  const constrainedLeft = Math.max(0, Math.min(newLeft, maxLeft));
  const constrainedTop = Math.max(0, Math.min(newTop, maxTop));

  playerContainer.value.style.left = `${constrainedLeft}px`;
  playerContainer.value.style.top = `${constrainedTop}px`;
};

const stopDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  if (playerContainer.value) {
    playerContainer.value.style.cursor = "grab";
  }

  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>
