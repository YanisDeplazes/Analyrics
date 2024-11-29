<template>
  <Section class="introduction-section">
    <CardsReveal />
  </Section>
  <Section class="branding-section">
    <h1 class="font-branding text-center">THE UNDERTONE COLLECTIVE</h1>
    <p>
      The Undertone Collective is where music’s hidden stories come to life. Our
      team of fictional critics, delves into the meaning behind the lyrics you
      love. From insightful analysis to playful commentary, The Undertone
      Collective offers a fresh perspective on every song.
    </p>
    <NuxtLink to="/login">
      <Button text="Explore now" variant="secondary" fill="fill" size="lg" icon="right">
        <template v-slot:icon>
          <Icon size="large" variant="arrow-forward" type="secondary"></Icon>
        </template>
      </Button>
    </NuxtLink>
  </Section>
  <Section class="critics-section">
    <CrititsOverview />
  </Section>
  <Section class="disclaimer-section">
    <h2>Disclaimer</h2>
    <p>
      The application uses a Large Language Model by Google called Gemini to analyse
      song lyrics. The lyrics are provided by Genius.com, where most
      lyrics are user-submitted; therefore, complete accuracy cannot be guaranteed. Please note
      that the analyses provided are for informational purposes only. We disclaim any
      responsibility for the accuracy or completeness of the lyrics or
      their interpretations. The analysis may not fully capture the intended meaning or context
      of the lyrics. For critical interpretations and insights, we recommend consulting the
      original source or a lyricist directly.
    </p>
  </Section>
</template>
<style lang="scss" scoped>
.introduction-section,
.critics-section,
.branding-section,
.disclaimer-section {
  margin: var(--spacing-2xl) var(--spacing-lg);
}

.text-center {
  text-align: center;
}

.introduction-section {
  max-height: 50vh;
}
</style>
