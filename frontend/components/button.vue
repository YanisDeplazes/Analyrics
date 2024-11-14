<template>
  <button @click="handleClick" :class="{
    'primary-fill': fill == 'fill' && variant == 'primary',
    'secondary-fill': fill == 'fill' && variant == 'secondary',
    'primary-outline': fill == 'outline' && variant == 'primary',
    'secondary-outline': fill == 'outline' && variant == 'secondary'
  }">
    <slot name="icon" v-if="icon == 'left'" />
    {{
      text }}
    <slot name="icon" v-if="icon == 'right'" />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string,
  variant: "primary" | "secondary",
  fill: "fill" | "outline",
  icon?: "left" | "right"
}>();
const emit = defineEmits<{
  click: [e: MouseEvent]
}>();
const handleClick = (e: MouseEvent) => {
  emit("click", e);
};
</script>
<style lang="scss" scoped>
button {
  margin: 0 auto;
  display: block;
  border: unset;
  padding: var(--spacing-md);
  border-radius: var(--border-lg);

}

.primary-fill {
  background-color: var(--bg-primary);
  color: var(--on-primary);
}

.secondary-fill {
  background-color: var(--bg-secondary);
  color: var(--on-secondary);
}

.primary-outline {
  background-color: transparent;
  color: var(--bg-primary);
  border: 1px solid var(--bg-primary);
}

.secondary-outline {
  background-color: transparent;
  color: var(--bg-secondary);
  border: 1px solid var(--bg-secondary);
}
</style>
