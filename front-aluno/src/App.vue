<template>
  <v-app>
     <div class="main-container container">
          <transition name="moveInUp">
            <router-view></router-view>
          </transition>
        <EBottomBar/>
      </div>
  </v-app>
</template>

<script>
import EBottomBar from '@/components/EBottomBar';

export default {
  name: 'App',

  components: {
    EBottomBar
  }, 

  data: () => ({
    currentRouteName() {
        return `${this.$route.name}`.toUpperCase();
    }
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