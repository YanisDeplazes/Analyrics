<script setup lang="ts"></script>

<template>
  <div>
    <Section>
      <div class="cards">
        <img src="../public/card.png" class="card" />
        <img src="../public/card.png" class="card" />
        <img src="../public/card.png" class="card" />
      </div>
      <h1 class="font-branding">THE UNDERTONE COLLECTIVE</h1>
      <p>
        The Undertone Collective is where music’s hidden stories come to life.
        Our team of fictional critics, delves into the meaning behind the lyrics
        you love. From insightful analysis to playful commentary, The Undertone
        Collective offers a fresh perspective on every song.
      </p>
      <Button text="Explore now"></Button>
    </Section>
    <Section>
      <h2>Meet the critics</h2>
    </Section>
    <Section>
      <h2>Disclaimer</h2>
      <p>
        This app uses a Large Language Model by Google called Gemini to analyze
        song lyrics. The lyrics we use are provided by Genius.com, where most
        lyrics are user-submitted, so accuracy is not 100% guaranteed. Please
        note that the analysis provided is for informational purposes only. We
        do not take responsibility for the accuracy or completeness of the
        lyrics or analysis, and it may not fully reflect the true meaning or
        intention of the lyrics. For any important interpretations, always refer
        to the original source or consult the lyricist.
      </p>
    </Section>
  </div>
</template>

<style lang="scss">
h1,
h2,
p {
  color: #cec3e6;
}
p {
  line-height: 25.6px;
}

section {
  padding-top: 16px;
  padding-bottom: 16px;
  max-width: 345px;
  margin: auto;
}
.cards {
  width: 100%;
  display: flex;

  .card {
    width: 100%;
    border-radius: 10px;
    border: #fff689 5px solid;
    position: relative;
    &:nth-child(1) {
      animation: reveal-negative 2s forwards;
    }
    &:nth-child(2) {
      scale: 1.05;
      z-index: 1;
    }
    &:nth-child(3) {
      animation: reveal-positive 2s forwards;
    }
  }
  @keyframes reveal-negative {
    from {
      transform: translate(100px, 15px);
      rotate: 0deg;
    }
    to {
      transform: translate(0px, 15px);
      rotate: -10deg;
    }
  }
  @keyframes reveal-positive {
    from {
      transform: translate(-100px, 15px);

      rotate: 0deg;
    }
    to {
      transform: translate(0px, 15px);

      rotate: 10deg;
    }
  }
}
</style>
