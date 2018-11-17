var express = require("express"),
    app = express();

var router = express.Router();
let Database = require('./database');


router.get('/proposals', function (req, res) {
    Database.getAllProposals((proposals) => res.json(proposals));
});

router.post('/proposals', function(req, res) {

    Database.createProposal(req.body, ()=>res.status(201).send(), ()=>res.status(409).send())


});

router.get('/proposals/:proposal_id', function (req, res) {
    Database.getProposal(proposal_id,(proposal) => res.json(proposal));

});

router.put('/proposals/:proposal_id', function (req, res) {
    Database.findProposalById(proposal_id)

    res.send(proposals)
});




app.use(router);

app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});