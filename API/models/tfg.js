var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var proposta = new Schema({
    id: {type: Number},
    title: {type: String},
    description: {type: String},
    goals: {type: [String]},
    keywords: {type: [String]},
    status: {type: String},
    proposer: {
        email: {type: String},
        name: {type: String},
        role: {type: String}
    },
    subscriber: {
        email: {type: String},
        name: {type: String},
        role: {type: String}
    }
});

module.exports = mongoose.model('Proposta', proposta);