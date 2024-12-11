<template>
  <HomeButton />
  <div class="song-analysis-container">
    <div class="line-container">
      <p class="font-branding line font-sad" :class="lineAnimation">
        <span v-for="(lyric, index) in currentLine" :style="`--i:${index};`">
          {{ `${lyric}&nbsp;` }}
        </span>
      </p>
      <Button v-if="translationAvailable()" variant="secondary" size="small" fill="outline" icon="left"
        :text="isTranslationShown ? 'Hide translation' : 'View translation'" @click="toggleTranslation">
        <template v-slot:icon>
          <Icon icon="translate" size="small" variant="bg-secondary" />
        </template>
      </Button>
    </div>
    <CriticConversation v-if="store.selectedCritic" :critic="store.selectedCritic" :chat="currentChat"
      :mood="store.currentAnalysis[store.lineIndex].descriptionMood">
      <template v-slot:navigation>
        <div class="result-navigation">
          <Button v-if="store.lineIndex > 0" @click="changeLine(-1)" variant="primary" icon="left" text="Back"
            fill="outline" size="small">
            <template v-slot:icon>
              <Icon variant="secondary" size="small" icon="arrow-backward"></Icon>
            </template>
          </Button>
          <Button @click="changeLine(1)" variant="primary" icon="right" text="Next" fill="fill" size="small">
            <template v-slot:icon>
              <Icon variant="primary" size="small" icon="arrow-forward"></Icon>
            </template>
          </Button>
        </div>
      </template>
    </CriticConversation>
  </div>
</template>
<script setup lang="ts">
import { store } from "~/stores/store";
const isTranslationShown = ref(false);
const lineAnimation = ref("line-animated");

const toggleTranslation = () => {
  lineAnimation.value = "";
  setTimeout(() => {
    isTranslationShown.value = !isTranslationShown.value;
    lineAnimation.value = "line-animated";
  }, 50);
};

const translationAvailable = () => {
  if (store.currentAnalysis &&
    store.currentAnalysis.length > 0 &&
    store.currentAnalysis[store.lineIndex].lineTranslation &&
    store.currentAnalysis[store.lineIndex].lineTranslation !== "")
    return true;
  return false;
};

const currentLine = computed(() => {
  let line = "";
  if (store.currentAnalysis && store.currentAnalysis.length > 0 && (!isTranslationShown.value || !translationAvailable())) {
    line = `«${store.currentAnalysis[store.lineIndex].line}»`;
  }
  else if (store.currentAnalysis && store.currentAnalysis.length > 0 && translationAvailable()) {
    line = `«${store.currentAnalysis[store.lineIndex].lineTranslation}»`;
  }
  return line.split(" ");
});

const currentChat = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return store.currentAnalysis[store.lineIndex].description;
  }
  return "No chat available";
});

const changeLine = (direction: 1 | -1) => {
  if (!store.currentAnalysis) return;
  const nextIndex = store.lineIndex + direction;
  if (nextIndex >= 0 && nextIndex < store.currentAnalysis.length) {
    lineAnimation.value = "";
    setTimeout(() => {
      store.setLineIndex(nextIndex);
      lineAnimation.value = "line-animated";
    }, 50);
  } else {
    navigateTo("analysis-end");
  }
};

onMounted(() => {
  redirectIfNoSelectionMade();
});
</script>
<style lang="scss">
.song-analysis-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 1rem;

  & .line-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    & .line {
      color: $bg-secondary;
      font-size: calc(2.027rem + 2vw);
    }

    .line span {
      display: inline-block;
      opacity: 0;
    }

    .line span:nth-child(n) {
      animation-delay: calc(0.1s * var(--i));
    }

    .line-animated span {
      transform: scale(0) skew(0deg, 0deg);
      animation-name: stretch;
      animation-duration: .6s;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
    }
  }

  & .result-navigation {
    display: flex;
    flex-direction: row;
    gap: $spacing-lg;
  }
}

@keyframes stretch {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
