<template>
  <NuxtLink to="/">
    <Button
      class="home-button"
      icon-only
      variant="secondary"
      fill="fill"
      size="sm"
    >
      <template v-slot:icon>
        <Icon size="xl" variant="home" type="secondary"></Icon> </template
    ></Button>
  </NuxtLink>

  <div class="end-screen">
    <h1>That's it!</h1>
    <p>
      If you want to see how another critic comments "{{
        store.selectedTrack?.name
      }}" you can:
    </p>
    <NuxtLink to="/critic-selection">
      <Button
        icon="left"
        variant="secondary"
        fill="fill"
        size="sm"
        text="Choose another critic"
      >
        <template v-slot:icon>
          <Icon size="xl" type="secondary" variant="user"></Icon>
        </template>
      </Button>
    </NuxtLink>
    <p>
      If you want to continue with {{ store.selectedCritic?.name }} you can:
    </p>
    <NuxtLink to="/track-selection">
      <Button
        icon="left"
        variant="secondary"
        fill="fill"
        size="sm"
        text="Choose another song"
      >
        <template v-slot:icon>
          <Icon size="xl" type="secondary" variant="lyrics"></Icon>
        </template>
      </Button>
    </NuxtLink>
    <CriticConversation
      v-if="store.selectedCritic"
      :critic="store.selectedCritic"
      :chat="store.currentAnalysis"
    >
      <template v-slot:navigation>
        <div class="result-navigation">
          <Button
            variant="primary"
            icon="left"
            text="Back"
            fill="outline"
            size="sm"
          >
            <template v-slot:icon>
              <Icon
                type="secondary"
                size="large"
                variant="arrow-backward"
              ></Icon>
            </template>
          </Button>
          <Button
            variant="primary"
            icon="right"
            text="Next"
            fill="fill"
            size="sm"
          >
            <template v-slot:icon>
              <Icon type="primary" size="large" variant="arrow-forward"></Icon>
            </template>
          </Button>
        </div>
      </template>
    </CriticConversation>
  </div>
</template>

<script setup lang="ts">
import { store } from "~/stores/store";
</script>

<style lang="scss" scoped>
.home-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.end-titel {
}
</style>
