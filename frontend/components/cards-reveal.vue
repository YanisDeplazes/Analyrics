<template>
  <div class="cards">
    <img src="../public/card.png" class="card" />
    <img src="../public/card.png" class="card" />
    <img src="../public/card.png" class="card" />
  </div>
</template>

<style lang="scss">
.cards {
  width: 100%;
  display: flex;

  .card {
    width: calc(100% / 3);
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
