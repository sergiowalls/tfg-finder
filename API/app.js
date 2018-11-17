var express = require("express"),
    app = express();

var router = express.Router();
let Database = require('./database');

router.get('/', function(req, res) {
    res.send("Hello World!");

    Database.createAuthor('Filipinu')
});

app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});