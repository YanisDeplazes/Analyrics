<template>
  <div class="cards">
    <div
      v-for="(image, index) in selectedImages"
      :key="index"
      :class="['card', { reveal: isRevealing, unreveal: isUnrevealing }]"
    >
      <img :src="image" alt="Card image" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Array of image names
const images = [
  "emma",
  "buck",
  "celeste",
  "chad",
  "dante",
  "earl",
  "ellen",
  "gabby",
  "gordon",
  "kyla",
  "lexi",
  "lily",
  "lyle",
  "michael",
  "milo",
  "riff",
  "sage",
];

// Reactive states
const selectedImages = ref<string[]>([]);
const isRevealing = ref(false);
const isUnrevealing = ref(false);
let previousImages: string[] = []; // Track previously displayed images
let isFirstRun = true; // Track the first run

// Helper function to construct image paths
const getImagePath = (image: string) => `./images/personas/${image}.png`;

// Function to randomly pick 3 unique images
const pickRandomImages = () => {
  if (!isFirstRun) {
    // Start unreveal animation for subsequent runs
    isUnrevealing.value = true;

    setTimeout(() => {
      // Reset unreveal and pick new images
      isUnrevealing.value = false;
      updateImages();
    }, 2000); // Match unreveal duration
  } else {
    // First run: Immediately pick and reveal new images
    updateImages();
    isFirstRun = false; // Disable first-run flag after initial iteration
  }
};

// Helper function to update images and start reveal animation
const updateImages = () => {
  const availableImages = images.filter(
    (image) => !previousImages.includes(image) // Exclude previously displayed images
  );

  // Ensure at least 3 images are available by adding back previous images
  if (availableImages.length < 3) {
    previousImages = [];
    availableImages.push(
      ...images.filter((image) => !availableImages.includes(image))
    );
  }

  // Shuffle available images and pick the first 3
  const shuffled = [...availableImages].sort(() => Math.random() - 0.5);
  const newSelection = shuffled.slice(0, 3);

  selectedImages.value = newSelection.map(getImagePath);
  previousImages = [...newSelection]; // Update the previously displayed images

  // Start reveal animation
  isRevealing.value = true;
  setTimeout(() => {
    isRevealing.value = false;
  }, 2000); // Match animation duration
};

// Lifecycle hooks
onMounted(() => {
  pickRandomImages(); // Initial pick
  const interval = setInterval(() => {
    pickRandomImages(); // Update every 12 seconds
  }, 12000);

  onUnmounted(() => {
    clearInterval(interval); // Cleanup interval on unmount
  });
});
</script>

<style lang="scss">
.cards {
  width: 100%;
  max-height: inherit;
  display: flex;
  max-width: 580px;
  margin: auto;

  .card {
    width: calc(100% / 3);
    max-height: inherit;
    border-radius: var(--border-md);
    background-color: var(--bg-secondary);
    border: 4px var(--bg-secondary) solid;
    position: relative;
    aspect-ratio: 9 / 16;

    &::after {
      position: absolute;
      top: -5px;
      left: -5px;
      height: calc(100% + 10px);
      width: calc(100% + 10px);
      content: "";
      display: block;
      background-color: rgba(255, 246, 137, 1); // Semi-transparent highlight
      border-radius: var(--border-md);
      z-index: 2;
      opacity: 0; // Initially hidden
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--border-md);
    }

    &:nth-child(1) {
      transform: translate(0px, 15px);
      rotate: -10deg;
    }

    &:nth-child(2) {
      scale: 1.15;
      z-index: 1;
    }

    &:nth-child(3) {
      transform: translate(0px, 15px);
      rotate: 10deg;
    }

    &.reveal {
      &::after {
        opacity: 0; // Show the overlay during reveal
        animation: hide 1s ease-in-out forwards;
      }

      &:nth-child(1) {
        animation: reveal-1 2s forwards;
      }

      &:nth-child(2) {
        z-index: 1;
      }

      &:nth-child(3) {
        animation: reveal-3 2s forwards;
      }
    }

    &.unreveal {
      &:nth-child(1) {
        animation: unreveal-1 2s forwards;
        &::after {
          animation: show 1s ease-in-out forwards;
          animation-delay: 1s;
        }
      }

      &:nth-child(2) {
        &::after {
          animation: show 1s ease-in-out forwards;
          animation-delay: 1s;
        }
      }

      &:nth-child(3) {
        animation: unreveal-3 2s forwards;
        &::after {
          animation: show 1s ease-in-out forwards;
          animation-delay: 1s;
        }
      }
    }
  }

  // Keyframes for reveal animation
  @keyframes reveal-1 {
    from {
      transform: translate(100px, 0px);
      rotate: 0deg;
    }

    to {
      transform: translate(0px, 15px);
      rotate: -10deg;
    }
  }

  @keyframes reveal-3 {
    from {
      transform: translate(-100px, 0px);
      rotate: 0deg;
    }

    to {
      transform: translate(0px, 15px);
      rotate: 10deg;
    }
  }

  @keyframes show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes unreveal-1 {
    from {
      transform: translate(0px, 15px);
      rotate: -10deg;
    }

    to {
      transform: translate(100px, 0px);
      rotate: 0deg;
    }
  }

  @keyframes unreveal-3 {
    from {
      transform: translate(0px, 15px);
      rotate: 10deg;
    }

    to {
      transform: translate(-100px, 0px);
      rotate: 0deg;
    }
  }
}
</style>
