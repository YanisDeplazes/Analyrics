<template>
  <Section class="critic-selection-section">
    <h1>Select a critic</h1>
    <SwiperWrapper
      :slides-per-view="1.1"
      :space-between="8"
      :modules="[Scrollbar, FreeMode]"
      :loop="true"
      :scrollbar="{ draggable: true }"
      :breakpoints="{
        480: {
          slidesPerView: 2.1,
          spaceBetween: 8,
        },
        768: {
          slidesPerView: 4.1,
          spaceBetween: 16,
        },
      }"
    >
      <swiper-slide v-for="critic in criticsData.critics">
        <Critic
          :name="critic.name"
          :category="critic.category"
          :description="critic.description"
          :image-url="critic.imageUrl"
        >
          <template v-slot:call-to-action>
            <Button
              fill="fill"
              variant="primary"
              :text="`Analyse with ${critic.name}`"
              icon="right"
              size="large"
              @click="setCritic(critic)"
            >
              <template v-slot:icon>
                <Icon
                  size="large"
                  type="primary"
                  variant="arrow-forward"
                ></Icon>
              </template>
            </Button>
          </template>
        </Critic>
      </swiper-slide>
    </SwiperWrapper>
    <TrackCard v-if="store.selectedTrack"></TrackCard>
  </Section>
</template>
<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import { FreeMode, Scrollbar } from "swiper/modules"; // Updated import
import criticsData from "assets/data/critics.json";
import { store } from "~/stores/store";
import type Critic from "~/model/critic";
import "swiper/css/scrollbar";

const setCritic = (critic: Critic) => {
  store.setCritic(critic);
  navigateTo("analysis-in-progress");
};
onMounted(() => {
  redirectIfNoSelectionMade();
});
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
}

.critic-selection-section {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-around;
}
</style>
