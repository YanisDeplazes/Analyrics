<template>
  <div class="song-analysis-container">
    <!-- TODO: add player on top -->
    <Button
      @click="changeLine"
      variant="secondary"
      icon="right"
      text="Next"
      fill="fill"
      size="lg"
    >
      <template v-slot:icon>
        <Icon type="secondary" size="large" variant="arrow-forward"></Icon>
      </template>
    </Button>
    <p class="font-branding line">{{ currentLine }}</p>
    <CriticConversation
      v-if="store.selectedCritic"
      :critic="store.selectedCritic"
      :chat="currentChat"
    >
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

const currentChat = computed(() => {
  if (store.currentAnalysis && store.currentAnalysis.length > 0) {
    return store.currentAnalysis[lineIndex.value].description;
  }
  return "No chat available";
});

const changeLine = () => {
  if (!store.currentAnalysis) return;
  if (lineIndex.value < store.currentAnalysis.length) {
    lineIndex.value = lineIndex.value += 1;
  } else {
    navigateTo("analysis-end");
  }
};

onMounted(() => {});
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
