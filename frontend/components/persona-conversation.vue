<template>
    <div class="persona-conversation-container">
        <p>{{ chat }}</p>
        <img :src="persona.imageUrl" alt="Persona image" />
    </div>
</template>
<script setup lang="ts">
import type Persona from '~/interfaces/persona';

const props = defineProps<{
    persona: Persona,
    chat: string
}>();

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
        max-height: 4rem;
    }
}
</style>