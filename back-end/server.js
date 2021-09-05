const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

let numUsers = 0;
let alunosOnline = [];

io.on('connection', (socket) => {
  let addedUser = false;

  // when the client emits 'add user', this listens and executes
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

    // envia perguntas para o front-end
  socket.on('get question', () => {
    socket.emit('sendQuestion', {
      title: 'título da pergunta',
      description: 'descrição da pergunta', 
      id: 1,
      alternatives: [1, 2, 3, 4],
      rightAnswer: 2
     });
  });

  // when the user disconnects.. perform this
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