<template>
  <Section class="critic-selection-section">
    <p>
      Nice selection {{ store.spotifyProfile?.display_name ?? "" }}! Which critic should analyse
      “{{ store.selectedTrack?.name }}” by
      {{ store.selectedTrack && commaSeparatedArtists(store.selectedTrack?.artists) }}?
    </p>
    <SwiperWrapper :slides-per-view="1.1" :space-between="10">
      <swiper-slide v-for="critic in criticsData.critics">
        <Critic :name="critic.name" :category="critic.category" :description="critic.description"
          :image-url="critic.imageUrl">
          <template v-slot:call-to-action>
            <Button fill="fill" variant="primary" :text="`Analyse with ${critic.name}`" icon="right" @click="setCritic(critic)">
              <template v-slot:icon>
                <Icon size="large" type="primary" variant="arrow-forward"></Icon>
              </template>
            </Button>
          </template>
        </Critic>
      </swiper-slide>
    </SwiperWrapper>
  </Section>
</template>
<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from "swiper/vue";
import criticsData from "assets/data/critics.json";
import { store } from "~/stores/store";
import type Critic from "~/model/critic";

const setCritic = (critic: Critic) => {
  store.setCritic(critic);
  navigateTo("analysis-in-progress");
}
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
}

.critic-selection-section {
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
