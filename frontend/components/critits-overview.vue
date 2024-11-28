<template>
  <div class="swiper-container">
    <div class="swiper-buttons">
      <Button
        class="swiper-button-prev"
        icon-only
        variant="secondary"
        fill="fill"
        size="sm"
      >
        <template v-slot:icon>
          <Icon
            size="small"
            variant="keyboard-arrow-left"
            type="secondary"
          ></Icon>
        </template>
      </Button>
      <Button
        class="swiper-button-next"
        icon-only
        variant="secondary"
        fill="fill"
        size="sm"
      >
        <template v-slot:icon>
          <Icon
            size="small"
            variant="keyboard-arrow-right"
            type="secondary"
          ></Icon>
        </template>
      </Button>
    </div>
    <Swiper
      :modules="[Navigation, Scrollbar]"
      :loop="true"
      :slides-per-view="1"
      :space-between="10"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :scrollbar="{ draggable: true }"
    >
      <swiper-slide
        v-for="(persona, index) in criticsData.critics"
        :key="index"
      >
        <Critic
          :name="persona.name"
          :category="persona.category"
          :description="persona.description"
          :image-url="persona.imageUrl"
        ></Critic>
        <Button icon-only variant="secondary" fill="fill" size="sm">
          <template v-slot:icon>
            <Icon
              size="small"
              variant="keyboard-arrow-left"
              type="secondary"
            ></Icon>
          </template>
        </Button>
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
    margin-left: 10px;
    right: 0;
    top: -50px;
    display: inline-flex;
  }
}
</style>
<script setup lang="ts">
import { Swiper as Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper CSS for navigation
import "swiper/css/scrollbar";
import criticsData from "assets/data/critics.json";
</script>
