<!-- <template>
  <div class="searchbar-wrapper">
    <div class="searchbar">
      <Icon size="large" variant="search" type="secondary"></Icon>
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
        @click="$emit('play-track', track.uri)"
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

    return {
      query,
      searchResults,
      searchSong,
    };
  },
});
</script> -->

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

    <ul v-if="query && filteredResults.length" id="myMenu" class="results-list">
      <li
        v-for="(track, index) in filteredResults"
        :key="index"
        class="result-item"
        @click="$emit('play-track', track.uri)"
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

<!-- <script lang="ts">
import { defineComponent, ref, computed } from "vue";
import debounce from "lodash/debounce";

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

    // Computed property to filter search results based on query
    const filteredResults = computed(() =>
      searchResults.value.filter((track) =>
        track.name.toUpperCase().includes(query.value.toUpperCase())
      )
    );

    // Debounced search function to limit requests
    const performSearch = debounce(async (searchQuery: string) => {
      try {
        const response = await fetch(
          `http://localhost:3000/search?query=${searchQuery}`
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
    }, 300); // Wartezeit von 300ms, um Anfragen zu reduzieren

    const searchSong = () => {
      if (query.value) {
        performSearch(query.value);
      } else {
        searchResults.value = [];
      }
    };

    return {
      query,
      searchResults,
      filteredResults,
      searchSong,
    };
  },
});
</script> -->

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import debounce from "lodash/debounce";

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

    // Computed property to filter search results based on query
    const filteredResults = computed(() =>
      searchResults.value.filter((track) =>
        track.name.toUpperCase().includes(query.value.toUpperCase())
      )
    );

    // Helper to build search query for Spotify API
    const buildQuery = (input: string): string => {
      const parts = input.trim().split(" ");
      let track = "";
      let artist = "";

      if (parts.length > 1) {
        track = parts[0]; // Erstes Wort als Track
        artist = parts.slice(1).join(" "); // Rest als Artist
      } else {
        track = parts[0]; // Falls nur ein Wort vorhanden ist
      }

      let query = `track:${track}`;
      if (artist) query += ` artist:${artist}`;
      return encodeURIComponent(query);
    };

    // Debounced search function to limit requests
    const performSearch = debounce(async (searchQuery: string) => {
      const formattedQuery = buildQuery(searchQuery);

      try {
        const response = await fetch(
          `http://localhost:3000/search?query=${formattedQuery}`
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
    }, 300); // Wartezeit von 300ms, um Anfragen zu reduzieren

    // Trigger search when query changes
    const searchSong = () => {
      if (query.value) {
        performSearch(query.value);
      } else {
        searchResults.value = []; // Leere Liste bei leerer Eingabe
      }
    };

    return {
      query,
      searchResults,
      filteredResults,
      searchSong,
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
