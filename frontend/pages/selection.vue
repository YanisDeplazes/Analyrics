<template>
  <Section>
    <h1>Hi {{ profile?.display_name || "there" }}!</h1>

    <div v-if="recommendations && recommendations.items.length">
      <p>
        Let's get to analysing your preferred song. We've pulled a few tracks
        from your Spotify account to get you started:
      </p>
      <swiper
        :slides-per-view="1.1"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
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
      </swiper>
    </div>
    <p>Alternatively, you can search for any song you'd like:</p>
    <!-- TODO: Search Component-->
  </Section>
</template>

<style lang="scss">
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

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  data() {
    return {
      profile: null,
      recommendations: { items: [] },
      error: null,
    };
  },
  async mounted() {
    const accessToken = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    if (!accessToken) {
      this.error = "Access token not found. Please log in.";
      return;
    }

    try {
      const profileFetch = await fetch(
        `http://localhost:3000/me?access_token=${accessToken}`
      );

      const profileData = await profileFetch.json();
      this.profile = profileData;

      const topItemsFetch = await fetch(
        `http://localhost:3000/me/top/tracks?access_token=${accessToken}`
      );

      const topItemsData = await topItemsFetch.json();
      this.recommendations = topItemsData;
    } catch (error) {
      this.error = "Could not load profile data.";
    }
  },
};
</script>
