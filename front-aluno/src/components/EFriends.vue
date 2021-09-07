<template>
  <div>
      <v-list dense>
        <v-subheader>Amigos</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(student, i) in students" :key="i">
            <v-list-item-icon>
              <v-icon >mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="student.username"></v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    students: [],
  }),

  mounted() { 
    this.$socket.emit("get students");
  },
  sockets: {
    setStudents(students) {
      this.students = students
    }
  }
};
</script>

<style>
</style>