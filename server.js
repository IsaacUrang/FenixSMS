const PORT = process.env.PORT || 8905;
const path = require('path');
const express = require('express');
const forceSsl = require('force-ssl-heroku');
const app = express();
const io = require('socket.io-client');

app.use(forceSsl);
app.use(express.static(__dirname + '/dist/fenix-school'));
app.use(express.json());

app.post('/payment/success', (request, response) => {
  console.table(request.body);

  const socket = io.io('http://fenix-chat-server.herokuapp.com/');
  socket.emit('newPayment', request.body.message)

  response.end();
});

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/dist/fenix-school/index.html'));
});

app.listen(PORT, () => console.log(PORT));
