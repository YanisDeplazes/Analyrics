<template>
  <Section class="critic-selection-section">
    <div class="critics-title">
      <h1>Select a critic</h1>
    </div>
    <div class="swiper-buttons">
      <Button
        icon-only
        variant="secondary"
        fill="fill"
        size="small"
        @click="swiper!.slidePrev()"
      >
        <template v-slot:icon>
          <Icon
            size="small"
            icon="keyboard-arrow-left"
            variant="secondary"
          ></Icon>
        </template>
      </Button>
      <Button
        icon-only
        variant="secondary"
        fill="fill"
        size="small"
        @click="swiper!.slideNext()"
      >
        <template v-slot:icon>
          <Icon
            size="small"
            icon="keyboard-arrow-right"
            variant="secondary"
          ></Icon>
        </template>
      </Button>
    </div>
    <SwiperWrapper
      :slides-per-view="1.1"
      :space-between="8"
      :modules="[Scrollbar, FreeMode]"
      :loop="true"
      :scrollbar="{ draggable: true }"
      :freeMode="true"
      @swiper="onSwiper"
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
      <swiper-slide
        v-for="(critic, index) in criticsData.critics"
        :key="index"
        :class="{
          dimmed: selectedCardIndex !== null && selectedCardIndex !== index,
        }"
      >
        <Critic
          :name="critic.name"
          :category="critic.category"
          :description="critic.description"
          :image-url="critic.imageUrl"
          :isSelected="selectedCardIndex === index"
          @select="selectCard(index)"
        >
          <template v-slot:call-to-action>
            <!-- Call to action slot if needed -->
          </template>
        </Critic>
      </swiper-slide>
    </SwiperWrapper>
    <div class="buttons">
      <NuxtLink to="/track-selection">
        <Button text="Go Back" variant="secondary" fill="outline" size="large">
        </Button>
      </NuxtLink>

      <Button
        text="Analyze Song"
        variant="secondary"
        isLarge=""
        fill="fill"
        size="large"
        @click="setCritic()"
      >
        <template v-slot:icon>
          <Icon size="large" icon="login" variant="secondary"></Icon>
        </template>
      </Button>
    </div>
  </Section>
</template>
<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import { Scrollbar, FreeMode } from "swiper/modules"; // Updated import
import "swiper/css";
import "swiper/css/scrollbar";
import Swiper from "swiper";
import criticsData from "assets/data/critics.json";
import { store } from "~/stores/store";
import type Critic from "~/model/critic";

const swiper = ref<Swiper | null>(null);
const onSwiper = (swiperInstance: Swiper) => {
  swiper.value = swiperInstance;
};
const setCritic = () => {
  if (selectedCardIndex.value !== null) {
    const selectedCritic = criticsData.critics[selectedCardIndex.value];
    store.setCritic(selectedCritic);
    navigateTo("analysis-in-progress");
  } else {
    alert("Please select a critic before proceeding!");
  }
};

onMounted(() => {
  redirectIfNoSelectionMade();
});
const selectedCardIndex = ref<number | null>(null);
const selectCard = (index: number) => {
  selectedCardIndex.value = selectedCardIndex.value === index ? null : index; // Toggle selection
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;

  &-slide {
    display: flex;
    height: unset;
  }
}

.critic-selection-section {
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
}
.swiper-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  position: absolute;
  right: 0;
  top: 0;
}

.critics-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.dimmed {
  opacity: 0.7;
}

.buttons {
  display: flex;
  gap: $spacing-lg;

  & button {
    height: 100%;
  }
}
</style>
