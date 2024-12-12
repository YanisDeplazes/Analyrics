<template>
  <div class="home-button-wrapper">
    <div class="home-button" ref="toggleArea">
      <Button
        icon-only
        variant="secondary"
        fill="fill"
        size="large"
        @click="toggleMenu"
        class="toggleButton"
      >
        <template v-slot:icon>
          <Icon size="large" icon="three-dots" variant="secondary"></Icon>
        </template>
      </Button>
    </div>
    <div class="home-open">
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
        <NuxtLink
          v-if="store.selectedCritic && !store.isEndscreen"
          to="/critic-selection"
          @click="store.resetSelectedCritic()"
        >
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
        <NuxtLink
          v-if="store.selectedTrack && !store.isEndscreen"
          to="/track-selection"
          @click="store.resetSelectedTrack()"
        >
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
        <div to="/track-selection" @click="logout">
          <Button
            icon="left"
            variant="secondary"
            fill="fill"
            size="large"
            text="Logout"
          >
            <template v-slot:icon>
              <Icon size="large" icon="logout" variant="secondary"></Icon>
            </template>
          </Button>
        </div>
      </template>
    </div>
  </div>
  <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
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

const logout = (): void => {
  const spotifyLogoutUrl: string = "https://accounts.spotify.com/en/logout";
  const redirectUri: string = "http://localhost:8888/stuwe1/frontend";
  window.location.href = `${spotifyLogoutUrl}?redirect_uri=${redirectUri}`;
};
</script>

<style lang="scss" scoped>
.home-button {
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  &-wrapper {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
    z-index: 100;
    position: relative;
    margin-top: $spacing-xl;
  }
}
.home-open {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 100;
  top: calc(100% + 1rem);
}
.logout {
  position: absolute;
  top: 0;
  right: 0;
}

.home-menu {
  align-items: flex-end;
  flex-direction: column;
  gap: 1rem;
  display: flex;
  gap: 1rem;
  position: absolute;
}

.toggleButton {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* Dunkler Overlay */
  backdrop-filter: blur(3px); /* Blur-Effekt */
  z-index: 5; /* Sollte unter dem Menü, aber über anderen Inhalten liegen */
}
</style>
