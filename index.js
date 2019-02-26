const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
let users = {};
const PORT = process.env.PORT || 3001;

io.on('connection', socket => {
  //new connection
  socket.emit('new', socket.id);

  //receives user name and sends out player 1 and player 2
  socket.on('user-info', function(data) {
    let code = data.code;
    let name = data.name;
    if (name && code) {
      users[socket.id] = name;
      socket.join(code, function() {
        io.of('/')
          .in(code)
          .clients(function(err, clients) {
            if (err) {
              console.log(err);
            } else if (clients.length < 3) {
              let players = {
                player1: users[clients[0]],
                player2: users[clients[1]]
              };
              console.log('emitting');
              io.in(code).emit('users', players);
            }
          });
      });
    }
  });

  //update current board to both players
  socket.on('state', function(data) {
    console.log(data);
    io.emit('board', data);
  });

  //update current player
  socket.on('players', function(data) {
    io.emit('info', data);
  });

  //receives winner
  socket.on('winner', function(data) {
    io.emit('winning player', data);
  });
});

app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/connect-four/connect/build/index.html`);
});

server.listen(PORT, err => {
  console.log(err || 'server listening on port 3001');
});
