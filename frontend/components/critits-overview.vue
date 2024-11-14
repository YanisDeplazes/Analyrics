<template>
  <swiper
    :slides-per-view="1.1"
    :space-between="10"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <Critic></Critic>
    </swiper-slide>
    <swiper-slide>
      <Critic></Critic>
    </swiper-slide>
    <swiper-slide>
      <Critic></Critic>
    </swiper-slide>
  </swiper>
</template>
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
};
</script>
