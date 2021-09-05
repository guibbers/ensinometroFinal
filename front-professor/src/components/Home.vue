<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <v-container
        class="main-container animate__bounce"
        v-if="screen == 'register'"
      >
        <v-row class="text-center">
          <v-card elevation="5">
            <v-col class="mb-4">
              <h1 class="display-2 font-weight-bold mb-3">Ensinômetro</h1>
              <v-card-title>Olá, professor! Digite seu nome para entrar na sala.</v-card-title>
              <v-text-field
                v-model="user.username"
                :counter="30"
                label="Nome"
                required
              ></v-text-field>
              <v-btn
                color="primary"
                :disabled="!user.username"
                v-on:click="register(user)"
              >
                Confirmar</v-btn
              >
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </transition>

  <v-snackbar
        :timeout="-1"
        :value="showSnackbar"
        absolute
        bottom
        color="primary"
        outlined
        right
      >
      {{message}}
  </v-snackbar>
    
  </div>
</template>

<script>
export default {
  name: "EHome",

  data: () => ({
    user: { 
      username: null,
      timestamp: null
     },
    screen: "register",
    message: null,
    showSnackbar: false,
    questions: []
  }),

  mounted() {
    if(localStorage.user) {
      this.user = JSON.parse( localStorage.user );
      this.screen = 'home';
    }

  },

  sockets: {
    connect() {
      this.showAlert("Server connected")
    },

    disconnect() {
      this.showAlert("Server Disconnected")
    },

    registered(user) {
      this.showAlert(`Aluno registrado: ${user.username}`);
      this.user = user;
      this.screen = "home";

      localStorage.user = JSON.stringify({
        username: user.username,
        timestamp: user.timestamp
      });
    },

    alreadyRegistered(user) {
      this.showAlert(`Aluno ${user} já registrado. Digite um nome válido`)
    },

    sendQuestion(question) {
      this.questions.push(question);
    },
    
  },

  methods: {
    showAlert(message) {
      this.message = message
      this.showSnackbar = true;
      setTimeout(() => this.showSnackbar = false, 3000);
    },

    register(user) {
      this.$socket.emit("add user", user);
    },

    getQuestion(question) {
      this.$socket.emit("get question", question);
    },

    clickQuestion(question) {
      this.screen = "question";
      this.title = question.title;
      this.description = question.description;
      this.alternatives = question.alternatives;
    },

    goBack(page) {
      this.screen = page;
    },

    logout() {
      this.$socket.emit("logout", this.user )
      delete localStorage.user;
      this.user = { username: null, timestamp: null }
      this.screen = 'register';
    }

  }
};

</script>

<style scoped>

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

</style>