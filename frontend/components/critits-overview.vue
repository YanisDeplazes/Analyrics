<template>
  <div class="critics-title">
    <h2>Meet the critics</h2>
    <div class="swiper-buttons">
      <Button class="swiper-button-prev" icon-only variant="secondary" fill="fill" size="sm">
        <template v-slot:icon>
          <Icon size="small" variant="keyboard-arrow-left" type="secondary"></Icon>
        </template>
      </Button>
      <Button class="swiper-button-next" icon-only variant="secondary" fill="fill" size="sm">
        <template v-slot:icon>
          <Icon size="small" variant="keyboard-arrow-right" type="secondary"></Icon>
        </template>
      </Button>
    </div>
  </div>
  <div class="swiper-container">
    <SwiperWrapper :modules="[Navigation, Scrollbar]" :loop="true" :slides-per-view="1" :space-between="10" :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }" :scrollbar="{ draggable: true }">
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

.swiper-button-prev,
.swiper-button-next,
.swiper-button-prev::after,
.swiper-button-next::after {
  all: unset;
}
</style>
<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS for navigation
import "swiper/css/scrollbar";
import criticsData from "assets/data/critics.json";
</script>
