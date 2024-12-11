<template>
  <div class="content">
    <slot />
  </div>
  <Player />
</template>
<style lang="scss" scoped>
.content {
  padding: $spacing-lg $spacing-lg 0 $spacing-lg;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  min-height: calc(100vh - $spacing-lg);
}
</style>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

const route = useRoute();

onMounted(() => {
  watch(
    () => route.name, // Watch the route name
    (newPageName) => {
      if (typeof document !== "undefined" && document.body) {
        // Remove previous page classes
        document.body.className = document.body.className
          .split(" ")
          .filter((cls) => !cls.startsWith("page-"))
          .join(" ");

        // Add the new page class
        if (newPageName) {
          document.body.classList.add(`page-${newPageName}`);
        }
      }
    },
    { immediate: true } // Run immediately on load
  );
});
</script>
