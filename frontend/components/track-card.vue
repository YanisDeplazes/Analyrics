<script setup lang="ts">
import { store } from '~/stores/store';
</script>

<template>
    <div class="track-container">
        <p>Your track</p>
        <div class="track">
            <img :src="store.selectedTrack?.album.images[0].url" />
            <div class="track-info">
                <p>{{ store.selectedTrack?.name }}</p>
                <p>{{ commaSeparatedArtists(store.selectedTrack!.artists) }}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.track-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
    padding: $spacing-md;
    border-radius: $spacing-md;
    background-color: $bg-secondary;
    color: $on-secondary;

    .track {
        display: flex;
        flex-direction: row;
        gap: $spacing-md;
        justify-content: center;

        img {
            width: 2.5rem;
            height: 2.5rem;
        }

        .track-info {
            display: flex;
            flex-direction: column;
        }
    }


}
</style>