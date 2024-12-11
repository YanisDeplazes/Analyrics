<template>
  <div class="critic">
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

// Allowed categories
const validCategories = [
  "culture",
  "genre",
  "humor",
  "philosophy",
  "intellect",
  "niche",
] as const;

const props = defineProps<{
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}>();

const safeCategory = computed<
  "culture" | "genre" | "humor" | "philosophy" | "intellect" | "niche"
>(() =>
  validCategories.includes(props.category as (typeof validCategories)[number])
    ? (props.category as (typeof validCategories)[number])
    : "niche"
);

const imageUrlWithBaseUrl = computed(() => `/stuwe1/frontend${props.imageUrl}`);
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

  & .critic-description {
    flex: 1;
  }

  & .image {
    position: relative;

    & img {
      width: 100%;
      height: auto;
      object-fit: cover;
      aspect-ratio: 288 / 320;
      border-radius: $border-lg;
    }

    & .title {
      position: absolute;
      bottom: $spacing-lg;
      background-color: $bg-secondary;
      border-top-right-radius: $border-md;
      border-bottom-right-radius: $border-md;
      padding: $spacing-md;
    }
  }
}
</style>
