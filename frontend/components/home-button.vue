<template>
  <div class="home-button">
    <Button
      icon-only
      variant="secondary"
      fill="fill"
      size="large"
      @click="toggleMenu"
    >
      <template v-slot:icon>
        <Icon size="large" icon="three-dots" variant="secondary"></Icon>
      </template>
    </Button>

    <template v-if="isOpen" class="home-menu">
      <NuxtLink to="/" @click="store.resetAll()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="large"
          text="Home"
        >
          <template v-slot:icon>
            <Icon size="large" icon="home" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="/critic-selection" @click="store.resetSelectedCritic()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="large"
          text="Change critic"
        >
          <template v-slot:icon>
            <Icon size="large" icon="user" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="/track-selection" @click="store.resetSelectedTrack()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="large"
          text="Change song"
        >
          <template v-slot:icon>
            <Icon size="large" icon="lyrics" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { store } from "~/stores/store";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>

<style lang="scss" scoped>
.home-button {
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1rem;
}
.home-menu {
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8rem;
}
</style>
