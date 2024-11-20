<template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <button @click="searchSong" aria-label="Search" class="icon">
        <Icon size="large" variant="search" type="secondary"></Icon>
      </button>
      <input
        class="input"
        v-model="query"
        @keyup.enter="searchSong"
        aria-label="Search for a song"
        placeholder="Search for a song"
      />
    </div>
    <ul v-if="searchResults.length" class="results-list">
      <li
        v-for="(track, index) in searchResults"
        :key="index"
        class="result-item"
        @click="selectTrack(track.uri)"
      >
        <img
          :src="
            track.album.images[0].url ||
            '/stuwe1/frontend/images/personas/default-cover-image.png'
          "
          alt="Track Image"
          class="track-image"
        />
        <div class="track-info">
          <span class="track-name">{{ track.name }}</span>
          <span class="track-artist">by {{ track.artists[0].name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  emits: ["play-track"],
  setup() {
    const query = ref<string>("");
    const searchResults = ref<
      {
        name: string;
        artists: { name: string }[];
        uri: string;
        album: { images: { url: string }[] };
      }[]
    >([]);

    const searchSong = async () => {
      if (!query.value) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/search?query=${query.value}`
        );
        if (!response.ok) {
          console.error(
            `Server error: ${response.status} ${response.statusText}`
          );
          return;
        }
        const data = await response.json();
        searchResults.value = data.tracks.items;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    const selectTrack = (track: any) => {
      $fetch("select-track", track);
    };

    return {
      query,
      searchResults,
      searchSong,
      selectTrack,
    };
  },
});
</script>

<style lang="css" scoped>
.searchbar-wrapper {
  display: flex;
  flex-direction: column;
  width: 400px;
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
