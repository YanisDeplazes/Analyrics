<template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <Icon size="large" variant="search" type="secondary"></Icon>
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
        <img
          :src="
            track.album?.images?.[0]?.url ||
            '/images/personas/default-cover-image.png'
          "
          alt="Album Art"
          class="track-image"
        />
        <div class="track-info" @click="selectTrack(track)">
          <span class="track-name">{{ track.name || "Unknown Track" }}</span>
          <span class="track-artist">
            {{ commaSeparatedArtists(track.artists) || "Unknown Artist" }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import debounce from "lodash/debounce";
import { store } from "~/stores/store";
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

const selectTrack = (track: SpotifyTrack) => {
  store.setSelectedTrack(track);
  navigateTo("critic-selection");
};
</script>

<style lang="css" scoped>
.searchbar-wrapper {
  display: flex;
  flex-direction: column;
  width: 345px;
}

.searchbar {
  border-radius: var(--border-md, 8px);
  background: var(--bg-secondary);
  padding: var(--spacing-md, 8px);
  display: flex;
  align-items: center;
}

.input {
  color: var(--on-secondary, #392467);
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
  border-radius: var(--border-md, 8px);
  background: var(--bg-secondary);
  overflow-y: auto;
  max-height: 300px;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.result-item:hover {
  border-radius: var(--border-md, 8px);
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    var(--bg-secondary, #fff689);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.track-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 12px;
}

.track-info {
  display: flex;
  flex-direction: column;
}

.track-name {
  color: var(--on-secondary, #392467);
  font-family: "Gothic A1";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
}

.track-artist {
  color: var(--on-secondary, #392467);
  font-family: "Gothic A1";
  font-size: 14.22px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
}
</style>
