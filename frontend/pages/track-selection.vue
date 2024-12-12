<template>
  <Section class="recommendation-section">
    <h1>Hi {{ store.spotifyProfile?.display_name || "there" }}, select your track:</h1>
    <div class="track-selection-container">
      <template v-if="recommendations && recommendations.items.length">
        <div class="recommendation-container">
          <h2>Your top tracks</h2>
          <div class="top-tracks-title">
            <FilterList :filters="recommendationFilters" variant="secondary" :initial-value="selectedRecommendationTerm"
              @filter-changed="filterChanged" />
            <div class="swiper-buttons">
              <Button icon-only variant="secondary" fill="fill" size="small" @click="swiper!.slidePrev()">
                <template v-slot:icon>
                  <Icon size="small" icon="keyboard-arrow-left" variant="secondary"></Icon>
                </template>
              </Button>
              <Button icon-only variant="secondary" fill="fill" size="small" @click="swiper!.slideNext()">
                <template v-slot:icon>
                  <Icon size="small" icon="keyboard-arrow-right" variant="secondary"></Icon>
                </template>
              </Button>
            </div>
          </div>
          <div class="swiper-container">
            <SwiperWrapper :modules="[Scrollbar, FreeMode]" :slides-per-view="1.1" :space-between="8" :loop="true"
              :scrollbar="{ draggable: true }" aria-label="Track recommendations carousel" :freeMode="true"
              @swiper="onSwiper" :breakpoints="{
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
              }">
              <SwiperSlide v-for="(track, index) in recommendations.items" :key="track.id">
                <TrackPreview :track="track" :index="index" />
              </SwiperSlide>
            </SwiperWrapper>
          </div>
        </div>
      </template>
      <div class="search-container">
        <h2>
          Search a track
        </h2>
        <SearchComponent />
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide, useSwiper } from "swiper/vue";
import { Scrollbar, FreeMode } from "swiper/modules";
import { store } from "~/stores/store";
import { player } from "~/stores/player";
import "swiper/css";
import "swiper/css/scrollbar";
import Backend from "~/api/backend";
import type { SpotifyTopTracks, SpotifyTrack } from "~/model/spotify";
import Swiper from "swiper";
const recommendations = ref<SpotifyTopTracks>();
const error = ref<null | string>(null);
const backend = new Backend();
const swiper = ref<Swiper | null>(null);
const selectedRecommendationTerm = ref("medium_term");
const recommendationFilters = [
  {
    value: "short_term",
    displayName: "Last 4 weeks"
  },
  {
    value: "medium_term",
    displayName: "Last 6 months"
  },
  {
    value: "long_term",
    displayName: "Last year"
  },
];

const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
};

const filterChanged = async (filter: { value: string, displayName: string }) => {
  await loadProfileAndRecommendations(filter.value);
}

onMounted(async () => {
  await player.stopSong();

  if (!store.spotifyUserAccessToken) {
    const route = useRoute();
    const accessToken = route.query["access_token"] as string;

    if (!accessToken) {
      error.value = "Access token not found. Please log in.";
      return;
    }

    store.setAccessToken(accessToken);
    await setUserProfile();
  }

  await loadProfileAndRecommendations(selectedRecommendationTerm.value);
});

const setUserProfile = async () => {
  if (store.spotifyUserAccessToken) {
    store.setProfile(await backend.me(store.spotifyUserAccessToken));
  }
}

const loadProfileAndRecommendations = async (timeRange: string) => {
  if (store.spotifyUserAccessToken) {
    recommendations.value = await backend.topTracks(
      store.spotifyUserAccessToken, timeRange
    );
  }
};
</script>

<style lang="scss" scoped>
.recommendation-section {
  display: flex;
  flex: 1;
  justify-content: center;

  & .swiper {
    &-container {
      width: 100%;
      position: relative;
    }

    &-buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    &-button-prev::after,
    &-button-next::after {
      all: unset;
    }
  }

  & .top-tracks-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }

  & .track-selection-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $spacing-3xl;
  }

  & .recommendation-container,
  .search-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }
}
</style>
