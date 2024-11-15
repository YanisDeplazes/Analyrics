<template>
  <div class="cards">
    <img src="/images/personas/emma.png" class="card" />
    <img src="/images/personas/ellen.png" class="card" />
    <img src="/images/personas/gordon.png" class="card" />
  </div>
</template>

<style lang="scss">
.cards {
  width: 100%;
  display: flex;

  .card {
    width: calc(100% / 3);
    border-radius: var(--border-md);
    border: #fff689 5px solid;
    position: relative;
    scale: 1.2;
    object-fit: cover;
    aspect-ratio: 9/16;

    &:nth-child(1) {
      animation: reveal-negative 2s forwards;
    }
    &:nth-child(2) {
      scale: 1.3;
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
