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
    <Loader :is-loading="!areLyricsFetched" loading-in-progress-message="Fetching lyrics..."
      loading-finished-message="Lyrics fetched" :has-error="hasLyricsFetchingError"
      :error-message="lyricsFetchingError"></Loader>
    <Loader v-if="areLyricsFetched && !hasLyricsFetchingError" :is-loading="!areLyricsAnalysed"
      loading-in-progress-message="Analysing lyrics..." loading-finished-message="Lyrics analysed"
      :has-error="hasLyricsAnalysisError" :error-message="lyricsAnalysisError"></Loader>
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
const hasLyricsFetchingError = ref<boolean>(false);
const lyricsFetchingError = ref<string>("");
const areLyricsAnalysed = ref<boolean>(false);
const hasLyricsAnalysisError = ref<boolean>(false);
const lyricsAnalysisError = ref<string>("");
onMounted(async () => {
  if (store.selectedTrack && store.selectedCritic) {
    try {
      trackLyrics.value = await backend.lyrics(store.selectedTrack);
      areLyricsFetched.value = true;
    }
    catch (error) {
      hasLyricsFetchingError.value = true;
      lyricsFetchingError.value = "This is embarrassing, but we could not get the lyrics for this track.";
      return;
    }
    try {
      store.setLineAnalysis(await backend.analyseLyrics(trackLyrics.value, store.selectedCritic));
      areLyricsAnalysed.value = true;
      setTimeout(() => {
        navigateTo("analysis-result");
      }, 2000)
    }
    catch (error) {
      hasLyricsAnalysisError.value = true;
      lyricsAnalysisError.value = "Well... our AI seems to be too dumb to analyze these lyrics. We sincerely apologize."
    }
  }
});
</script>
<style lang="scss" scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
</style>
