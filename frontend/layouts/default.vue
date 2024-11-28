<template>
  <div class="content">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  min-height: calc(100vh - 2 * var(--spacing-lg));
}
</style>