<template>
  <section>
    <slot />
  </section>
</template>

<style lang="scss">
section {
  display: flex;
  gap: $spacing-lg;
  flex-direction: column;
}
</style>
