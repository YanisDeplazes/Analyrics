<template>
  <div class="swiper-container">
    <div class="swiper-buttons">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <Swiper :modules="[Navigation,Scrollbar]" :loop="true":slides-per-view="1" :space-between="10" :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }" :scrollbar="{ draggable: true }" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="(persona, index) in criticsData.critics" :key="index">
        <Critic :name="persona.name" :category="persona.category" :description="persona.description"
          :image-url="persona.imageUrl"></Critic>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<style lang="scss">
.swiper-container {
  width: 100%;
  position: relative;

  .swiper-buttons {
    position: absolute;
    right: 0;
    top: -20px;
    display: inline-flex;
    gap: var(--spacing-lg);

    .swiper-button-prev,
    .swiper-button-next {
      position: relative;
      background-color: var(--bg-secondary);
      color: var(--bg-primary);
      background-position: center;
      background-size: 10px;
      background-repeat: no-repeat;
      border-radius: 100%;
      color: var(--bg-primary);
      width: 24px;
      height: 24px;
      left: unset;
      right: unset;
      transition: 0.2s all ease-in-out;

      &:hover {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        scale: 1.03;
        cursor: pointer;
      }

      &::after {
        font-size: 12px;
      }
    }
  }
}
</style>
<script setup lang="ts">
import { Swiper as Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS for navigation
import 'swiper/css/scrollbar';
import criticsData from "assets/data/critics.json";
</script>
