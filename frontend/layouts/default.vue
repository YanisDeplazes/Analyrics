<template>
  <div class="content">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: var(--spacing-lg);
  max-width: 345px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>