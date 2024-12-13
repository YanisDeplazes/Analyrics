<template>
  <div class="critic-conversation-container">
    <div class="chat-bubble">
      <p class="chat">
        <span
          v-for="(char, index) in animatedChat.split('')"
          :style="`--i:${index}`"
          aria-hidden="true"
          :key="`${char}-${index}-${Math.random()}`"
          >{{ char }}</span
        >
      </p>
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
    <img :src="criticImageUrl" alt="Critic image" />
  </div>
</template>
<script setup lang="ts">
import type Critic from "~/model/critic";
const animatedChat = ref("");

const props = defineProps<{
  critic: Critic;
  chat: string;
  mood: string;
}>();

watch(
  () => props.chat, // Watch the `chat` prop
  (newChat) => {
    if (newChat) {
      animatedChat.value = newChat;
    }
  },
  { immediate: true } // Start the effect on the first render
);

const validMoods = ["happy", "smirk", "weird", "calm", "sad"];

const criticImageUrl = computed(() => {
  const mood = props.mood;
  if (!mood || !validMoods.includes(mood)) {
    return `${props.critic.imageUrl}`;
  }
  return `/images/personas/${props.critic.name.toLowerCase()}_${mood}.png`;
});
</script>
<style lang="scss" scoped>
.critic-conversation-container {
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
      transition: max-height 5s linear;
      max-height: 10rem;

      span {
        animation-name: appear;
        animation-duration: 0.02s;
        animation-fill-mode: forwards;
        visibility: hidden;
      }

      span:nth-child(n) {
        animation-delay: calc(0.02s * var(--i));
      }
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

@keyframes appear {
  from {
    visibility: hidden;
  }

  to {
    visibility: visible;
  }
}
</style>
