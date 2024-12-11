<template>
    <div class="container">
        <div class="button-container">
            <Button v-for="m in moods" variant="secondary" fill="fill" :text="m" size="large" @click="changeMood(m)" />
        </div>
        <div class="lyrics-container">
            <h1 :class="`font-${currentMood} lyrics lyrics-${currentMood}`">
                <span v-for="(lyric, index) in currentLyrics"
                    :style="`--i:${index};--random-skew-x:${randomForRange(-15, 15)}deg;--random-skew-y:${randomForRange(-15, 15)}deg`">
                    {{ `${lyric}&nbsp;` }}
                </span>
            </h1>
        </div>
    </div>
</template>
<script setup lang="ts">
type mood = "happy" | "smirk" | "calm" | "sad" | "weird";
const moods: Array<mood> = ["happy", "smirk", "calm", "sad", "weird"];
const currentMood = ref<mood>("happy");
const currentLyrics = ref<Array<string>>([])
const changeMood = (selectedMood: mood) => {
    currentMood.value = selectedMood;
    switch (selectedMood) {
        default:
        case "happy":
            currentLyrics.value = "Quand tu m'serres dans tes bras J'te veux présente dans les hauts et les bas".split(" ");
            break;
        case "calm":
            currentLyrics.value = "My, I wanna drink the sweat of your intellect Reflect, and watch your light passion mark my neck".split(" ");
            break;
        case "sad":
            currentLyrics.value = "I don't know, I don't know, I don't know, I don't know why I do it every, every, everytime".split(" ");
            break;
        case "weird":
            currentLyrics.value = "Meine Chain sieht aus, als wären Glühbirnen drauf (Ice) Zitroneneiscreme in meinen Ohren und im Mouth (Burr)".split(" ");
            break;
        case "smirk":
            currentLyrics.value = "C'pas demain qu'on fera d'la lèche Gros popotin, yeux de biche".split(" ");
            break;
    }
}
onMounted(() => {
    changeMood("happy");
})
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    .button-container {
        display: flex;
        flex-direction: row;
        padding: $spacing-lg;
        gap: $spacing-lg;
    }

    .lyrics-container {
        display: flex;
        flex-direction: column;
        gap: $spacing-lg;

        .lyrics span {
            display: inline-block;
            opacity: 0;
        }

        .lyrics span:nth-child(n) {
            animation-delay: calc(0.1s * var(--i));
        }

        .lyrics-smirk span {
            transform: scale(0.5);
            animation-name: fade-scale;
            animation-duration: .5s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }

        .lyrics-happy span {
            transform: translateY(20px);
            animation-name: bounce-in;
            animation-duration: .6s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }

        .lyrics-sad span {
            transform: translateY(-20px);
            animation-name: drift;
            animation-duration: 1s;
            animation-timing-function: ease-in-out;
            animation-fill-mode: forwards;
        }

        .lyrics-weird span {
            transform: scale(0) skew(0deg, 0deg);
            animation-name: stretch;
            animation-duration: .6s;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            animation-fill-mode: forwards;
        }

        .lyrics-calm span {
            transform: scale(0.9);
            animation-name: float-in;
            animation-duration: 2s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }
    }

    @keyframes float-in {
        0% {
            opacity: 0;
            transform: scale(0.9);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes drift {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes stretch {
        0% {
            opacity: 0;
            transform: scale(0) skew(0deg, 0deg);
        }

        50% {
            opacity: 1;
            transform: scale(1.2) skew(var(--random-skew-x), var(--random-skew-y));
        }

        100% {
            opacity: 1;
            transform: scale(1) skew(0deg, 0deg);
        }
    }

    @keyframes bounce-in {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }

        60% {
            transform: translateY(-10px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fade-scale {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>