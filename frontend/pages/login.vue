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
import { player } from "~/stores/player";
import { useRuntimeConfig } from "#app";
const config = useRuntimeConfig();

const login = () => {
  if (store.spotifyUserAccessToken) {
    navigateTo("track-selection");
  } else {
    navigateTo(config.public.backendUrl + "/login", { external: true });
  }
};

onMounted(async () => {
  await player.stopSong();

  if (store.spotifyUserAccessToken) {
    navigateTo("track-selection");
  }
});
</script>
<style lang="scss" scoped>
.login-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-bottom: 70px;

  & .login-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  & .login-text {
    @include lg {
      max-width: 65%;
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
