<template>
  <swiper
    :slides-per-view="1.1"
    :space-between="10"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <div class="critic">
        <div class="image">
          <img src="../public/card.png" />
          <h3 class="title">Ellen</h3>
        </div>
        <div class="category">
          <p class="icon"><i class="icon-humor"></i> Humorous Critic</p>
          <p>Lighthearted and comedic interpretations</p>
        </div>
        <p>
          Ellen is a cheerful, out-of-touch host who delivers hilariously wrong
          song interpretations with endless enthusiasm. Laughing at her own
          jokes and dropping outdated references, she's cringy yet endearing.
        </p>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="critic">
        <div class="image">
          <img src="../public/card.png" />
          <h3 class="title">Ellen</h3>
        </div>
        <div class="category">
          <p class="icon"><i class="icon-humor"></i> Humorous Critic</p>
          <p>Lighthearted and comedic interpretations</p>
        </div>
        <p>
          Ellen is a cheerful, out-of-touch host who delivers hilariously wrong
          song interpretations with endless enthusiasm. Laughing at her own
          jokes and dropping outdated references, she's cringy yet endearing.
        </p>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="critic">
        <div class="image">
          <img src="../public/card.png" />
          <h3 class="title">Ellen</h3>
        </div>
        <div class="category">
          <p class="icon"><i class="icon-humor"></i> Humorous Critic</p>
          <p>Lighthearted and comedic interpretations</p>
        </div>
        <p>
          Ellen is a cheerful, out-of-touch host who delivers hilariously wrong
          song interpretations with endless enthusiasm. Laughing at her own
          jokes and dropping outdated references, she's cringy yet endearing.
        </p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss">
.swiper-wrapper {
  .swiper-slide {
    .critic {
      background-color: var(--bg-secondary);
      border-radius: var(--border-lg);
      padding: var(--spacing-lg);
      color: var(--on-secondary);
      display: flex;
      gap: var(--spacing-lg);
      flex-direction: column;

      .image {
        position: relative;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
          aspect-ratio: 288 / 320;
          border-radius: var(--border-lg);
        }
        .title {
          position: absolute;
          bottom: var(--spacing-lg);
          background-color: var(--bg-secondary);
          border-top-right-radius: var(--border-md);
          border-bottom-right-radius: var(--border-md);
          padding: var(--spacing-md);
        }
      }
      .category {
        background-color: var(--bg-primary);
        color: var(--on-primary);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);

        border-radius: var(--border-md);
        padding: var(--spacing-md);
        .icon {
          display: flex;
          gap: 5px;
          .icon-humor {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url("./icons/humor.svg");
            background-repeat: no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
}
</style>

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
