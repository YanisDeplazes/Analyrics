<template>
  <Section class="login-section">
    <h1 class="display-2">Get a personalised experience</h1>
    <div class="login-content">
      <p class="login-text">
        Log in with your Spotify account to get song recommendations tailored
        just for you! Prefer not to log in? No worries—you can still search and
        analyze any song lyrics you like.
      </p>
      <div class="buttons">
        <Button
          text="Log in"
          variant="secondary"
          isLarge=""
          fill="fill"
          icon="right"
          size="large"
          @click="login()"
        >
          <template v-slot:icon>
            <Icon size="large" icon="login" variant="secondary"></Icon>
          </template>
        </Button>
        <NuxtLink to="/track-selection">
          <Button text="Skip" variant="secondary" fill="outline" size="large">
          </Button>
        </NuxtLink>
      </div>
    </div>
  </Section>
</template>
<script setup lang="ts">
import { store } from "~/stores/store";

const login = () => {
  if (store.spotifyUserAccessToken) {
    navigateTo("track-selection");
  } else {
    navigateTo("http://localhost:3000/login", { external: true });
  }
};

onMounted(() => {
  if (store.spotifyUserAccessToken) {
    navigateTo("track-selection");
  }
});
</script>
<style lang="scss" scoped>
.login-section {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;

  & .login-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    gap: $spacing-lg;
  }

  & .login-text {
    @include lg {
      max-width: 75%;
    }
  }
  .buttons {
    display: flex;
    gap: $spacing-lg;

    & button {
      height: 100%;
    }
  }
}
</style>
