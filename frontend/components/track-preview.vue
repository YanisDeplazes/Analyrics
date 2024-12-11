<template>
  <div
    :class="[
      'track',
      {
        playing: player.playingTrack === track && player.isPlaying,
      },
    ]"
  >
    <div class="track-image" @click="player.toggleSong(track)">
      <div
        class="icon"
        :class="{ pause: player.playingTrack === track && player.isPlaying }"
      ></div>
      <img
        :src="
          track.album?.images?.[0]?.url ||
          '/images/personas/default-cover-image.png'
        "
        alt="Album cover"
        class="cover"
        aria-label="Album cover"
      />
    </div>

    <div class="track-info" @click="selectTrack(track)">
      <p class="track-title">
        <strong>{{ track.name || "Unknown Track" }}</strong>
      </p>
      <p class="track-artists">
        <small>{{
          commaSeparatedArtists(track.artists) || "Unknown Artist"
        }}</small>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SpotifyTrack } from "~/model/spotify";
import { player } from "~/stores/player";
import { store } from "~/stores/store";

defineProps({
  track: {
    type: Object as () => SpotifyTrack,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const selectTrack = (track: SpotifyTrack) => {
  player.setSong(track);
  player.playSong();
  store.setSelectedTrack(track);
  navigateTo("critic-selection");
};
</script>
<style lang="scss">
.track {
  background-color: $bg-secondary;
  color: $on-secondary;
  border-radius: $border-lg;
  height: auto;
  max-width: 100%;
  padding: $spacing-lg;
  display: flex;
  padding: $spacing-lg;
  gap: $spacing-lg;

  &-info {
    flex: 1;
  }

  &-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  &-artists {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  &-image {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 4px;
    overflow: hidden;

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        rgba(0, 0, 0, 0.502),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0)
      );
    }
    & .cover {
      width: 100%;
      height: 100%;
    }

    & .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      transform: translate(-50%, -50%);
      background-image: url("../public/icons/play_white.svg");
      background-size: contain;
      z-index: 1;
    }
  }
  &:hover {
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      $bg-secondary;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  &:hover .track_preview_controls {
    opacity: 1;
  }

  &.playing {
    & .track-image {
      & .icon {
        background-image: url("../public/icons/pause_white.svg");
      }

      &::after {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
