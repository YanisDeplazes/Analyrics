<template>
    <div class="lyrics-container">
        <p>Sad - Demi Lovato - Sober</p>
        <h1 class="font-sad lyrics lyrics-sad drift">
            <span :style="`--i:${index};`" v-for="(lyric, index) in sadLyrics">{{
                `${lyric}&nbsp;` }}</span>
        </h1>
        <p>Weird - Money Boy - Monte Carlo</p>
        <h1 class="font-weird lyrics lyrics-weird stretchy-morph">
            <span
                :style="`--i:${index};--random-skew-x:${randomForRange(-15, 15)}deg;--random-skew-y:${randomForRange(-15, 15)}deg`"
                v-for="(lyric, index) in weirdLyrics">{{
                    `${lyric}&nbsp;` }}</span>
        </h1>
        <p>Happy - Jul - Mon Bijou</p>
        <h1 class="font-happy lyrics lyrics-happy bounce-in">
            <span :style="`--i:${index};`" v-for="(lyric, index) in happyLyrics">{{
                `${lyric}&nbsp;` }}</span>
        </h1>
        <p>Smirk - Lorenzo - Bizarre</p>
        <h1 class="font-smirk lyrics lyrics-smirk fade-scale">
            <span :style="`--i:${index};`" v-for="(lyric, index) in smirkLyrics">{{
                `${lyric}&nbsp;` }}</span>
        </h1>
        <p>Calm - Akua Naru - Poetry: How Does It Feel Now???</p>
        <h1 class="font-calm lyrics lyrics-calm float-in">
            <span :style="`--i:${index};`" v-for="(lyric, index) in calmLyrics">{{
                `${lyric}&nbsp;` }}</span>
        </h1>
    </div>
</template>
<script setup lang="ts">
const sadLyrics = ref("I don't know, I don't know, I don't know, I don't know why I do it every, every, everytime".split(" "));
const happyLyrics = ref("Quand tu m'serres dans tes bras J'te veux présente dans les hauts et les bas".split(" "));
const weirdLyrics = ref("Meine Chain sieht aus, als wären Glühbirnen drauf (Ice) Zitroneneiscreme in meinen Ohren und im Mouth (Burr)".split(" "));
const smirkLyrics = ref("C'pas demain qu'on fera d'la lèche Gros popotin, yeux de biche".split(" "));
const calmLyrics = ref("My, I wanna drink the sweat of your intellect Reflect, and watch your light passion mark my neck".split(" "))
</script>
<style lang="scss" scoped>
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

    .lyrics-smirk.fade-scale span {
        transform: scale(0.5);
        animation-name: fade-scale;
        animation-duration: .5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
    }

    .lyrics-happy.bounce-in span {
        transform: translateY(20px);
        animation-name: bounce-in;
        animation-duration: .6s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
    }

    .lyrics-sad.drift span {
        transform: translateY(-20px);
        animation-name: drift;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    }

    .lyrics-weird.stretchy-morph span {
        transform: scale(0) skew(0deg, 0deg);
        animation-name: stretch;
        animation-duration: .6s;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        animation-fill-mode: forwards;
    }

    .lyrics-calm.float-in span {
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
</style>