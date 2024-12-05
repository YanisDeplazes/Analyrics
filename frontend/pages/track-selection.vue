<template>
  <Section class="recommendation-section">
    <h1>Hi {{ store.spotifyProfile?.display_name || "there" }}!</h1>
    <template v-if="recommendations && recommendations.items.length">
      <p>
        Let's get to analysing your preferred song. We've pulled a few tracks
        from your Spotify account to get you started:
      </p>
      <div class="top-tracks-title">
        <h2>Your Top Tracks</h2>
        <div class="swiper-buttons">
          <Button
            icon-only
            variant="secondary"
            fill="fill"
            size="small"
            @click="swiper!.slidePrev()"
          >
            <template v-slot:icon>
              <Icon
                size="small"
                icon="keyboard-arrow-left"
                variant="secondary"
              ></Icon>
            </template>
          </Button>
          <Button
            icon-only
            variant="secondary"
            fill="fill"
            size="small"
            @click="swiper!.slideNext()"
          >
            <template v-slot:icon>
              <Icon
                size="small"
                icon="keyboard-arrow-right"
                variant="secondary"
              ></Icon>
            </template>
          </Button>
        </div>
      </div>
      <div class="swiper-container">
        <SwiperWrapper
          :modules="[Scrollbar, FreeMode]"
          :slides-per-view="1.1"
          :space-between="8"
          :loop="true"
          :scrollbar="{ draggable: true }"
          aria-label="Track recommendations carousel"
          @swiper="onSwiper"
          :breakpoints="{
            480: {
              slidesPerView: 2.1,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 3.1,
              spaceBetween: 16,
            },
            1080: {
              slidesPerView: 4.1,
              spaceBetween: 16,
            },
          }"
        >
          <swiper-slide
            v-for="(track, index) in recommendations.items"
            :key="track.id"
          >
            <div class="track" :id="'track_' + index">
              <div class="track-image">
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
              <div class="track-info" @click="selectTrack(track)">
                <p class="track-title">
                  <strong>{{ track.name }}</strong>
                </p>
                <p class="track-artists">
                  <small>{{ commaSeparatedArtists(track.artists) }}</small>
                </p>
              </div>
            </div>
          </swiper-slide>
        </SwiperWrapper>
      </div>
    </template>
    <p>
      To get started with your song analysis, search for any song you’d like.
    </p>
    <SearchComponent />
    <template v-if="!(recommendations && recommendations.items.length)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="345"
        height="4"
        viewBox="0 0 357 4"
        fill="none"
      >
        <path
          d="M2 2H355"
          stroke="#392467"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          d="M2 2H355"
          stroke="white"
          stroke-opacity="0.2"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
      <p>Alternatively, you can search for any song you'd like:</p>
    </template>
  </Section>
</template>

<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide, useSwiper } from "swiper/vue";
import { Scrollbar, FreeMode } from "swiper/modules";
import { store } from "~/stores/store";
import "swiper/css";
import "swiper/css/scrollbar";
import Backend from "~/api/backend";
import type { SpotifyTopTracks, SpotifyTrack } from "~/model/spotify";
import Swiper from "swiper";
const recommendations = ref<SpotifyTopTracks>();
const error = ref<null | string>(null);
const backend = new Backend();
const swiper = ref<Swiper | null>(null);
const selectTrack = (track: SpotifyTrack) => {
  store.setSelectedTrack(track);
  if (store.selectedCritic) {
    navigateTo("analysis-in-progress");
  } else {
    navigateTo("critic-selection");
  }
};

const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
};

onMounted(async () => {
  if (!store.spotifyUserAccessToken) {
    const route = useRoute();
    const accessToken = route.query["access_token"] as string;

    if (!accessToken) {
      error.value = "Access token not found. Please log in.";
      return;
    }

    store.setAccessToken(accessToken);
  }
  await loadProfileAndRecommendations();
});

const loadProfileAndRecommendations = async () => {
  if (store.spotifyUserAccessToken) {
    store.setProfile(await backend.me(store.spotifyUserAccessToken));
    recommendations.value = await backend.topTracks(
      store.spotifyUserAccessToken
    );
  }
};

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
</script>

<style lang="scss" scoped>
.recommendation-section {
  display: flex;
  flex: 1;
  justify-content: center;
}

.swiper-slide {
  background-color: $bg-secondary;
  /* Optional styling */
  color: $on-secondary;
  /* Optional styling */
  border-radius: $border-lg;
  height: auto;
  max-width: 100%;

  .track {
    padding: $spacing-lg;
    /* Optional padding */
    display: flex;
    /* To center content */
    padding: $spacing-lg;
    /* Optional padding */
    gap: $spacing-lg;

    .track-info {
      cursor: pointer;
    }

    &.playing {
      .track-image {
        .icon {
          background-image: url("../public/icons/pause_white.svg");
        }

        .track_preview_controls {
          background-color: rgba(0, 0, 0, 0.3);
          opacity: 1;
        }
      }
    }

    &-info {
      flex: 1;
    }

    &-title {
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    &-artists {
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .track-image {
      position: relative;
      width: 70px;
      height: 70px;
      .cover {
        width: 100%;
        height: 100%;
      }

      .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
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

.swiper-container {
  width: 100%;
  position: relative;
}

.top-tracks-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.swiper-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  all: unset;
}
</style>
