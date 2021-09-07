<template>
  <v-bottom-navigation color="primary">
    <router-link class="nav-link" to="/">
      <v-btn value="recent">
        <span>Aula</span>

        <v-icon>mdi-book</v-icon>
      </v-btn>
    </router-link>

    <router-link class="nav-link" to="/friends">
      <v-btn value="favorites">
        <span>Amigos</span>

        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
    </router-link>

    <router-link class="nav-link" to="/configurations">
      <v-btn value="nearby">
        <span>Configurações</span>

        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "EBottomBar",
};
</script>

<style scoped>
  .v-btn {
    background-color: transparent!important;
    margin-top: 0.75em;
  }
</style>