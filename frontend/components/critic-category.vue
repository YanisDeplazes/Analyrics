<template>
  <div class="category">
    <p class="icon">
      <Icon :icon="category" size="large" variant="primary"></Icon>
      <strong>{{ categoryTitle }}</strong>
    </p>
    <p>
      <small>{{ categoryDescription }}</small>
    </p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  category:
    | "culture"
    | "genre"
    | "humor"
    | "philosophy"
    | "intellect"
    | "niche";
}>();

const categoryTitle = computed(() => {
  switch (props.category) {
    case "culture":
      return "Cultural commentator";
    case "genre":
      return "Genre Enthusiast";
    case "humor":
      return "Humorous Critic";
    case "intellect":
      return "Intellectual Critic";
    case "niche":
      return "Niche Perspective";
    case "philosophy":
      return "Philosophical Analyst";
  }
});

const categoryDescription = computed(() => {
  switch (props.category) {
    case "culture":
      return "Connecting music, culture";
    case "genre":
      return "Exploring genres deeply";
    case "humor":
      return "Sharing musical humor";
    case "intellect":
      return "Exploring musical meaning";
    case "niche":
      return "Sharing unique views";
    case "philosophy":
      return "Offering scholarly insights";
  }
});
</script>
<style lang="scss" scoped>
.category {
  background-color: $bg-primary;
  color: $on-primary;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  border-radius: $border-md;
  padding: $spacing-md;

  & .icon {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }
}
</style>
