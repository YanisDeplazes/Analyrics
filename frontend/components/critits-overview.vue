<template>
  <div class="critics-title">
    <h2>Meet the critics</h2>
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
  <SwiperWrapper :modules="[Scrollbar, FreeMode, Autoplay]" :autoplay="{ delay: 5000 }" :loop="true" :breakpoints="{
    480: {
      slidesPerView: 2.1,
      spaceBetween: 8
    },
    768: {
      slidesPerView: 4.1,
      spaceBetween: 16
    },
  }" :slides-per-view="1.1" :space-between="8" :scrollbar="{ draggable: true }" @swiper="onSwiper"
    class="swiper-container" :freeMode="true">
    <swiper-slide v-for="(critic, index) in criticsData.critics" :key="index">
      <Critic :name="critic.name" :category="critic.category" :description="critic.description"
        :image-url="critic.imageUrl">
        <template v-slot:call-to-action>
          <Button variant="primary" :text="`Analyze track with ${critic.name}`" size="large" fill="fill" icon="right"
            @click="selectCritic(critic)">
            <template v-slot:icon>
              <Icon size="large" variant="primary" icon="arrow-forward" />
            </template>
          </Button>
        </template>
      </Critic>
    </swiper-slide>
  </SwiperWrapper>
</template>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  position: relative;

  .swiper-slide {
    display: flex;
    height: unset;
  }
}

.critics-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.swiper-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import { Scrollbar, FreeMode, Autoplay } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/scrollbar";
import criticsData from "assets/data/critics.json";
import Swiper from "swiper";
import type Critic from "~/model/critic";
import { store } from "~/stores/store";
const swiper = ref<Swiper | null>(null);
const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
}

const selectCritic = (critic: Critic) => {
  store.setCritic(critic);
  navigateTo("/login");
}
</script>
