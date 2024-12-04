<template>
    <div class="persona-conversation-container">
        <div class="chat-bubble">
            <p class="chat">{{ animatedChat }}</p>
            <slot name="navigation"></slot>
        </div>
        <img :src="personaImageUrl" alt="Persona image" />
    </div>
</template>
<script setup lang="ts">
import type Critic from '~/model/critic';
const animatedChat = ref('')
let timeoutId: NodeJS.Timeout | null;

const props = defineProps<{
    critic: Critic,
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


const personaImageUrl = computed(() => `/stuwe1/frontend/${props.critic.imageUrl}`)
</script>
<style lang="scss" scoped>
.persona-conversation-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;

    .chat-bubble {
        background-color: $bg-secondary;
        color: $on-secondary;
        padding: $spacing-lg;
        border-radius: $border-lg;
        display: flex;
        flex-direction: column;
        gap: $spacing-lg;
        align-items: flex-end;
        .chat{
            width: 100%;
        }
    }

    img {
        max-height: calc(8rem + 10vw);
        max-width: calc(8rem + 10vw);
        align-self: flex-end;
    }
}
</style>