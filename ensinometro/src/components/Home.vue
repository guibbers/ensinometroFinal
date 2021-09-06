<template>
  <div>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <v-container
        class="main-container animate__bounceOutRight"
        v-if="screen == 'register'"
      >
        <v-row class="text-center">
          <v-card elevation="5">
            <v-col class="mb-4">
              <h1 class="display-2 font-weight-bold mb-3">Ensinômetro</h1>
              <v-card-title>Digite seu nome para entrar na sala</v-card-title>
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

    <v-container class="main-container animate__bounce" v-if="screen == 'home'">
      <v-row class="text-center">
        <v-card elevation="5" class="main-card">
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Ensinômetro</h1>
            <v-card-title>Olá {{ user.username }} </v-card-title>
            <p v-if="questions.length == 0" class="notStarted">Ainda não foi iniciada nenhuma aula. Espere seu professor.</p>
            <!-- <v-btn
                color="primary"
                :disabled="!user"
                v-on:click="getQuestion()"
              >
                Confirmar</v-btn
              > -->
            <div v-for="question in questions" :key="question.title">
              <v-card link="" elevation="1" class="question" @click="clickQuestion(question)"><div class="circle"></div> {{ question.title }}</v-card>
            </div>
          </v-col>
          <v-btn class="logout primary" @click="logout()"> Sair </v-btn>
        </v-card>
        
      </v-row>
    </v-container>

    <v-container class="main-container animate__bounce" v-if="screen == 'question' ">
      <v-row class="text-center">
        <v-card elevation="5" class="main-card">
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Ensinômetro</h1>
            <v-card-title> {{ title }}</v-card-title>
            <p> {{ description }}</p>
            <ul v-for="alternative in alternatives" :key="alternative.key" class="alternatives">
              <li><v-card link="" class="alternative">{{ alternative.value }}</v-card></li>
            </ul>
            <v-btn color="primary" @click="goBack('home')">Voltar</v-btn>
          </v-col>
        </v-card>
      </v-row>
    </v-container>

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
  name: "Home",

  data: () => ({
    user: { 
      username: null,
      timestamp: null
     },
    screen: "register",
    message: null,
    showSnackbar: false,
    questions: [],
    test:null
  }),

  mounted() {
    if(localStorage.user) {
      this.user = JSON.parse( localStorage.user );
      this.screen = 'home';
    }
 
 
    },

  sockets: {
    sendQuestionToStudent(questions){
    this.questions = questions
    },
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
      this.$socket.on('set question', question);
      this.$socket.emit("get question", question);
      console.log({question})
    },

    clickQuestion(question) {
      console.log({question})
      this.screen = "question";
      this.title = question.title;
      this.description = question.description;
      this.alternatives = question.alternatives;
    },

    goBack(page) {
      this.screen = page;
    },

    logout() {
      this.$socket.emit("logout", this.user );
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
  line-height: 2;
  margin: 10px;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  width: 300px;
  transition: 300ms;
}

.question:hover {
  background-color: rgba(219, 215, 215, 0.596)
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
  line-height: 2;
  width: 100%;
}

.alternative {
  margin: 10px;
}

</style>