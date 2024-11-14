<template>
  <Section>
    <h1 class="display-2">Get a personalised experience</h1>
    <p>
      Log in with your Spotify account to get song recommendations tailored just
      for you! Prefer not to log in? No worries—you can still search and analyze
      any song lyrics you like.
    </p>
    <div class="buttons">
      <NuxtLink to="http://localhost:3000/login">
        <Button text="Log in" variant="secondary" fill="fill" icon="right">
          <template v-slot:icon>
            <Icon size="large" variant="login"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <Button text="Skip" variant="secondary" fill="outline" icon="right">
        <template v-slot:icon> </template>
      </Button>
    </div>
  </Section>
</template>

<style lang="scss">
.buttons {
  display: flex;
  gap: var(--spacing-lg);
  > *,
  button {
    width: 100%;
  }
}
</style>
