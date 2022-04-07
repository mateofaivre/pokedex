<template>
  <div class="pokemon__name" id="pokemon__name">
    {{ pokemon.name }}
  </div>
</template>

<script>

export default {
  name:  "PokemonName",
  props: {
    pokemon: {}
  },
  mounted() {

  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.pokemon__name {
  font-size: 14px;
  font-weight: 600;
  padding: 0px 10px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>