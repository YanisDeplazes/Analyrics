<template>
  <Section class="login-section">
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
            <Icon size="large" variant="login" type="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="selection">
        <Button text="Skip" variant="secondary" fill="outline">
        </Button>
      </NuxtLink>
    </div>
  </Section>
</template>
<style lang="scss" scoped>
.buttons {
  display: flex;
  gap: var(--spacing-lg);
  a {
    width: 100%;

    button {
      height: 100%;
      width: 100%;
    }
  }
}
.login-section{
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}
</style>
