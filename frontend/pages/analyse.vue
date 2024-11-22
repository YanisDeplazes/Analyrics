<template>
  <SearchComponent @select-track="setSelectedSong" />
  <AnalyserButton :SelectedSong="selectedSong" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchComponent from "@/components/search-component.vue";
import AnalyserButton from "@/components/analyser-button.vue";

const selectedSong = ref(null);

const setSelectedSong = (song: any) => {
  selectedSong.value = song;
};
</script>
