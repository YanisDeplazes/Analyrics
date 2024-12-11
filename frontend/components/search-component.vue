<template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <Icon size="large" icon="search" variant="secondary"></Icon>
      <input
        id="mySearch"
        class="input"
        v-model="query"
        @input="searchSong"
        aria-label="Search for a song"
        placeholder="Search for a song"
      />
    </div>
    <ul class="results-list">
      <li
        v-for="(track, index) in filteredResults"
        :key="index"
        class="result-item"
      >
        <TrackPreview :track="track" :index="index" />
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import debounce from "lodash/debounce";
import type { SpotifyTrack } from "~/model/spotify";
import Backend from "~/api/backend";
const backend = new Backend();
const emit = defineEmits<{
  playTrack: [track: SpotifyTrack];
}>();
const query = ref<string>("");
const searchResults = ref<Array<SpotifyTrack>>([]);

const filteredResults = computed(() => {
  return searchResults.value;
});

// Debounced search function to limit requests
const performSearch = debounce(async (searchQuery: string) => {
  if (searchQuery.length < 3) {
    return;
  }

  try {
    searchResults.value = await backend.search(searchQuery);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}, 300); // Wartezeit von 300ms, um Anfragen zu reduzieren

const searchSong = () => {
  if (query.value) {
    performSearch(query.value);
  } else {
    searchResults.value = [];
  }
};
</script>

<style lang="scss" scoped>
.searchbar-wrapper {
  display: flex;
  flex-direction: column;
  width: 345px;
}

.searchbar {
  border-radius: $border-md;
  background: $bg-secondary;
  padding: $spacing-md;
  display: flex;
  align-items: center;
}

.input {
  color: $on-secondary;
  background: transparent;
  border: none;
  outline: none;
  font-family: "Gothic A1";
  font-size: 16px;
  width: 100%;
}

.icon {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.results-list {
  list-style: none;
  padding: 0;
  margin-top: 8px;
  border-radius: $border-md;
  background: $bg-secondary;
  overflow-y: auto;
  max-height: 300px;
  & .track {
    border-radius: unset;
    & .track-image {
      width: 50px !important;
      height: 50px !important;
    }
  }
}
</style>
