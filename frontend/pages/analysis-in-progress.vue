<template>
    <p>Analysis of {{ store.selectedTrack?.name }} by {{
        store.selectedTrack?.artists && commaSeparatedArtists(store.selectedTrack?.artists) }} is being made by {{
            store.selectedCritic?.name }}</p>
</template>
<script setup lang="ts">
import { store } from '~/stores/store';
</script>