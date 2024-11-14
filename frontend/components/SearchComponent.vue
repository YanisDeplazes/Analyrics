<template>
  <div>
    <input
      v-model="query"
      @keyup.enter="searchSong"
      placeholder="Search for a song"
    />
    <button @click="searchSong">Search</button>
    <ul v-if="searchResults.length">
      <li v-for="(track, index) in searchResults" :key="index">
        {{ track.name }} by {{ track.artists[0].name }}
        <button @click="$emit('play-track', track.uri)">Play</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      searchResults: [],
    };
  },
  methods: {
    async searchSong() {
      if (!this.query) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/search?query=${this.query}`
        );
        if (!response.ok) {
          console.error(
            `Server error: ${response.status} ${response.statusText}`
          );
          return;
        }
        const data = await response.json();
        this.searchResults = data.tracks.items;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    },
  },
};
</script>
