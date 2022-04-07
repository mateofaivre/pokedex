<template>
  <div>

    <!--    <div class="logo__wrapper">-->
    <!--      <img src="../assets/pokemon-logo.png" alt="">-->
    <!--    </div>-->

    <PokemonSearch v-bind:pokemon="pokemon"/>

    <div id="pokedex">
      <!-- Left Panel -->
      <div id="left-panel">
        <!-- Top lights -->
        <div class="left-top-container">
          <LineTop class="line__svg line__svg--left"/>
          <div class="lights-container">
            <div class="big-light-boarder">
              <div class="big-light big-light--blue">
                <div class="big-dot light-blue"></div>
              </div>
            </div>
            <div class="small-lights-container">
              <div class="small-light small-light--red">
                <div class="dot light-red"></div>
              </div>
              <div class="small-light small-light--yellow">
                <div class="dot light-yellow"></div>
              </div>
              <div class="small-light small-light--green">
                <div class="dot light-greens"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Center Screen -->
        <div class="screen-container">
          <div class="screen">
            <div class="top-screen-lights">
              <div class="mini-light mini-light--red"></div>
              <div class="mini-light mini-light--red"></div>
            </div>
            <div id="main-screen">
              <PokemonImg v-bind:pokemon="pokemon"/>
            </div>
            <div class="bottom-screen-lights">
              <div class="small-light small-light--red">
                <div class="dot light-red"></div>
              </div>
              <PokemonAudio v-bind:pokemon="pokemon"/>
              <div class="burger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- Bottom Buttons -->
        <div class="buttons-container">
          <div class="big-button"></div>
          <div class="buttons__middle">
            <div class="long-buttons-container">
              <div class="long-button long-button--red"></div>
              <div class="long-button long-button--light-blue"></div>
            </div>
            <div class="green-screen">
              <span id="name-screen">
                <PokemonName v-bind:pokemon="pokemon"/>
              </span>
            </div>
          </div>
          <div class="nav-buttons-container">
            <div class="right-nav-container">
              <div class="nav-buttons">
                <div class="nav-center-circle"></div>
                <div class="nav-button nav-button-vertical">
                  <span class="nav-button-vertical--top"></span>
                  <span class="nav-button-vertical--bottom"></span>
                </div>
                <div class="nav-button nav-button-horizontal">
                  <span class="nav-button-horizontal--left" @click="changePokemon('-')"></span>
                  <span class="nav-button-horizontal--right" @click="changePokemon('+')"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Left panel -->

      <!-- Right-panel -->
      <div class="right-panel__wrapper">
        <LineTop class="line__svg line__svg--right"/>
        <div id="right-panel">
          <!-- Blank container -->
          <!-- Top screen -->
          <div class="top-screen-container">
            <div id="about-screen" class="right-panel-screen">
              <PokemonSpecs v-bind:pokemon="pokemon"/>
            </div>
          </div>
          <!-- Blue Buttons -->
          <div class="square-buttons-container">
            <div class="blue-squares-container">
              <div class="blue-square" v-for="blueSquare in 10" :key="blueSquare"></div>
            </div>
          </div>
          <!-- Center Buttons -->
          <div class="center-buttons-container">
            <div class="center-left-container">
              <div class="white-squares-container">
                <div class="white-square" v-for="whiteSquare in 1" :key="whiteSquare"></div>
                <div class="white-square"></div>
              </div>
            </div>
            <div class="center-right-container">
              <div class="thin-buttons-container">
                <div class="thin-button"></div>
                <div class="thin-button"></div>
              </div>
              <div class="yellow-button button--yellow">
                <div class="big-dot light-yellow"></div>
              </div>
            </div>
          </div>
          <!-- Bottom screens -->
          <div class="bottom-screens-container">
            <div id="type-screen" class="right-panel-screen">
              <PokemonType v-bind:pokemon="pokemon"/>
            </div>
            <div id="id-screen" class="right-panel-screen">
              <PokemonId v-bind:pokemon="pokemon"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pokedex__mobile">
      <div class="lights-container">
        <div class="big-light-boarder">
          <div class="big-light big-light--blue">
            <div class="big-dot light-blue"></div>
          </div>
        </div>
        <div class="small-lights-container">
          <div class="small-light small-light--red">
            <div class="dot light-red"></div>
          </div>
          <div class="small-light small-light--yellow">
            <div class="dot light-yellow"></div>
          </div>
          <div class="small-light small-light--green">
            <div class="dot light-greens"></div>
          </div>
        </div>
      </div>
      <LineTop class="line__svg line__svg--left"/>
      <div class="pokedex__img__wrapper">
        <PokemonImg v-bind:pokemon="pokemon"/>
      </div>
      <div class="pokedex__audio__wrapper">
        <PokemonAudio v-bind:pokemon="pokemon"/>
      </div>
      <div class="pokedex__name__wrapper">
        <PokemonName v-bind:pokemon="pokemon"/>
      </div>
      <div class="pokedex__specs__wrapper">
        <PokemonSpecs v-bind:pokemon="pokemon"/>
      </div>
      <div class="pokedex__type-id__wrapper">
        <div class="pokedex__type__wrapper">
          <PokemonType v-bind:pokemon="pokemon"/>
        </div>
        <div class="nav-buttons-container">
          <div class="right-nav-container">
            <div class="nav-buttons">
              <div class="nav-center-circle"></div>
              <div class="nav-button nav-button-vertical">
                <span class="nav-button-vertical--top"></span>
                <span class="nav-button-vertical--bottom"></span>
              </div>
              <div class="nav-button nav-button-horizontal">
                <span class="nav-button-horizontal--left" @click="changePokemon('-')"></span>
                <span class="nav-button-horizontal--right" @click="changePokemon('+')"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="pokedex__id__wrapper">
          <PokemonId v-bind:pokemon="pokemon"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PokemonImg from '../components/PokemonImg.vue'
import PokemonName from "../components/PokemonName.vue";
import PokemonSpecs from "../components/PokemonSpecs";
import PokemonAudio from "../components/PokemonAudio";
import PokemonType from "../components/PokemonType";
import PokemonId from "../components/PokemonId";
import PokemonSearch from "../components/PokemonSearch";
import PokemonService from "../../src/services/pokemonService";
import LineTop from "../assets/line-top.svg";


export default {
  name:       "Pokedex",
  components: {
    PokemonSearch,
    PokemonId,
    PokemonType,
    PokemonAudio,
    PokemonSpecs,
    PokemonName,
    PokemonImg,
    LineTop
  },
  data() {
    return {
      pokemon:        {},
      pokemonService: new PokemonService()
    }
  },
  mounted() {
    this.pokemonService.getPokemon( this.$route.params.id ).then( p => {
      this.pokemon = p;
    } )
    // this.listeningName = false;
    // window.addEventListener( 'mousemove', this.listenName )
  },
  watch:   {
    "$route.params.id": function () {
      this.pokemonService.getPokemon( this.$route.params.id ).then( p => {
            this.pokemon = p;
          }
      )
    }
  },
  methods: {
    changePokemon( direction ) {
      this.id = document.querySelector( '.pokemon__id span' ).innerHTML
      this.id = parseInt( this.id )
      if ( direction == "+" ) {
        this.$router.push( ( this.id + 1 ).toString() )
      } else if ( this.id != 1 ) {
        this.$router.push( ( this.id - 1 ).toString() )
      }
    },
    listenName() {
      if ( !this.listeningName ) {
        this.listeningName = true;
        if ( 'speechSynthesis' in window ) {
          // Speech Synthesis supported 🎉
          console.log( 'speechSynthesis supported' )
          let msg  = new SpeechSynthesisUtterance();
          msg.text = "C'est beau";
          speechSynthesis.speak( msg );
        } else {
          // Speech Synthesis Not Supported 😣
          console.log( "Sorry, your browser doesn't support text to speech!" );
        }
      }
    }
  }
}
</script>

<style lang="scss">

@media (min-width: 0px) {

  /* poke-dex */
  #pokedex {
    height: 600px;
    width: 100%;
    max-width: 800px;
    display: flex;
    margin: 50px auto 50px auto;
    //border-radius: 10px;
    //border: solid black 3px;
    position: relative;


    &::before {
      content: "";
      position: absolute;
      top: -3px;
      left: -3px;
      width: calc(100% + 6px);
      height: calc(100% + 6px);
      border: solid $black 3px;
      border-radius: 10px;
    }

    &::after {
      content: "";
      position: absolute;
      height: 100%;
      width: 3px;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      background: $black;
    }
  }

  .logo__wrapper {
    width: fit-content;
    width: -moz-fit-content;
    margin: 30px auto 20px auto;
  }

  .search-container {
    width: 100%;
    height: 80px;
    justify-self: center;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* LEFT PANEL */
  #left-panel {
    background-color: $main-bg;
    box-sizing: border-box;
    height: 100%;
    width: 50%;
    display: grid;
    grid-template-rows: 23% 50% 27%;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  /* Top Lights */

  .lights-container {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .line__svg {
    position: absolute;

    &.line__svg--right {
      transform: scaleX(-1);
      right: 0;
    }
  }

  .big-light-boarder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    margin-top: 6px;
    height: 60px;
    width: 60px;
    border: solid black;
    border-radius: 50%;
    background-color: white;
  }

  .big-light {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: solid black;
  }

  .big-dot {
    height: 15px;
    width: 15px;
    position: relative;
    top: 7px;
    left: 10px;
    border-radius: 50%;
  }

  .small-lights-container {
    margin-left: 15px;
    margin-top: 6px;
    width: fit-content;
    height: 100%;
    display: flex;
    align-self: flex-start;
    column-gap: 4px;
    justify-content: space-around;
  }

  .small-light {
    border: solid black;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .dot {
    height: 6px;
    width: 6px;
    position: relative;
    top: 3px;
    left: 3px;
    border-radius: 50%;
  }

  /* Center Screen */

  .screen-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .screen {
    width: 100%;
    height: 100%;
    max-width: 300px;
    max-height: 300px;
    border: solid black;
    border-radius: 0 0 0 17%;
    display: grid;
    grid-template-rows: 10% 72% 18%;
    background-color: white;
  }

  .top-screen-lights {
    width: 50%;
    margin-top: 2px;
    display: flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
  }

  .mini-light {
    border: solid black 1px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 7px;
  }

  #main-screen {
    height: 100%;
    width: 80%;
    justify-self: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .bottom-screen-lights {
    display: flex;
    margin-top: 5px;
    width: 75%;
    justify-self: center;
    justify-content: space-between;
    align-items: center;
  }

  .bottom-screen-lights .small-light {
    border: solid black 2px;
    width: 22px;
    height: 22px;
  }

  .bottom-screen-lights .dot {
    height: 4px;
    width: 4px;
    top: 3px;
    left: 3px;
  }

  .line {
    width: 18px;
    height: 2px;
    background-color: black;
    margin-top: 2px;
  }

  /*Bottom buttons  */

  .buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 40px;
    column-gap: 10px;
    height: fit-content;
    padding: 0 30px;
  }

  .big-button {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: solid 2px black;
    background-color: $main-btns;
  }

  .buttons__middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    width: 100%;
    max-width: 180px;
  }

  .long-buttons-container {
    display: flex;
    width: fit-content;
    height: fit-content;
    justify-content: space-around;
    column-gap: 20px;
    width: 100%;
  }

  .long-button {
    width: 100%;
    height: 10px;
    border-radius: 50px;
    border: 2px solid black;
  }

  .green-screen {
    width: 100%;
    border-radius: 5px;
    border: solid black 2px;
    background-color: $green-screen;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #name-screen {
    width: 100%;
    //font-family: 'Press Start 2P', cursive;
    text-align: center;
    font-size: 8.5px;
    overflow-wrap: break-word;
  }

  .circle {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    border: 1px solid black;
  }

  .nav-buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .right-nav-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .nav-buttons {
    height: 52px;
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-button {
    position: absolute;
    border-radius: 5px;
    height: 20px;
    width: 60px;
    border: 2px solid black;
    background-color: $main-btns;
  }

  .nav-button-vertical, .nav-button-horizontal {
    //position: relative;
  }

  .nav-button-vertical {
    transform: rotate(90deg);
    z-index: 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      width: 40px;
      height: 100%;
    }
  }

  .nav-button-horizontal {
    z-index: 0;

    //&::before {
    //  content: "";
    //  position: absolute;
    //  top: 0;
    //  left: 50%;
    //  transform: translateX(-50%);
    //  z-index: 1000;
    //  width: 40px;
    //  height: 100%;
    //  background: yellow;
    //  //background: yellow;
    //}
  }

  .nav-button-vertical--top, .nav-button-horizontal--left {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(50% - 10px);
    height: 100%;
  }

  .nav-button-vertical--bottom, .nav-button-horizontal--right {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(50% - 10px);
    height: 100%;
  }

  .nav-center-circle {
    height: 5px;
    width: 5px;
    border-radius: 50%;
    border: solid black 2px;
    z-index: +2;
  }

  .border-top {
    border-top: 3.5px solid $main-btns;
    position: absolute;
    top: -3px;
    left: 20px;
    right: 19.5px;
  }

  .border-bottom {
    border-top: 3.5px solid $main-btns;
    position: absolute;
    top: 12px;
    left: 20px;
    right: 19.5px;
  }

  /* RIGHT PANEL */

  .right-panel__wrapper {
    background-color: $main-bg;
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 50%;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  #right-panel {
    width: 260px;
    margin: 40px auto 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 40px;

  }

  #right-panel::before {
    //content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 265px;
    //border-right: solid black 3px;
    border-bottom-right-radius: 7px;
  }

  /* top screen */
  .top-screen-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .right-panel-screen {
    //font-family: 'Press Start 2P', cursive;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 125px;
    background-color: $infos-green-screen;
    color: $green-screen;
    border: solid black 2px;
    border-radius: 4px;
  }

  /* square buttons grid */
  .square-buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
  }

  .blue-squares-container {
    width: 100%;
    height: 70px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .blue-square {
    border-radius: 2px;
    border: black 1.5px solid;
    background-color: $square-btns;
    box-shadow: inset -2px -2px #3298cb;
  }

  /* center buttons */
  .center-buttons-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .center-left-container {
    display: grid;
  }

  .small-reds-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .small-reds-container .small-light {
    border: solid black 2px;
    width: 7px;
    height: 7px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .small-reds-container .dot {
    height: 2.5px;
    width: 2.5px;
    top: 1px;
    left: 1px;
  }

  .white-squares-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .white-square {
    width: 52px;
    height: 35px;
    border-radius: 5px;
    border: black 2px solid;
    background-color: #ffffff;
    box-shadow: inset -2px -2px gray;
  }

  .center-right-container {
    display: grid;
  }

  .thin-buttons-container {
    display: flex;
    justify-content: space-between;
    margin-top: -20px;
  }

  .thin-button {
    width: 35px;
    height: 6px;
    border: 2px solid black;
    background-color: $main-btns;
    margin-left: 10px;
  }

  .yellow-button {
    justify-self: end;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: solid 2px black;
    margin-left: 7px;
  }

  .yellow-button .big-dot {
    height: 7px;
    width: 7px;
    position: relative;
    top: 3px;
    left: 5px;
    border-radius: 50%;
  }

  /* bottom screens */

  .bottom-screens-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 15px;
    width: 100%;

    .right-panel-screen {
      width: 100%;
      height: 50px;
      padding: 10px;

      &:first-of-type {
        font-size: 11px;
      }

      &:nth-of-type(2) {
        font-size: 10px;
      }
    }
  }


  .mention {
    margin-top: 10px;
    width: 150px;
    display: grid;
    text-align: center;
    font-size: x-large;
  }

  .links {
    display: flex;
    justify-content: space-between;
  }

  .link-logo {
    width: 25px;
    height: 25px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .big-light--red, .small-light--red, .mini-light--red, .long-button--red {
    background-color: #ff0000;
  }

  .big-light--yellow, .small-light--yellow, .mini-light--yellow, .long-button--yellow, .button--yellow {
    background-color: #fecb65;
  }

  .big-light--green, .small-light--green, .mini-light--green, .long-button--green {
    background-color: #32cb65;
  }

  .big-light--blue, .small-light--blue, .mini-light--blue, .long-button---blue {
    background-color: #3298cb;
  }

  .big-light--light-blue, .small-light--light-blue, .mini-light--light-blue, .long-button--light-blue, .light-blue {
    background-color: #85bdfe;
  }

  .big-light--light-red, .small-light--light-red, .mini-light--light-red, .long-button--light-red, .light-red {
    background-color: #fe98cb;
  }

  .big-light--light-yellow, .small-light--light-yellow, .mini-light--light-yellow, .long-button--light-yellow, .light-yellow {
    background-color: #fefecb;
  }

  .big-light--light-green, .small-light--light-green, .mini-light--light-green, .long-button--light-green, .light-greens {
    background-color: #98fe00;
  }

}


@media (max-width: $mobileMin) {
  #pokedex {
    display: none;
    width: 90%;
    height: 400px;
  }

  .search-container {
    height: auto;
  }

  .pokedex__mobile {
    width: 90%;
    margin: 0px auto 60px auto;
    background: $main-bg;
    padding: 120px 15px 50px 15px;
    border: 3px solid $black;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  .lights-container {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .line__svg {
    position: absolute;
    top: 15px;
    left: -30px;
  }

  .pokedex__img__wrapper {
    height: 200px;
    width: 200px;
    margin: 0 auto;
  }

  .pokedex__name__wrapper {
    background: $green-screen;
    border: 2px solid $black;
    border-radius: 5px;
    width: 100%;
    margin: 0px auto 20px auto;
  }

  .pokedex__audio__wrapper {
    width: fit-content;
    width: -moz-fit-content;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pokedex__specs__wrapper, .pokedex__type__wrapper, .pokedex__id__wrapper {
    background: $infos-green-screen;
    color: $green-screen;
    border: 2px solid $black;
    border-radius: 4px;
  }

  .pokedex__type-id__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    column-gap: 20px;
  }

  .pokedex__type__wrapper {
  padding: 10px 20px;
  }

  .pokedex__specs__wrapper {
    width: 100%;
    margin: 0 auto 20px auto;
  }

  .pokedex__id__wrapper {
    padding: 10px 20px;
  }
}

@media (min-width: $mobileMax) {
  .pokedex__mobile {
    display: none;
  }
}
</style>