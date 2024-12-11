<template>
  <div class="persona-conversation-container">
    <div class="chat-bubble">
      <p class="chat">{{ animatedChat }}</p>
      <slot name="navigation"></slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 283.627767119631244"
        class="chat-bubble-indicator"
      >
        <path
          d="M0,.222222222220807c6.361624320275041,27.317563257651273,92.823563531912441,192.990215873111083,135.924025145925953,274.61904132546988,7.376648960463172,13.970782860971667,28.296583745785938,10.54164140823741,30.805964557676816-5.056458847089743C181.217046882427894,179.7344746712497,222.308946854458554.596517445000245,320,.222222222220807,159.5-.277777777779193,0,.222222222220807,0,.222222222220807Z"
        />
      </svg>
    </div>
    <img :src="personaImageUrl" alt="Persona image" />
  </div>
</template>
<script setup lang="ts">
import type Critic from "~/model/critic";
const animatedChat = ref("");
let timeoutId: NodeJS.Timeout | null;

const props = defineProps<{
  critic: Critic;
  chat: string;
}>();

const typeWriterEffect = (text: string) => {
  animatedChat.value = "";
  let index = 0;
  const typingSpeedInMilliseconds = 15;

  function typeNextCharacter() {
    if (index < text.length) {
      animatedChat.value += text[index];
      index++;
      timeoutId = setTimeout(typeNextCharacter, typingSpeedInMilliseconds);
    }
  }

  typeNextCharacter();
};

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

const personaImageUrl = computed(
  () => `/stuwe1/frontend/${props.critic.imageUrl}`
);
</script>
<style lang="scss" scoped>
.persona-conversation-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  align-items: flex-end;
  width: 100%;

  & .chat-bubble-indicator {
    fill: $bg-secondary;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    bottom: -1.4rem;
    right: 30%;
  }

  & .chat-bubble {
    background-color: $bg-secondary;
    color: $on-secondary;
    padding: $spacing-lg;
    border-radius: $border-lg;
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    align-items: flex-end;
    position: relative;

    & .chat {
      width: 100%;
    }

    @include lg {
      width: 50%;
    }
  }

  & img {
    max-height: calc(8rem + 10vw);
    max-width: calc(8rem + 10vw);
    align-self: flex-end;
  }
}
</style>
