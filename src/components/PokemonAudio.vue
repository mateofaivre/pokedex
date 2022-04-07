<template>
<div class="audio__wrapper">
  <audio class="audio" :src=pokemon.sound ></audio>
  <button class="audio__controls" @click="sound"><Sound/></button>
</div>
</template>

<script>
import Sound from '../assets/sound.svg'

export default {
  name: "PokemonAudio",
  components: {
    Sound
  },
  props: {
    pokemon: {}
  },
  methods: {
    sound: function () {
      let audio = document.querySelector('.audio')
      if (audio.paused == true) {
        audio.play()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .audio__wrapper {

    .audio__controls {
      position: relative;
      display: flex;
    }
  }
</style>