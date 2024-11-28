<template>
  <div class="critics-title">
    <h2>Meet the critics</h2>
    <div class="swiper-buttons">
      <Button icon-only variant="secondary" fill="fill" size="sm" @click="swiper!.slidePrev()">
        <template v-slot:icon>
          <Icon size="small" variant="keyboard-arrow-left" type="secondary"></Icon>
        </template>
      </Button>
      <Button icon-only variant="secondary" fill="fill" size="sm" @click="swiper!.slideNext()">
        <template v-slot:icon>
          <Icon size="small" variant="keyboard-arrow-right" type="secondary"></Icon>
        </template>
      </Button>
    </div>
  </div>
  <div class="swiper-container">
    <SwiperWrapper :modules="[Scrollbar]" :loop="true" :slides-per-view="1" :space-between="10"
      :scrollbar="{ draggable: true }" @swiper="onSwiper">
      <swiper-slide v-for="(persona, index) in criticsData.critics" :key="index">
        <Critic :name="persona.name" :category="persona.category" :description="persona.description"
          :image-url="persona.imageUrl"></Critic>
      </swiper-slide>
    </SwiperWrapper>
  </div>
</template>

<style lang="scss">
.swiper-container {
  width: 100%;
  position: relative;
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
import { Scrollbar } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/scrollbar";
import criticsData from "assets/data/critics.json";
import Swiper from "swiper";
const swiper = ref<Swiper | null>(null);
const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
}
</script>
