var express = require("express"),
    app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var router = express.Router();
let Database = require('./database');


router.get('/proposals', function (req, res) {
    const tag = req.query.tag;
    Database.getAllProposals(tag, (proposals) => res.json(proposals));
});

router.get('/users', function (req, res) {
    Database.getAllProposals((users) => res.json(users));
});


router.post('/proposals', function(req, res) {
    Database.createProposal(req.body, ()=>res.status(201).send(), ()=>res.status(409).send())


});

router.get('/proposals/:proposal_id', function (req, res) {
    const proposal_id = req.params['proposal_id'];
    Database.getProposal(proposal_id,(proposal) => res.json(proposal), ()=>res.status(409).send());

});

router.get('/users/:user_email', function (req, res) {
    const user_email = req.params['user_email'];
    Database.getUserKeywords(user_email,(keywords) => res.json(keywords), ()=>res.status(409).send());

});

router.put('/proposals/:proposal_id', function (req, res) {
    const proposal_id = req.params['proposal_id'];
    Database.modifyProposal(proposal_id, req.body, (proposal)=> res.json(proposal), ()=>res.status(409).send());
});

router.get('/proposals_historic/:proposal_id', function (req, res) {
    const proposal_id = req.params['proposal_id'];
    Database.getProposalHistoric(proposal_id,(proposal) => res.json(proposal), ()=>res.status(409).send());

});

app.use(router);

app.listen(3003, function() {
    console.log("Node server running on http://localhost:3000");
});