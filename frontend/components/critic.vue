<template>
  <div class="critic">
    <div class="image">
      <img :src="imageUrlWithBaseUrl" />
      <h3 class="title">{{ name }}</h3>
    </div>
    <CriticCategory :variant="category"></CriticCategory>
    <p>{{ description }}</p>
    <slot name="call-to-action" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string;
  category:
  | "culture"
  | "genre"
  | "humor"
  | "philosophy"
  | "intellect"
  | "niche";
  description: string;
  imageUrl: string;
}>();
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
}
</style>
