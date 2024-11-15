<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss">
section {
  display: flex;
  gap: var(--spacing-lg);
  flex-direction: column;
}
</style>
