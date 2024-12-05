<template>
  <Section class="introduction-section">
    <CardsReveal />
  </Section>
  <Section class="branding-section">
    <h1 class="font-branding text-center">THE UNDERTONE COLLECTIVE</h1>
    <p class="branding-text">
      The Undertone Collective is where music’s hidden stories come to life. Our
      team of fictional critics, delves into the meaning behind the lyrics you
      love. From insightful analysis to playful commentary, The Undertone
      Collective offers a fresh perspective on every song.
    </p>
    <NuxtLink to="/login">
      <Button text="Explore now" variant="secondary" fill="fill" size="large" icon="right" class="pulsate">
        <template v-slot:icon>
          <Icon size="large" icon="arrow-forward" variant="secondary"></Icon>
        </template>
      </Button>
    </NuxtLink>
  </Section>
  <Section class="critics-section">
    <CrititsOverview />
  </Section>
  <Section class="disclaimer-section">
    <Disclaimer />
  </Section>
</template>

<style lang="scss" scoped>
.introduction-section,
.critics-section,
.branding-section,
.disclaimer-section {
  margin: $spacing-2xl $spacing-lg;
}

.branding-section {
  align-items: center;

  .branding-text {
    @include lg {
      max-width: 75%;
    }
  }
}

.text-center {
  text-align: center;
}

.introduction-section {
  max-height: 50vh;
}

.pulsate {
  animation: pulsate 2s linear infinite;
}

.pulsate:hover {
  animation-play-state: paused;
}

@keyframes pulsate {
  0% {
    scale: 1;
  }

  50% {
    scale: 1.1;
  }

  100% {
    scale: 1;
  }
}
</style>
