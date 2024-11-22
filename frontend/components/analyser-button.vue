<template>
  <Button
    text="Analyse"
    variant="secondary"
    fill="fill"
    aria-label="Analyse song"
    @click="analyseSong"
  >
    <template v-slot:icon>
      <Icon size="large" variant="login" type="secondary"></Icon>
    </template>
  </Button>
  <div class="lyrics">
    <p>Lyrics:</p>
    <p v-if="selectedSong">
      {{ selectedSong.name }} by {{ selectedSong.artists[0].name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
  selectedSong: {
    type: Object,
    required: false,
  },
});

const analyseSong = async () => {
  if (!props.selectedSong) {
    console.error("No song selected!");
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/lyrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song: props.selectedSong }),
    });

    if (!response.ok) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("Lyrics fetched:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
</script>

<style scoped>
.lyrics {
  margin-top: 20px;
}
</style>
