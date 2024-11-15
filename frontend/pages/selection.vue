<template>
  <Section class="recommendation-section">
    <h1>Hi {{ profile?.display_name || "there" }}!</h1>
    <template v-if="recommendations && recommendations.items.length">
      <p>
        Let's get to analysing your preferred song. We've pulled a few tracks
        from your Spotify account to get you started:
      </p>
      <SwiperWrapper :slides-per-view="1.1" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="track in recommendations.items" :key="track.id">
          <div class="track">
            <div class="image">
              <img :src="track.album.images[1].url" alt="Album cover" />
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

              <!--TODO: <p v-if="track.preview_url">
            <audio controls :src="track.preview_url">
              Your browser does not support the audio element.
            </audio>
          </p> -->
            </div>
          </div>
        </swiper-slide>
      </SwiperWrapper>
    </template>
    <p>Alternatively, you can search for any song you'd like:</p>
    <!-- TODO: Search Component-->
  </Section>
</template>

<style lang="scss" scoped>
.recommendation-section {
  display: flex;
  flex: 1;
  justify-content: center;
}

.track {
  background-color: var(--bg-secondary);
  color: var(--on-secondary);
  border-radius: var(--border-lg);
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-lg);

  .image,
  .track-info {
    flex: 1;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>

<script setup lang="ts">
// Import Swiper Vue.js components
import type Swiper from "swiper";
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
let profile = ref<null | { display_name: string }>(null);
let recommendations = ref<{ items: Array<{ id: string, album: { images: Array<{ url: string }> }, name: string, artists: Array<{ name: string }> }> }>({ items: [] });
let error = ref<null | string>(null);
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
