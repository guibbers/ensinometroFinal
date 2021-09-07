<template>
  <div class="config-container">
    <v-container class="main-container">

    <v-container>
      
    </v-container>


    <v-row justify="space-around">
      <div>
        <v-avatar color="indigo">
          <v-icon dark>
            mdi-account-circle
          </v-icon>
        </v-avatar>

        <span class="username">Guilherme</span>
      </div>
    </v-row>

      <v-row class="text-center">
        <v-btn class="logout primary" @click="logout()"> Sair </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "EConfigurations",

  data: () => ({
    user: {}
  }),

  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      this.screen = "home";
    }
  },

  methods: {
    logout() {
      this.$socket.emit("logout", this.user);
      delete localStorage.user;
      this.user = { username: null, timestamp: null };
      this.$router.push({ name: 'home' })
    },
  },
};
</script>

<style scoped>

  .config-container {
      background-color: #fafafa;
      padding: 1em 0em;
      height: 400px;
  }

  .logout {
    margin: 30px auto;
  }

  .username {
    margin-left: 2em;
  }

</style>