<template>
  <div class="pokemon__search">
    <div class="search-container">
      <input id="name-input" class="search--input" type="text" placeholder="Name / id" v-model="search" v-on:keyup.enter="onEnter"/>
      <router-link :to="`${search.toLowerCase()}`">
        <div id="search-btn" class="ball-container">
          <div class="upper-half-ball"></div>
          <div class="bottom-half-ball"></div>
          <div class="center-ball"></div>
          <div class="center-line"></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonSearch",
  data() {
    return {
      search: ""
    }
  },
  props:   {
    pokemon: {}
  },
  methods: {
    getPokemonDetails( pokemon ) {
      this.pokemonService.getPokemon( pokemon.id ).then();
    },
    onEnter() {
      this.$router.push( `${this.search.toLowerCase()}` )
    }
  }
}
</script>

<style scoped lang="scss">
.pokemon__search {
  margin-top: 40px;
}

.search--input {
  border: 2px solid $black;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  margin-right: 10px;
  transition: background-color 0.3s $easeOutQuad, color 0.3s $easeOutQuad, border-top-color 0.3s $easeOutQuad, border-bottom-color 0.3s $easeOutQuad, border-left-color 0.3s $easeOutQuad, border-right-color 0.3s $easeOutQuad;

  &.search--input--error {
    background: $main-bg;
    color: $white;
    border-color: $main-bg;

    &::placeholder {
      color: $white;
    }
  }
}

/* poke-ball */
.ball-container {
  overflow: hidden;
  width: 60px;
  height: 60px;
  border: 2px solid black;
  border-radius: 50%;
  position: relative;
  animation: shake 1.5s ease-in infinite;
  animation-play-state: paused;
}

.ball-container:hover {
  cursor: pointer;
  animation-play-state: running;
}

.upper-half-ball {
  position: absolute;
  width: 100%;
  height: 24px;
  background-color: $main-bg;
}

.bottom-half-ball {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 24px;
  background-color: $secondary-bg;
}

.center-ball {
  background-color: white;
  width: 18px;
  height: 18px;
  border: 2px solid black;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center-line {
  background: black;
  height: 100%;
  width: 100%;
}

@media (max-width: $mobileMin) {
  .pokemon__search {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .search--input {
    width: 100%;
    font-size: 12px;
  }
}

@keyframes shake {
  0% {
    transform: rotate(5deg);
  }
  5% {
    transform: rotate(-5deg);
  }
  10% {
    transform: rotate(5deg);
  }
  15% {
    transform: rotate(-5deg);
  }
  20% {
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>