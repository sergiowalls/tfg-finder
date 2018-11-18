const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'))
});

app.get('/proposals/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/proposal_detail.html'))
});

app.get('/proposals/create', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/proposal_create.html'))
});

app.use(express.static('public'));

app.listen(3001, () => {
  console.log('Listening to port 3001');
});