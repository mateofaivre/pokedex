<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <router-link class="logo" to="/">
        <img src="./assets/pokedex-logo.png" alt="">
      </router-link>

      <router-link class="menu__item" to="/">
        Pokémons
      </router-link>
      <router-link class="menu__item" to="/pokedex/1">
        Pokédex
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ( {
    //
  } ),
  mounted() {
  }
};
</script>

<style lang="scss">
.v-application {
  font: normal 16px/25px $pokemonGB;
}

.logo {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 35px;
    max-height: 35px;
    width: auto;
    height: auto;
  }
}

.v-toolbar__content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;

  .menu__item {
    color: $white;
    text-decoration: none;
    padding: 20px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: $mobileMin) {
  .logo {
    margin-right: 15px;
  }
  .v-toolbar__content {
    .menu__item {
      margin-top: 5px;
      font-size: 12px;
      padding: 0px 10px;
    }
  }

}


</style>
