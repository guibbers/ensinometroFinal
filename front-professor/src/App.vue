<template>
  <v-app>
    <div class="main-container container">
      <EHome />
    </div>
  </v-app>
</template>

<script>
import EHome from "./components/EHome";

export default {
  name: "App",

  components: {
    EHome,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.main-container {
  margin-top: 4em;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 0;
  width: 700px;
}
</style>
