<template>
  <NuxtLink to="/" @click="store.reset()" class="home-button">
    <Button icon-only variant="secondary" fill="fill" size="small">
      <template v-slot:icon>
        <Icon size="xl" icon="home" variant="secondary"></Icon> </template
    ></Button>
  </NuxtLink>

  <div class="end-screen">
    <div class="end-navigation">
      <h1>That's it!</h1>
      <p>
        If you want to see how another critic comments "{{
          store.selectedTrack?.name
        }}" you can:
      </p>
      <NuxtLink to="/critic-selection">
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
      <NuxtLink to="/track-selection">
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
        chat="Lalilalu"
      >
        <template v-slot:navigation>
          <div class="result-navigation">
            <NuxtLink to="/analysis-result">
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
console.log("Last Line Index: ", store.lineIndex);
</script>

<style lang="scss" scoped>
.home-button {
  flex: 0;
  align-self: flex-end;
}

.end-screen {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  gap: rem;
  flex: 1;

  .end-navigation {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 2rem;
    margin-top: 10rem;
  }

  .end-critic {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 2rem;
  }
}
</style>
