<template>
    <div class="lyrics-container">
        <p>Sad - Demi Lovato - Sober</p>
        <h1 class="font-sad lyrics-sad">
            <span v-for="(lyric, index) in sadLyrics">{{ lyric }}</span>
        </h1>
        <p>Weird - Money Boy - Monte Carlo</p>
        <h1 class="font-weird">Meine Chain sieht aus, als wären Glühbirnen drauf (Ice)<br />Zitroneneiscreme in meinen
            Ohren und im Mouth (Burr)</h1>
        <p>Happy - Jul - Mon Bijou</p>
        <h1 class="font-happy lyrics-happy"> <span v-for="(lyric, index) in happyLyrics">{{ lyric }}</span>
        </h1>
        <p>Smirk - Lorenzo - Bizarre</p>
        <h1 class="font-smirk">C'pas demain qu'on fera d'la lèche<br />Gros popotin, yeux de biche</h1>
        <p>Calm - Akua Naru - Poetry: How Does It Feel Now???</p>
        <h1 class="font-calm">My, I wanna drink the sweat of your intellect<br />
            Reflect, and watch your light passion mark my neck
        </h1>
    </div>
</template>
<script setup lang="ts">
const sadLyrics = ref("I don't know, I don't know, I don't know, I don't know why\nI do it every, every, everytime");
const happyLyrics = ref("Quand tu m'serres dans tes bras\nJ'te veux présente dans les hauts et les bas");
</script>
<style lang="scss" scoped>
.lyrics-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    .lyrics-happy span {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: bounce-in 0.6s ease-out forwards;
    }

    .lyrics-happy span:nth-child(n) {
        animation-delay: calc(0.1s * var(--i));
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
</style>