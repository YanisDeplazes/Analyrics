<template>
    <div class="song-analysis-container">
        <!-- TODO: add player on top -->
        <Button @click="changeLine" variant="secondary" icon="right" text="Next" fill="fill">
            <template v-slot:icon>
                <Icon type="secondary" size="large" variant="arrow-forward"></Icon>
            </template>
        </Button>
        <p class="font-branding line">{{ currentLine }}</p>
        <PersonaConversation v-if="store.persona" :persona="store.persona" :chat="currentChat"></PersonaConversation>
    </div>
</template>
<script setup lang="ts">
import type LineAnalysis from '~/model/line-analysis';
import type Persona from '~/model/persona';
import personaData from 'assets/data/personas.json';
const store = reactive<{
    lineIndex: number,
    persona: Persona | null
}>({
    lineIndex: 0,
    persona: null
});
const { lines = [
    {
        line: "Iced Matcha Latte, zu spät beim Pilates",
        description: "Oh, I've been there! Who hasn't rushed to Pilates with a refreshing beverage in hand? It's all about balance, people! Just like balancing that latte on your way to the reformer!  Get it?"
    },
    {
        line: "Küsschen links, Küsschen rechts, ich trag' heute was Scharfes",
        description: "This reminds me of my days on the red carpet! Air kisses galore! And who doesn't love a good outfit? \"Scharf\" -  spicy!  Like my sense of humor!"
    },
    {
        line: "Ich steige in den Rangie mit Carmen, Tina und Angie",
        description: "Carpooling! How environmentally conscious! We should all be taking a page from this singer's book. Maybe we can get  Carmen, Tina, and Angie on the show?  Wouldn't that be a hoot?"
    },
    {
        line: "Zum Frühstück ein'n Champagnie bei Bottegie Venetie",
        description: "Breakfast of champions, am I right?  Although, I prefer a mimosa myself.  It's a bit more... bubbly!",
    },
    {
        line: "Wir sind pretty im Bikini, das ist Bauch, Beine, Po",
        description: "This is what it's all about, folks! Confidence!  Loving yourself!  And a little bit of  \"Bauch, Beine, Po!\""
    }
], song = {
    coverUrl: "",
    artist: "Shirin David",
    title: "Bauch Beine Po"
},
    personaName = "Ellen"
} = defineProps<{
    lines: Array<LineAnalysis>,
    song: { coverUrl: string, artist: string, title: string },
    personaName: string
}>();

const currentLine = computed(() => {
    if (lines && lines.length > 0) {
        return `«${lines[store.lineIndex].line}»`;
    }
    return "No lines available";
});

const currentChat = computed(() => {
    if (lines && lines.length > 0) {
        return lines[store.lineIndex].description;
    }
    return "No chat available";
})

const changeLine = () => {
    if (store.lineIndex < lines.length) {
        store.lineIndex = store.lineIndex += 1;
    }
    else {
        navigateTo("analysis-end");
    }
}

onMounted(() => {
    if (personaName) {
        const personasFiltered = personaData.personas.filter(p => p.name == personaName)
        if (personasFiltered.length == 1)
            store.persona = personasFiltered[0];
    }
})
</script>
<style lang="scss" scoped>
.song-analysis-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    gap: 1rem;
}

.line {
    color: var(--bg-secondary);
    font-size: 2.027rem;
}
</style>