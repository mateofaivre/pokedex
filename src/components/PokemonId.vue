<template>
<div class="pokemon__id">
  #<span>{{ pokemon.id }}</span>
</div>
</template>

<script>

export default {
  name: "PokemonId",
  props: {
    pokemon: {}
  },
  mounted() {
  },
}
</script>

<style scoped lang="scss">
  .pokemon__id {
    font-size: 14px;
  }

  @media (max-width: $mobileMin) {
    .pokemon__id {
      text-align: center;
    }
  }
</style>