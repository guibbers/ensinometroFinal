<template>

  <v-app>

    <div class="main-container">
      <EHeader :title="Home"/>
      <EHome/>
      <EBottomBar/>
    </div>

  </v-app>

</template>

<script>

import EHome from './components/EHome';
import EBottomBar from './components/EBottomBar.vue'
import EHeader from './components/EHeader.vue'

export default {
  name: 'App',

  components: {
    EHome,
    EBottomBar,
    EHeader
    
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
  .v-btn {
  margin-top: 50px;
}

.main-card {
  background-color: #f3f5f9 !important;
}

.mb-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 30px;
}

.text-center {
  display: flex;
  margin-top: 10%;
  align-items: center;
  justify-content: center;
}

.logout {
  margin-bottom: 20px;
}

.notStarted {
  width: 50%;
}

.question-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}

.question {
  display: flex;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  width: 100%;
}

.question .circle {
  background-color: #5e4fff;
  border-radius: 50% !important;
  margin-right: 30px;
  height: 20px;
  width: 20px;
}

.alternatives {
  list-style: none;
  width: 100%;
}

.alternative {
  margin: 10px;
}

.results {
  list-style: none;
  font-weight: bold;
  line-height: 2;
}

</style>
