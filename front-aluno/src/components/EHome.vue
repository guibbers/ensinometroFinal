<template>
  <div class="home-container">
    <v-container class="text-center" v-if="screen == 'register'">
    
      <v-row no-gutters>
        <v-col>
        <div>
          <v-img src="@/assets/ensinometro.png" max-height="150" max-width="250" class="logo" ></v-img>
          <div class="title">Olá, seja bem-vindo ao Ensinômetro.</div>
          <div class="subtitle">Digite seu nome para entrar na sala</div>
          </div>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col cols=6 
        offset-md="3">
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
      </v-row>
    </v-container>

    <v-container class="main-container" v-if="screen == 'home'">

      <v-row no-gutters>
            <v-col cols=6>
              <div>
                <div class="title">Olá {{ user.username }} </div>
                <div class="subtitle not-started" v-if="questions.length == 0">
                  Ainda não foi iniciada nenhuma aula. Espere seu professor.
                </div>
              </div>

            </v-col>
          </v-row>


        <v-col class="mb-4">
          <v-card-title></v-card-title>
          <p v-if="questions.length == 0" class="not-started">
            Ainda não foi iniciada nenhuma aula. Espere seu professor.
          </p>

          <div v-for="question in questions" :key="question.title">
            <v-card
              link=""
              elevation="1"
              class="question"
              @click="clickQuestion(question)"
              ><div class="circle"></div>
              {{ question.title }}</v-card
            >
          </div>
        </v-col>
    </v-container>

    <v-container class="main-container" v-if="screen == 'question'">
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Ensinômetro - Alunos</h1>
          <v-card-title> {{ title }}</v-card-title>
          <p>{{ description }}</p>
          <ul
            v-for="alternative in alternatives"
            :key="alternative.key"
            class="alternatives"
          >
            <li>
              <v-card
                @click="saveStudentAnswer(alternative, title)"
                class="alternative"
                >{{ alternative.value }}</v-card
              >
            </li>
          </ul>
          <p>Escolha uma alternativa e clique em "Enviar"</p>
          <v-btn color="primary" @click="sendAnswersToTeacher()">Enviar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "EHome",

  data: () => ({
    user: {
      username: null,
      timestamp: null,
    },
    screen: "register",
    message: null,
    showSnackbar: false,
    questions: [],
    studentAnswers: {},
  }),

  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      if (JSON.parse(localStorage.questions).length) {
        this.questions = JSON.parse(localStorage.questions)
      }
      
      this.screen = "home";
    }
  },

  sockets: {
    sendQuestionToStudent(questions) {
      this.questions = questions;
      localStorage.questions = JSON.stringify(questions);
    },

    connect() {
      this.showAlert("Server connected");
    },

    disconnect() {
      this.showAlert("Server Disconnected");
    },

    registered(user) {
      this.showAlert(`Aluno registrado: ${user.username}`);
      this.user = user;
      this.screen = "home";

      localStorage.user = JSON.stringify({
        username: user.username,
        timestamp: user.timestamp,
      });
    },

    alreadyRegistered(user) {
      this.showAlert(`Aluno ${user} já registrado. Digite um nome válido`);
    },
  },

  methods: {
    saveStudentAnswer(alternative, title) {
      const answer = alternative.rightAnswer;
      this.studentAnswers[title] = answer;
    },

    sendAnswersToTeacher() {
      this.$socket.emit("submitQuestion", {
        answer: this.studentAnswers,
        student: this.user.username,
      });
      this.studentAnswers = {};
      this.screen = "home";
    },
    showAlert(message) {
      this.message = message;
      this.showSnackbar = true;
      setTimeout(() => (this.showSnackbar = false), 3000);
    },

    register(user) {
      this.$socket.emit("add user", user);
    },

    getQuestion(question) {
      this.$socket.on("set question", question);
      this.$socket.emit("get question", question);
      console.log({ question });
    },

    clickQuestion(question) {
      console.log({ question });
      this.screen = "question";
      this.title = question.title;
      this.description = question.description;
      this.alternatives = question.alternatives;
    },
  },
};
</script>

<style scoped>
  .home-container {
    background-color: #fafafa;
    padding: 2em 0em;
    height: 400px;
  }

  .logo {
    margin: auto;
  }

  .title {
    font-weight: 500;
    font-size: 1.25em;
    color: #666;
  }

  .subtitle {
    font-weight: 400;
    font-size: 1em;
  }
</style>