<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss">
section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  display: flex;
  gap: var(--spacing-lg);
  flex-direction: column;
}
</style>
