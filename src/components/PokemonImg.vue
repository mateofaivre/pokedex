<template>
  <div class="main__wrapper" v-bind:style="backgroundColor">
    <div class="pokemon__wrapper">
      <v-carousel height="100%" class="carousel" hide-delimiter-background :show-arrows="false">
        <v-carousel-item v-for="(sprite, i) in pokemon.sprites" :key="sprite" class="carousel__item" reverse-transition="fade-transition" transition="fade-transition" origin="center">
          <v-row
              class="fill-height"
              align="center"
              justify="center"
          >
            <img
                class="img"
                :src="pokemon.sprites[i]"
                width=""
                height=""
            />
          </v-row>
        </v-carousel-item>
      </v-carousel>

    </div>
  </div>
</template>

<script>
export default {
  inject: {
    theme: {
      default: { isDark: false }
    }
  },
  name:   "PokemonImg",
  props:  {
    pokemon: {}
  },
  data() {
    return {
      sprites:    [],
      loading:    false,
      stateSound: false
    }
  },
  computed: {
    backgroundColor() {
      // On s'assure que le pokémon soit bien complet avant de calculer sa couleur.
      if ( this.pokemon.types ) {
        // On map les types à la couleur correspondante.
        const colorArray = this.pokemon.types.map( type => {
          switch ( type ) {
            case "normal":
              return "#A6A77D";
            case "fighting":
              return "#B93223";
            case "flying":
              return "#AC96E5";
            case "poison":
              return "#A6458E";
            case "ground":
              return "#DDC684";
            case "rock":
              return "#B49C3E";
            case "bug":
              return "#BAB4B4";
            case "ghost":
              return "#725896";
            case "steel":
              return "#BCBCD2";
            case "fire":
              return "#C38389";
            case "water":
              return "#369FF0";
            case "grass":
              return "#76C657";
            case "electric":
              return "#F4D553";
            case "psychic":
              return "#E9587F";
            case "ice":
              return "#989296";
            case "dragon":
              return "#713DE1";
            case "dark":
              return "#EACED0";
            case "fairy":
              return "#DFA7DF";
            case "unknown":
              return "#fff";
            case "shadow":
              return "#292929";
            default:
              return "a3a9f5";
          }
        } )

        // On 'join' le tableau en séparant les valeurs par des ','
        const colors = colorArray.join( ',' );

        // On retourne le style "calculé".
        if ( colorArray.length < 2 ) {
          return `background: ${colors}`
        } else {
          return `background-image: linear-gradient(45deg, ${colors})`
        }
      } else {
        return '';
      }
    }
  },
  mounted() {
    this.loading = false;

  }
}
</script>

<style lang="scss" scoped>
.main__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  margin: 0 auto;
  border: solid black 2px;
  border-radius: 5%;
}

.carousel {
  width: 100%;
  max-height: 100%;
}

.loader {
  //width: 100%;
}

.pokemon__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  //height: 500px;
  //padding: 40px;
}

.v-carousel .v-window-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.pokemon__name {
  font-size: 30px;
  margin-bottom: 0px;
}

.pokemon__attacks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pokemon__attack {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  span {

  }
}

.img {
  max-width: 65%;
  max-height: 65%;
  width: auto;
  height: auto;
}


</style>