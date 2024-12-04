<template>
  <HomeButton />
  <div class="song-analysis-container">
    <div class="line-container">
      <p class="font-branding line">{{ currentLine }}</p>
    </div>
    <CriticConversation
      v-if="store.selectedCritic"
      :critic="store.selectedCritic"
      :chat="currentChat"
    >
      <template v-slot:navigation>
        <div class="result-navigation">
          <Button
            v-if="lineIndex > 0"
            @click="changeLine(-1)"
            variant="primary"
            icon="left"
            text="Back"
            fill="outline"
            size="sm"
          >
            <template v-slot:icon>
              <Icon
                type="secondary"
                size="large"
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
            size="sm"
          >
            <template v-slot:icon>
              <Icon type="primary" size="large" variant="arrow-forward"></Icon>
            </template>
          </Button>
        </div>
      </template>
    </CriticConversation>
  </div>
</template>
<script setup lang="ts">
import { store } from "~/stores/store";
const lineIndex = ref<number>(0);

const currentLine = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return `«${store.currentAnalysis[lineIndex.value].line}»`;
  }
  return "No lines available";
});

const currentLinetranslate = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return `«${store.currentAnalysis[lineIndex.value].linetranslate}»`;
  }
  return "No lines available";
});

const currentChat = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return store.currentAnalysis[lineIndex.value].description;
  }
  return "No chat available";
});

const changeLine = (direction: 1 | -1) => {
  if (!store.currentAnalysis) return;
  const nextIndex = lineIndex.value + direction;
  if (lineIndex.value < store.currentAnalysis.length) {
    lineIndex.value = lineIndex.value += direction;
  } else {
    navigateTo("analysis-end");
  }
};

onMounted(() => {});
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
    flex: 1;
    align-items: center;
    justify-content: center;

    .line {
      color: var(--bg-secondary);
      font-size: calc(2.027rem + 2vw);
    }
  }
}

.result-navigation {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
}
</style>
