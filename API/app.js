var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

// var indexRouter = require('./routes/index');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.get('/', function (req, res) {
    res.json({'caraperro': 100});
});

app.listen(3000, function () {
    console.log('Listening to port 3000')
});