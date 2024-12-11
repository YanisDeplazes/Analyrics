<template>
  <div :class="['notification', variant]" v-if="visible">
    <div class="notification-header">
      <h1 class="notification-title">{{ title }}</h1>
      <Icon icon="cross" variant="error" size="xl" @click="close"></Icon>
    </div>
    <p>
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant: "success" | "error" | "info" | "warning";
  title: string;
  description: string;
}>();
const visible = ref(true);
const close = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.notification {
  padding: $spacing-lg;
  border-radius: $border-lg;
  display: flex;
  flex-direction: column;

  .notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.success {
  color: $on-success;
  background-color: $bg-success;
}

.error {
  color: $on-error;
  background-color: $bg-error;
}

.info {
  color: $on-info;
  background-color: $bg-info;
}

.warning {
  color: $on-warning;
  background-color: $bg-warning;
}
</style>
