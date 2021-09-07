const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

let alunosOnline = [];
let answeredQuestions = [];

io.on('connection', (socket) => {
  let addedUser = false;
  
  socket.on('add user', (user) => {
      if (!alunosOnline.includes(user)) {
        alunosOnline.push(user);
        console.log(alunosOnline)
        socket.emit("registered", {
          timestamp: new Date().getTime(),
          username: user.username
        });
      } else {
        socket.emit("alreadyRegistered", "Aluno já registrado, tente um nome válido.");
      }
  }); 

  socket.on("submitQuestion", (answer) => {
    answeredQuestions.push(answer)
    io.emit("studentAnswers", answeredQuestions)
  })

  socket.on('set question', ( question ) => {
    socket.emit('send question', question);
    io.emit('sendQuestionToStudent', question);
  });

  socket.on('disconnect', () => {
    
  });

  socket.on('logout', (user)=> {

    alunosOnline.forEach((student, i) => {

      if (student.username === user.username ) {
        alunosOnline.splice( i , 1 );
      }

    });

  });

});