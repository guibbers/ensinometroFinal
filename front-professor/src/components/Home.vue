<template>
  <div>
      <v-container
        class="main-container"
        v-if="screen == 'register'"
      >
        <v-row class="text-center">
          <v-card elevation="5">
            <v-col class="mb-4">
              <h1 class="display-2 font-weight-bold mb-3">Ensinômetro - Professores</h1>
              <v-card-title>Digite seu nome para entrar na sala.</v-card-title>
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

    <v-container class="main-container" v-if="screen == 'home'">
      <v-row class="text-center">
        <v-card elevation="5" class="main-card">
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Ensinômetro - Professores</h1>
            <v-card-title>Olá {{ user.username }} </v-card-title>
            <p v-if="questions.length == 0" class="notStarted"> Aula iniciada! Clique no botão abaixo para enviar perguntas para seus alunos.</p>
            <v-btn
                color="primary"
                :disabled="!user"
                v-on:click="setQuestion()"
              >
                Enviar Perguntas</v-btn
              >

            <h1> Respostas dos alunos em tempo real: </h1>
            <ul v-for="answer in answers" :key="answer" >
              <li class="results"> {{answer.student}} | {{ answer.answer }} </li>
            </ul>

          </v-col>
          <v-btn class="logout primary" @click="logout()"> Sair </v-btn>
        </v-card>
        
      </v-row>
    </v-container>

    <v-container class="main-container" v-if="screen == 'question' ">
      <v-row class="text-center">
        <v-card elevation="5" class="main-card">
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Ensinômetro - Professores</h1>
            <v-card-title> Insira o título da pergunta: </v-card-title>
            <v-text-field
                v-model="question.title"
                :counter="100"
                label="Title"
                required
              ></v-text-field>
              <v-text-field
                v-model="question.description"
                :counter="500"
                label="Description"
                required
              ></v-text-field>
            <ul v-for="alternative in question.alternatives" :key="alternative.key" class="alternatives">
              <li><v-card class="alternative"> <v-text-field v-model="alternative.value"></v-text-field> <input type="checkbox" id="checkbox" v-model="alternative.rightAnswer"> </v-card></li>
            </ul>
            <v-btn color="primary" @click="registerQuestion(question)">Confirmar</v-btn>
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
     question: {
       title: null,
       description: null,
       alternatives: [{value: null, rightAnswer: false, key: 1}, {value: null, rightAnswer: false, key: 2}, {value: null, rightAnswer: false, key: 3}, {value: null, rightAnswer: false, key: 4}]
     },
    screen: "register",
    message: null,
    showSnackbar: false,
    questions: [],
    answers: null
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

    studentAnswers(answers) {
      console.log(answers)
      this.answers = answers
    }
    
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

    setQuestion() {
      this.screen = 'question';
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
    },

    registerQuestion(  ) { //question
      this.$socket.emit('set question', [
        { 
        title: 'Números Pares',
        description: 'Quais desses números é par?',
        alternatives: [
          { value: '1', rightAnswer: false, key: 1 },
          { value: '3', rightAnswer: false, key: 2 },
          { value: '8', rightAnswer: true, key: 3 },
          { value: '17', rightAnswer: false, key: 4 }
        ]
       },
        {
        title: 'Números Ímpares',
        description: 'Quais desses números é ímpar?',
        alternatives: [
          { value: '2', rightAnswer: false, key: 1 },
          { value: '4', rightAnswer: false, key: 2 },
          { value: '8', rightAnswer: false, key: 3 },
          { value: '17', rightAnswer: true, key: 4 }
        ]
       },
        { 
        title: 'Números Divisíveis por três',
        description: 'Quais desses números é divisível por 3?',
        alternatives: [
          { value: '2', rightAnswer: false, key: 1 },
          { value: '3', rightAnswer: true, key: 2 },
          { value: '7', rightAnswer: false, key: 3 },
          { value: '5', rightAnswer: false, key: 4 }
        ]
       },

       ],
       
       
       );
      this.screen = 'home';
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