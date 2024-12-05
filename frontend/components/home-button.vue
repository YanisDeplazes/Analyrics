<template>
  <div class="home-button">
    <Button
      icon-only
      variant="secondary"
      fill="fill"
      size="small"
      @click="toggleMenu"
    >
      <template v-slot:icon>
        <Icon size="xl" icon="three-dots" variant="secondary"></Icon>
      </template>
    </Button>

    <template v-if="isOpen" class="home-menu">
      <NuxtLink to="/" @click="store.resetAll()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="small"
          text="Home"
        >
          <template v-slot:icon>
            <Icon size="xl" icon="home" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="/critic-selection" @click="store.resetSelectedCritic()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="small"
          text="Change critic"
        >
          <template v-slot:icon>
            <Icon size="xl" icon="user" variant="secondary"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <NuxtLink to="/track-selection" @click="store.resetSelectedTrack()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="small"
          text="Change song"
        >
          <template v-slot:icon>
            <Icon size="xl" icon="lyrics" variant="secondary"></Icon>
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
  position: fixed;
  flex-direction: column;
  display: flex;
  top: 1rem;
  right: 1rem;
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
