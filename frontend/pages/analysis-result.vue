<template>
  <HomeButton />
  <div class="song-analysis-container">
    <div class="line-container">
      <p class="font-branding line">
        {{ isTranslationShown ? currentLineTranslation : currentLine }}
      </p>
      <Button
        v-if="currentLineTranslation && currentLineTranslation !== ''"
        variant="secondary"
        size="small"
        fill="outline"
        icon="left"
        :text="isTranslationShown ? 'Hide translation' : 'View translation'"
        @click="toggleTranslation"
      >
        <template v-slot:icon>
          <Icon variant="translate" size="small" type="bg-secondary" />
        </template>
      </Button>
    </div>
    <CriticConversation
      v-if="store.selectedCritic"
      :critic="store.selectedCritic"
      :chat="currentChat"
    >
      <template v-slot:navigation>
        <div class="result-navigation">
          <Button
            v-if="store.lineIndex > 0"
            @click="changeLine(-1)"
            variant="primary"
            icon="left"
            text="Back"
            fill="outline"
            size="small"
          >
            <template v-slot:icon>
              <Icon
                type="secondary"
                size="small"
                variant="arrow-backward"
              ></Icon>
            </template>
          </Button>
          <Button
            @click="changeLine(1)"
            variant="primary"
            icon="right"
            text="Next"
            fill="fill"
            size="small"
          >
            <template v-slot:icon>
              <Icon type="primary" size="small" variant="arrow-forward"></Icon>
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

const toggleTranslation = () => {
  isTranslationShown.value = !isTranslationShown.value;
};

const currentLine = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return `«${store.currentAnalysis[store.lineIndex].line}»`;
  }
  return "";
});

const currentLineTranslation = computed(() => {
  if (
    store.currentAnalysis &&
    store.currentAnalysis.length > 0 &&
    store.currentAnalysis[store.lineIndex].lineTranslation &&
    store.currentAnalysis[store.lineIndex].lineTranslation !== ""
  ) {
    return `«${store.currentAnalysis[store.lineIndex].lineTranslation}»`;
  }
  return "";
});

const currentChat = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return store.currentAnalysis[store.lineIndex].description;
  }
  return "No chat available";
});

const changeLine = (direction: 1 | -1) => {
  console.log(store.lineIndex, store.currentAnalysis);
  if (!store.currentAnalysis) return;
  const nextIndex = store.lineIndex + direction;
  if (nextIndex >= 0 && nextIndex < store.currentAnalysis.length) {
    store.setLineIndex(nextIndex);
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

  .line-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;

    .line {
      color: $bg-secondary;
      font-size: calc(2.027rem + 2vw);
    }
  }
}

.result-navigation {
  display: flex;
  flex-direction: row;
  gap: $spacing-lg;
}
</style>
