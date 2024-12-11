<template>
  <div class="end-screen">
    <div class="end-navigation">
      <h1>That's it!</h1>
      <p>
        If you want to see how another critic comments "{{
          store.selectedTrack?.name
        }}" you can:
      </p>
      <NuxtLink to="/critic-selection" @click="store.resetSelectedCritic()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="small"
          text="Choose another critic"
        >
          <template v-slot:icon>
            <Icon size="xl" variant="secondary" icon="user"></Icon>
          </template>
        </Button>
      </NuxtLink>
      <p>
        If you want to continue with {{ store.selectedCritic?.name }} you can:
      </p>
      <NuxtLink to="/track-selection" @click="store.resetSelectedTrack()">
        <Button
          icon="left"
          variant="secondary"
          fill="fill"
          size="small"
          text="Choose another song"
        >
          <template v-slot:icon>
            <Icon size="xl" variant="secondary" icon="lyrics"></Icon>
          </template>
        </Button>
      </NuxtLink>
    </div>
    <div class="end-critic">
      <CriticConversation
        v-if="store.selectedCritic"
        :critic="store.selectedCritic"
        chat="Wow, these lyrics were deeper than my thoughts while trying to survive a weekend without music. Thanks for joining – you rock just like the chorus of this catchy tune! 🎵"
        mood="null"
      >
        <template v-slot:navigation>
          <div class="result-navigation">
            <NuxtLink to="/analysis-result" @click="store.isEndscreen = false">
              <Button
                variant="primary"
                icon="left"
                text="Back"
                fill="outline"
                size="small"
              >
                <template v-slot:icon>
                  <Icon
                    variant="secondary"
                    size="small"
                    icon="arrow-backward"
                  ></Icon>
                </template>
              </Button>
            </NuxtLink>
          </div>
        </template>
      </CriticConversation>
    </div>
  </div>
</template>
<script setup lang="ts">
import { store } from "~/stores/store";
</script>
<style lang="scss" scoped>
.end {
  &-screen {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    gap: rem;
    flex: 1;
  }
  &-navigation {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 2rem;
    margin-top: 10rem;
  }

  &-critic {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 2rem;
  }
}
</style>
