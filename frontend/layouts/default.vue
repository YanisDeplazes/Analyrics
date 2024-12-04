<template>
  <div class="content">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: $spacing-lg;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  min-height: calc(100vh - 2 * $spacing-lg);
}
</style>