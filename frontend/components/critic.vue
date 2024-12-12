<template>
  <div
    class="critic"
    :class="{ selected: isSelected, dimmed: !isSelected && isAnotherSelected }"
    @click="handleClick"
  >
    <div class="image">
      <img :src="imageUrlWithBaseUrl" />
      <h3 class="title">{{ name }}</h3>
    </div>
    <CriticCategory :category="safeCategory"></CriticCategory>
    <p class="critic-description">{{ description }}</p>
    <slot name="call-to-action" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define props
const props = defineProps<{
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  isSelected?: boolean; // Optional prop for selected state
  isAnotherSelected?: boolean; // Optional prop for dimming logic
}>();

// Emit events
const emit = defineEmits<{
  (event: "select"): void; // Emit when this critic is selected
}>();

// Validate category
const validCategories = [
  "culture",
  "genre",
  "humor",
  "philosophy",
  "intellect",
  "niche",
] as const;

const safeCategory = computed(() =>
  validCategories.includes(props.category as (typeof validCategories)[number])
    ? (props.category as (typeof validCategories)[number])
    : "niche"
);

// Compute image URL with base path
const imageUrlWithBaseUrl = computed(() => `/stuwe1/frontend${props.imageUrl}`);

// Handle click and emit "select"
function handleClick() {
  emit("select");
}
</script>

<style lang="scss" scoped>
.critic {
  padding: $spacing-lg;
  color: $on-secondary;
  display: flex;
  gap: $spacing-lg;
  flex-direction: column;
  background-color: $bg-secondary;
  border-radius: $border-lg;
  transition: all 0.3s ease;
  box-sizing: border-box; // Ensure the border is included in dimensions
  border: 3px solid transparent;

  &::after {
    content: "";
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: var(--on-primary);
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.selected {
    border: 3px solid var(--on-primary);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
    &::after {
      content: "";
      position: absolute;

      background-color: var(--on-primary);
      border-radius: 100%;

      background-image: url("../public/icons/check.svg");
      background-repeat: no-repeat;
      background-size: 70%;
      background-position: center;
    }
  }

  &.dimmed {
    opacity: 0.7;
  }

  .image {
    position: relative;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      aspect-ratio: 288 / 320;
      border-radius: $border-lg;
    }

    .title {
      position: absolute;
      bottom: $spacing-lg;
      background-color: $bg-secondary;
      border-top-right-radius: $border-md;
      border-bottom-right-radius: $border-md;
      padding: $spacing-md;
    }
  }

  &:hover {
    background-color: rgba(255, 246, 137, 0.8);
    & .title {
      background-color: rgba(255, 246, 137, 0.8) !important;
    }

    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    &.selected {
      opacity: 1;
    }
  }
}
</style>
