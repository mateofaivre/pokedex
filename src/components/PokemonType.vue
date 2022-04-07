<template>
  <div class="pokemon__types">
    <span v-for="(type, i) in pokemon.types" :key="type"> {{ pokemon.types[i] }} </span>
  </div>
</template>

<script>

export default {
  name: "PokemonType",
  props: {
    pokemon: {}
  },
}
</script>

<style scoped lang="scss">
@media (max-width: $mobileMin) {
  .pokemon__types {
    font-size: 12px;
  }
}
</style>