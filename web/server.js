const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/html/index.html'))
});

app.use(express.static('public'))

app.listen(3001, () => {
  console.log('Listening to port 3001');
});