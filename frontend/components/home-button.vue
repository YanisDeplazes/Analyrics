<template>
  <div class="home-button-wrapper">
    <div class="home-button" ref="toggleArea">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { store } from "~/stores/store";

const isOpen = ref(false);

const toggleArea = ref<HTMLElement | null>(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

// Funktion, die Klicks außerhalb des Bereichs behandelt
const handleClickOutside = (event: MouseEvent) => {
  if (toggleArea.value && !toggleArea.value.contains(event.target as Node)) {
    isOpen.value = false; // Toggle schließen
  }
};

// Event-Listener für globale Klicks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.home-button {
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  &-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
}
.home-menu {
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8rem;
}
</style>
