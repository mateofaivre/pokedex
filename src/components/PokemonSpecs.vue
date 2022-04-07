<template>
  <div class="pokemon__specs">
    <div class="pokemon__pv">
      PV<span>{{ pokemon.pv }}</span>
    </div>
    <div class="pokemon__specs--bottom">
      <div class="pokemon__attacks">
        <div class="pokemon__attacks--title">
          Attacks
        </div>
        <ul class="pokemon__attack">
          <li v-for="(ability, i) in pokemon.abilities" :key="ability">{{ pokemon.abilities[ i ] }}</li>
        </ul>
      </div>
      <div class="pokemon__sizes">
        <div class="pokemon__weight">
          <span>Weight</span>
          <span>{{ pokemon.weight }}kg</span>
        </div>
        <div class="pokemon__height">
          <span>Height</span>
          <span>{{ pokemon.height }}m</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:  "PokemonSpecs",
  props: {
    pokemon: {}
  }
}
</script>

<style scoped lang="scss">
.pokemon__specs {
  width: 100%;
  height: 100%;
  padding: 5px 15px;
  font-size: 10px;
}

.pokemon__attacks {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.pokemon__specs--bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pokemon__attacks {
  line-height: 15px;
}

.pokemon__attacks--title {
  width: fit-content;
}

.pokemon__attack {
  width: fit-content;
}

.pokemon__pv {
  width: fit-content;
  margin: 0 auto 0px auto;
  font-size: 8px;

  span {
    font-size: 20px;
  }
}

.pokemon__sizes {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 6px;
}

.pokemon__weight, .pokemon__height {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 15px;
}
</style>