<template>
  <SwiperWrapper :slides-per-view="1.1" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
    <swiper-slide v-for="persona in personaData.personas">
      <Critic :name="persona.name" :category="persona.category" :description="persona.description"
        :image-url="persona.imageUrl"></Critic>
    </swiper-slide>
  </SwiperWrapper>
</template>
<style lang="scss">
.swiper {
  width: 100%;
}
</style>
<script setup lang="ts">
// Import Swiper Vue.js components
import type Swiper from "swiper";
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import personaData from "assets/data/personas.json";
const onSwiper = (swiper: Swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>
