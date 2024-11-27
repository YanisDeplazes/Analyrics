<template>
    <div class="persona-conversation-container">
        <p>{{ animatedChat }}</p>
        <img :src="personaImageUrl" alt="Persona image" />
    </div>
</template>
<script setup lang="ts">
import type Persona from '~/model/persona';
const animatedChat = ref('')
let timeoutId: NodeJS.Timeout | null;

const props = defineProps<{
    persona: Persona,
    chat: string
}>();

const typeWriterEffect = (text: string) => {
    animatedChat.value = '';
    let index = 0;
    const typingSpeedInMilliseconds = 30;

    function typeNextCharacter() {
        if (index < text.length) {
            animatedChat.value += text[index];
            index++;
            timeoutId = setTimeout(typeNextCharacter, typingSpeedInMilliseconds);
        }
    }

    typeNextCharacter();
}

watch(
    () => props.chat, // Watch the `chat` prop
    (newChat) => {
        if (newChat) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            typeWriterEffect(newChat); // Trigger the typewriter effect on change
        }
    },
    { immediate: true } // Start the effect on the first render
);


const personaImageUrl = computed(() => `/stuwe1/frontend/${props.persona.imageUrl}`)
</script>
<style lang="scss" scoped>
.persona-conversation-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p {
        background-color: var(--bg-secondary);
        color: var(--on-secondary);
        padding: var(--spacing-lg);
        border-radius: var(--border-lg);
    }

    img {
        max-height: 8rem;
        max-width: 8rem;
        align-self: flex-end;
    }
}
</style>