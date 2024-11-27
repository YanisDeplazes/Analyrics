<template>
  <div class="progress-container">
    <p>
      Analysis of {{ store.selectedTrack?.name }} by
      {{
        store.selectedTrack?.artists &&
        commaSeparatedArtists(store.selectedTrack?.artists)
      }}
      is being made by {{ store.selectedCritic?.name }}
    </p>
    <p>{{ lyricsFetchStateMessage }}</p>
    <p v-if="areLyricsFetched">{{ lyricsAnalysedStateMessage }}</p>
    <CriticConversation :critic="store.selectedCritic" chat="Okay let's have a look" v-if="store.selectedCritic">
    </CriticConversation>
  </div>
</template>
<script setup lang="ts">
import Backend from "~/api/backend";
import type { TrackLyrics } from "~/model/tracklyrics";
import { store } from "~/stores/store";
const backend = new Backend();
const trackLyrics = ref<TrackLyrics | null>();
const areLyricsFetched = ref<boolean>(false);
const areLyricsAnalysed = ref<boolean>(false);
onMounted(async () => {
  if (store.selectedTrack && store.selectedCritic) {
    trackLyrics.value = await backend.lyrics(store.selectedTrack);
    areLyricsFetched.value = true;
    store.setLineAnalysis(await backend.analyseLyrics(trackLyrics.value, store.selectedCritic));
    areLyricsAnalysed.value = true;
    setTimeout(() => {
      navigateTo("analysis-result");
    }, 2000)
  }
});
const lyricsFetchStateMessage = computed(() => areLyricsFetched.value ? "Lyrics fetched" : "Fetching lyrics")
const lyricsAnalysedStateMessage = computed(() => areLyricsAnalysed.value ? "Lyrics analysed" : "Analysing lyrics");
</script>
<style lang="scss" scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
</style>
