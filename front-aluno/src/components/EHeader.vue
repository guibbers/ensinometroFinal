<template>
  <div>
    <v-card elevation="2">
      <v-card-title>{{ title }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "EHeader",
  props: ['title'],
};
</script>

<style>
</style>