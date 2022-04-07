<template>
  <v-container>
    <div class="logo__wrapper">
      <img src="../assets/pokemon-logo.png" alt="">
    </div>

    <div class="pokemons">
      <router-link :to="`pokedex/${pokemon.id}`" v-for="(pokemon, index) in pokemons" :key="index" class="pokemon__wrapper">
        <!--        <router-link :to="`pokemon/${pokemon.id}`">-->
        <img
            :src="pokemon.sprite"
            width=""
            height=""
            @click="getPokemonDetails(pokemon)"
        />
        <div class="pokemon__name">
          {{ pokemon.name.toUpperCase() }}
        </div>
      </router-link>
    </div>
  </v-container>
</template>
@
<script>
import PokemonService from '../services/pokemonService';


export default {
  name: 'Home',
  data() {
    return {
      pokemons:       [],
      pokemonService: new PokemonService()
    }
  },
  computed: {},
  mounted() {
    this.pokemonService.getPokemons().then( result => {
      this.pokemons = result;
    } )
  },
  methods: {
    getPokemonDetails( pokemon ) {
      this.pokemonService.getPokemon( pokemon.id ).then( result => {
        this.pokemonType = result
      } )
    }
  }
}
</script>

<style lang="scss" scoped>

.logo__wrapper {
  margin-bottom: 50px;
}

.pokemons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 40px;
  row-gap: 40px;
  max-width: 950px;
  margin: 0 auto 80px auto;
}

.pokemon__wrapper {
  position: relative;
  z-index: 1;
  transition: all 300ms $transitionEase;
  letter-spacing: 0;
  text-align: center;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //flex: 0 0 24%;
  width: 200px;
  height: 200px;
  text-decoration: none;
  //background: blue;
  //background-image: linear-gradient(45deg, rgb(248, 248, 248), rgb(232, 232, 232), rgb(248, 248, 248), rgb(232, 232, 232));
  border-radius: 20px;
  border: 1px solid rgba(25, 118, 210, 0.4);
  box-shadow: rgba(25, 118, 210, 0.4) 5px 5px, rgba(25, 118, 210, 0.3) 10px 10px, rgba(25, 118, 210, 0.2) 15px 15px, rgba(25, 118, 210, 0.1) 20px 20px, rgba(25, 118, 210, 0.05) 25px 25px;


  //&:after {
  //  background-color: $main-bg;
  //  content: "";
  //  width: 100%;
  //  height: 100%;
  //  display: block;
  //  margin: auto;
  //  position: absolute;
  //  top: 0;
  //  right: 0;
  //  bottom: 0;
  //  left: 0;
  //  z-index: -1;
  //  transform-origin: center bottom;
  //  transform: scaleY(0);
  //  transition: all 300ms $transitionEase;
  //}
  //
  //&:hover {
  //  .pokemon__name {
  //    color: $white;
  //  }
  //
  //  &:after {
  //    transform: scaleY(1);
  //  }
  //}
}

.pokemon__name {
  color: $black;
}

@media (max-width: $mobileMin) {
  .pokemons {
    column-gap: 10px;
    row-gap: 10px;
    width: 95%;
    justify-content: flex-start;
    margin: 0 auto 50px auto;
  }

  .pokemon__wrapper {
    width: 110px;
    height: 110px;
    //box-shadow: none;
    box-shadow: rgba(25, 118, 210, 0.4) 1px 1px, rgba(25, 118, 210, 0.3) 2px 2px, rgba(25, 118, 210, 0.2) 3px 3px, rgba(25, 118, 210, 0.1) 4px 4px, rgba(25, 118, 210, 0.05) 5px 5px;

    img {
      max-width: 70px;
      max-height: 70px;
    }
  }

  .pokemon__name {
    font-size: 8px;
  }
}
</style>
