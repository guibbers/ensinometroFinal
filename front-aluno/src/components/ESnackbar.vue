<template>
  <v-snackbar
    :timeout="2000"
    :value="show"
    absolute
    bottom
    color="primary"
    right
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
    props: ["show"]
};
</script>

<style>
</style>