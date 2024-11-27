<template>
  <p>
    Analysis of {{ store.selectedTrack?.name }} by
    {{
      store.selectedTrack?.artists &&
      commaSeparatedArtists(store.selectedTrack?.artists)
    }}
    is being made by {{ store.selectedCritic?.name }}
  </p>
  <div v-if="trackLyrics">
    <p v-for="line in trackLyrics.lyrics" :key="line">{{ line.line }}</p>
  </div>
</template>
<script setup lang="ts">
import Backend from "~/api/backend";
import type { TrackLyrics } from "~/model/tracklyrics";
import { store } from "~/stores/store";
const backend = new Backend();
const trackLyrics = ref<TrackLyrics | null>();
onMounted(async () => {
  if (store.selectedTrack) {
    trackLyrics.value = await backend.lyrics(store.selectedTrack);
    console.log(trackLyrics.value);
  }
});
</script>
