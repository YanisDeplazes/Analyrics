<template>
  <Section class="login-section">
    <h1 class="display-2">Get a personalised experience</h1>
    <p class="login-text">
      Log in with your Spotify account to get song recommendations tailored just
      for you! Prefer not to log in? No worries—you can still search and analyze
      any song lyrics you like.
    </p>
    <div>
      <Badge text="Get personalized recommendations" variant="secondary" />
    </div>
    <div class="buttons">
      <NuxtLink to="http://localhost:3000/login">
        <Button text="Log in" variant="secondary" isLarge="" fill="fill" icon="right" size="large">
          <template v-slot:icon>
            <Icon size="large" icon="login" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="/track-selection">
        <Button text="Skip" variant="secondary" fill="outline" size="large">
        </Button>
      </NuxtLink>
    </div>
  </Section>
</template>
<script setup lang="ts">
import { store } from "~/stores/store";

onMounted(() => {
  console.log(store.spotifyUserAccessToken);
  if (store.spotifyUserAccessToken) {
    navigateTo("track-selection");
  }
});
</script>
<style lang="scss" scoped>
.buttons {
  display: flex;
  gap: $spacing-lg;

  a {
    width: 100%;

    button {
      height: 100%;
      width: 100%;
    }
  }
}

.login-section {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;

  .login-text {
    @include lg {
      max-width: 75%;
    }
  }
}
</style>
