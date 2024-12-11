<template>
  <HomeButton />
  <Section class="critic-selection-section">
    <div class="critics-title">
      <h1>Select a critic</h1>
      <h2 class="display-5">to analyze {{ store.selectedTrack?.name }}</h2>
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
      :class="{ 'pulse-animation': showPulse }"
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
      <div class="error-message" v-if="displayError">
        Please select a critic before proceeding!
      </div>
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
const showPulse = ref(false);
const displayError = ref(false);

const setCritic = () => {
  if (selectedCardIndex.value !== null) {
    const selectedCritic = criticsData.critics[selectedCardIndex.value];
    store.setCritic(selectedCritic);
    navigateTo("analysis-in-progress");
  } else {
    showPulse.value = true;
    displayError.value = true;
    setTimeout(() => {
      showPulse.value = false; // Remove pulse animation
    }, 300); // Duration of the pulse animation

    setTimeout(() => {
      displayError.value = false; // Hide the error message after a delay
    }, 6000); // Duration to show the error message
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
  transition: transform 0.3s ease-in-out;
  &-slide {
    display: flex;
    height: unset;
  }
  &.pulse-animation {
    transform: scale(1.01);
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
  width: 100%;
}

.dimmed {
  opacity: 0.7;
}

.buttons {
  position: relative;
  display: flex;
  gap: $spacing-lg;

  & button {
    height: 100%;
  }
}

.error-message {
  margin-top: 1rem;
  color: $bg-error;
  font-size: 0.875rem; // Adjust size as needed
  text-align: center;
  position: absolute;
  bottom: -30px;
  left: 50%;
  width: 260px;
  transform: translateX(-50%);
}
</style>
