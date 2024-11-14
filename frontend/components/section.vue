<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss">
section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  max-width: 345px;
  margin: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
}
</style>
