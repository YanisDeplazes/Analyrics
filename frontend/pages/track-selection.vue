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
          :freeMode="true"
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
          <SwiperSlide
            v-for="(track, index) in recommendations.items"
            :key="track.id"
          >
            <TrackPreview :track="track" :index="index" />
          </SwiperSlide>
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

const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
};

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
</script>

<style lang="scss" scoped>
.recommendation-section {
  display: flex;
  flex: 1;

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

  .top-tracks-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
