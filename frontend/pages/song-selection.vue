<template>
  <Section class="recommendation-section">
    <h1>Hi {{ profile?.display_name || "there" }}!</h1>
    <template v-if="recommendations && recommendations.items.length">
      <p>
        Let's get to analysing your preferred song. We've pulled a few tracks
        from your Spotify account to get you started:
      </p>
      <SwiperWrapper
        :slides-per-view="1.1"
        :space-between="10"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        aria-label="Track recommendations carousel"
      >
        <swiper-slide
          v-for="(track, index) in recommendations.items"
          :key="track.id"
        >
          <div class="track" :id="'track_' + index">
            <div class="image">
              <div class="icon"></div>
              <div class="track_preview_controls" @click="togglePlay(index)">
                <audio :src="track.preview_url"></audio>
              </div>
              <img
                :src="track.album.images[1].url || '/default-cover.jpg'"
                alt="Album cover"
                class="cover"
                aria-label="Album cover"
              />
            </div>
            <div class="track-info">
              <p>
                <strong>{{ track.name }}</strong>
              </p>
              <p>
                <small>{{
                  track.artists.map((artist) => artist.name).join(", ")
                }}</small>
              </p>
            </div>
          </div>
        </swiper-slide>
      </SwiperWrapper>
    </template>
    <p>Alternatively, you can search for any song you'd like:</p>
    <!-- TODO: Search Component-->
  </Section>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import type Swiper from "swiper";
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import { ref, onMounted } from "vue";

let profile = ref<null | { display_name: string }>(null);
let recommendations = ref<{
  items: Array<{
    preview_url: any;
    id: string;
    album: { images: Array<{ url: string }> };
    name: string;
    artists: Array<{ name: string }>;
  }>;
}>({ items: [] });
let error = ref<null | string>(null);

// Toggle playback
const togglePlay = (index: number) => {
  const track = document.querySelector<HTMLDivElement>(`#track_${index}`);
  const audio = track?.querySelector<HTMLAudioElement>("audio");

  // Get all tracks and audio elements
  const allTracks = document.querySelectorAll<HTMLDivElement>(`.track`);
  const allAudioElements = document.querySelectorAll<HTMLAudioElement>("audio");

  // Pause all other audio elements and reset their state
  allAudioElements.forEach((audioElement, i) => {
    if (!audioElement.paused && i !== index) {
      audioElement.pause();
      audioElement.currentTime = 0; // Reset to the beginning
    }
  });

  // Remove "playing" class from all tracks
  allTracks.forEach((track) => track.classList.remove("playing"));

  // Play or pause the current track
  if (audio && track) {
    if (audio.paused) {
      track.classList.add("playing");
      audio.play();
    } else {
      track.classList.remove("playing");
      audio.pause();
    }
  }
};

const onSwiper = (swiper: Swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};

onMounted(async () => {
  const accessToken = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  if (!accessToken) {
    error.value = "Access token not found. Please log in.";
    return;
  }

  try {
    const profileFetch = await fetch(
      `http://localhost:3000/me?access_token=${accessToken}`
    );

    const profileData = await profileFetch.json();
    profile.value = profileData;

    const topItemsFetch = await fetch(
      `http://localhost:3000/me/top/tracks?access_token=${accessToken}`
    );

    const topItemsData = await topItemsFetch.json();
    recommendations.value = topItemsData;
  } catch (e) {
    error.value = "Could not load profile data.";
  }
});
</script>

<style lang="scss" scoped>
.recommendation-section {
  display: flex;
  flex: 1;
  justify-content: center;
}

.swiper-slide {
  background-color: var(--bg-secondary); /* Optional styling */
  color: var(--on-secondary); /* Optional styling */
  border-radius: var(--border-lg); /* Optional styling */
  height: auto; /* Ensure height adjusts dynamically */
  max-width: 100%;

  .track {
    padding: var(--spacing-lg); /* Optional padding */
    display: flex; /* To center content */
    padding: var(--spacing-lg); /* Optional padding */
    gap: var(--spacing-lg);
    &.playing {
      .image {
        .icon {
          background-image: url("../public/icons/pause_white.svg");
        }
        .track_preview_controls {
          background-color: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
      }
    }

    .image,
    .track-info {
      flex: 1;
    }
    .image {
      position: relative;

      .cover {
        width: 100%;
        height: 100%;
      }

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 40px;
        max-width: 40px;
        -o-object-fit: cover;
        object-fit: cover;
        transform: translate(-50%, -50%);
        background-image: url("../public/icons/play_white.svg");
        background-size: contain;
        z-index: 1;
        pointer-events: none;
      }
      .track_preview_controls {
        position: absolute;
        background: linear-gradient(
          rgba(0, 0, 0, 0.502),
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0)
        );
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease-in-out;
      }
      &:hover {
        .track_preview_controls {
          opacity: 1;
          cursor: pointer;
        }
      }
      .track_preview {
        display: none;
      }
    }
  }
}
</style>
