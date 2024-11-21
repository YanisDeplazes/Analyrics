<template>
  <Section class="persona-selection-section">
    <p>
      Nice selection Yanis! Which critic should analyse “Bauch Beine Po” by
      Shirin David?
    </p>
    <SwiperWrapper :slides-per-view="1.1" :space-between="10">
      <swiper-slide v-for="persona in personaData.personas">
        <Critic
          :name="persona.name"
          :category="persona.category"
          :description="persona.description"
          :image-url="persona.imageUrl"
        >
          <template v-slot:call-to-action>
            <Button
              fill="fill"
              variant="primary"
              :text="`Analyse with ${persona.name}`"
              icon="right"
            >
              <template v-slot:icon>
                <Icon
                  size="large"
                  type="primary"
                  variant="arrow-forward"
                ></Icon>
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
import personaData from "assets/data/personas.json";
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
}

.persona-selection-section {
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
