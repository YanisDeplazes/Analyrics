<template>
    <i :class="{ 'icon-large': size == 'large', 'icon-xl': size == 'xl' }">
        <img src="~assets/icons/account.svg" v-if="variant == 'account'" />
        <img src="~assets/icons/arrow-backward.svg" v-if="variant == 'arrow-backward'" />
        <img src="~assets/icons/arrow-forward.svg" v-if="variant == 'arrow-forward'" />
        <img src="~assets/icons/check.svg" v-if="variant == 'check'" />
        <img src="~assets/icons/cross.svg" v-if="variant == 'cross'" />
        <img src="~assets/icons/culture.svg" v-if="variant == 'culture'" />
        <img src="~assets/icons/error.svg" v-if="variant == 'error'" />
        <img src="~assets/icons/genre.svg" v-if="variant == 'genre'" />
        <img src="~assets/icons/humor.svg" v-if="variant == 'humor'" />
        <img src="~assets/icons/intellect.svg" v-if="variant == 'intellect'" />
        <img src="~assets/icons/keyboard-arrow-down.svg" v-if="variant == 'keyboard-arrow-down'" />
        <img src="~assets/icons/keyboard-arrow-left.svg" v-if="variant == 'keyboard-arrow-left'" />
        <img src="~assets/icons/keyboard-arrow-right.svg" v-if="variant == 'keyboard-arrow-right'" />
        <img src="~assets/icons/keyboard-arrow-up.svg" v-if="variant == 'keyboard-arrow-up'" />
        <img src="~assets/icons/login.svg" v-if="variant == 'login'" />
        <img src="~assets/icons/lyrics.svg" v-if="variant == 'lyrics'" />
        <img src="~assets/icons/niche.svg" v-if="variant == 'niche'" />
        <img src="~assets/icons/pause.svg" v-if="variant == 'pause'" />
        <img src="~assets/icons/philosophy.svg" v-if="variant == 'philosophy'" />
        <img src="~assets/icons/play.svg" v-if="variant == 'play'" />
        <img src="~assets/icons/playlist.svg" v-if="variant == 'playlist'" />
        <img src="~assets/icons/search.svg" v-if="variant == 'search'" />
        <img src="~assets/icons/user.svg" v-if="variant == 'user'" />
    </i>
</template>
<script setup lang="ts">
const props = defineProps<{
    size: "large" | "xl",
    variant: "account"
    | "arrow-backward"
    | "arrow-forward"
    | "check"
    | "cross"
    | "culture"
    | "error"
    | "genre"
    | "humor"
    | "intellect"
    | "keyboard-arrow-down"
    | "keyboard-arrow-left"
    | "keyboard-arrow-right"
    | "keyboard-arrow-up"
    | "login"
    | "lyrics"
    | "niche"
    | "pause"
    | "philosophy"
    | "play"
    | "playlist"
    | "search"
    | "user"
}>();
</script>
<style lang="css" scoped>
span{
    display: inline-block;
}
img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.icon-large {
    margin: var(--spacing-sm);
    width: 1rem;
    height: 1rem;
}

.icon-xl {
    margin: var(--spacing-md);
    width: 2rem;
    height: 2rem;
}
</style>