<template>
  <span class="badge" :class="[variant]">
    <slot name="icon" />
    <small>{{ text }}</small>
  </span>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string;
  variant: "primary" | "secondary";
}>();
</script>
<style lang="scss" scoped>
.badge {
  display: flex;
  flex-direction: row;
  padding: $spacing-md;
  gap: $spacing-md;
  border-radius: $border-md;
  width: max-content;
}

.primary {
  color: $on-primary;
  background-color: $bg-primary;
}

.secondary {
  color: $on-secondary;
  background-color: $bg-secondary;
}
</style>
