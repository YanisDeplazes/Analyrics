<template>
  <button
    @click="handleClick"
    class="button"
    :class="[
      {
        'primary-fill': fill == 'fill' && variant == 'primary',
        'secondary-fill': fill == 'fill' && variant == 'secondary',
        'primary-outline': fill == 'outline' && variant == 'primary',
        'secondary-outline': fill == 'outline' && variant == 'secondary',
      },
      `size-${size}`,
      { 'icon-only': iconOnly },
    ]"
  >
    <template v-if="!iconOnly">
      <slot name="icon" v-if="icon == 'left'" />
      {{ text }}
      <slot name="icon" v-if="icon == 'right'" />
    </template>
    <template v-else>
      <slot name="icon" />
    </template>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  text?: string;
  variant: "primary" | "secondary";
  fill: "fill" | "outline";
  icon?: "left" | "right";
  size: "sm" | "lg";
  iconOnly?: boolean;
}>();
const emit = defineEmits<{
  click: [e: MouseEvent];
}>();
const handleClick = (e: MouseEvent) => {
  emit("click", e);
};
</script>
<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: unset;
}

.button:hover {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  scale: 1.01;
  cursor: pointer;
}

.button:active {
  scale: 1.05;
}

/*sizes*/
.size-sm {
  padding: $spacing-md;
  border-radius: $border-md;
  position: relative;
  right: 0;
  display: inline-flex;
}

.size-lg {
  padding: $spacing-lg;
  border-radius: $border-lg;
  position: relative;
  right: 0;
  display: inline-flex;
}

/*colors*/
.primary-fill {
  background-color: $bg-primary;
  color: $on-primary;
}

.secondary-fill {
  background-color: $bg-secondary;
  color: $on-secondary;
}

.primary-outline {
  background-color: transparent;
  color: $bg-primary;
  border: 1px solid $bg-primary;
}

.secondary-outline {
  background-color: transparent;
  color: $bg-secondary;
  border: 1px solid $bg-secondary;
}
</style>
