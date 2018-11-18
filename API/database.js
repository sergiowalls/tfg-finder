const sqlite3 = require('sqlite3').verbose();
Database = {};

function getDatabase() {
    // open the database with Foreign Key Support
    let db = new sqlite3.Database('./tfg_finder.db');
    db.get('PRAGMA foreign_keys = ON;');
    return db;
}

/*function createInitialTables() {
	let db = getDatabase();

	db.run(`
		CREATE TABLE IF NOT EXISTS authors 
		(username TEXT PRIMARY KEY)
	`);

	db.run(`
		CREATE TABLE IF NOT EXISTS posts 
		(id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, text TEXT, created DATE,
		FOREIGN KEY (author) REFERENCES authors(username))
	`);

	db.close();
}
*/
function returnAllRows(sql, callback) {
    db = getDatabase();

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });

    // close the database connection
    db.close();
}

Database.getAllProposals = function (tag, callback) {
    let sql = `SELECT * FROM proposals`;
    returnAllRows(sql, (rows) => {
        var proposals = rows.map((row) => {
            return {
                id: row.id,
                title: row.title,
                description: row.description,
                goals: row.goals.split('|'),
                keywords: row.keywords.split('|'),
                state: row.state,
                proposer: row.proposer,
                subscriber: row.subscriber,
                created_at: row.created_at
            }
        });
        if (tag) {
            proposals = proposals.filter((p) => {
                return p.keywords.indexOf(tag) > -1
            });
        }
        callback(proposals)
    });
};

Database.getAllUsers = function (callback) {
    let sql = `SELECT * FROM users`;
    returnAllRows(sql, callback);
};

Database.getProposal = function (proposal_id, callback, callbackErr) {
    let db = getDatabase();
    db.get(`SELECT  * FROM proposals WHERE id=${proposal_id};`,
        function (err, rows) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                if (rows) {
                    let proposal = rows;
                    proposal.goals = proposal.goals.split('|');
                    proposal.keywords = proposal.keywords.split('|');
                    callback(rows);

                } else callback({});
            }
        });
    db.close();
};
Database.getUserKeywords = function(user_email, callback, callbackErr) {
    let db = getDatabase();
    db.get(`SELECT keywords FROM users WHERE email="${user_email}";`,
        function(err, rows) {
            if (err) {
                console.log(err.message);
                callbackErr();
            }
            else{
                if (rows) callback(rows.keywords.split('|'));
                else callback({});
            }
        });
    db.close();
};

Database.getProposalHistoric = function (proposal_id, callback, callbackErr) {
    let db = getDatabase();
    db.get(`SELECT  * FROM historical_proposals WHERE id_proposal=${proposal_id};`,
        function (err, rows) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                if (rows) callback(rows);
                else callback({});
            }
        });
    db.close();
};

Database.createProposal = function (proposal, callback, callbackErr) {
    let db = getDatabase();

    let fields = [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
        proposal.state, proposal.proposer, proposal.subscriber, Date.now().toString()];
    // let values = fields.map((field) => '(?)').join(',');

    let proposal_id = null

    let sql = `INSERT INTO proposals(title, description, goals, keywords, state, proposer, subscriber, created_at) VALUES ('` + fields.join("','") + "');";
    console.log(sql);
    db.run(sql, [],
        function (err, result) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                proposal_id = result;
                // callback();
            }
        });
    fields = [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
        proposal.state, proposal.proposer, proposal.subscriber, proposal_id, Date.now().toString()];
    sql = `INSERT INTO historical_proposals(title, description, goals, keywords, state, proposer, subscriber, id_proposal, created_at) VALUES ('` + fields.join("','") + "');";
    db.run(sql, [],
        function (err) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                callback();
            }
        });

    db.close();
};

Database.createHistoricProposal = function (proposal, id_proposal, callback, callbackErr) {
    let db = getDatabase();
    db.run(`INSERT INTO historical_proposals(proposal) VALUES(?)`,
        [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
            proposal.state, proposal.proposer, proposal.subscriber, id_proposal, proposal.created_at,],
        function (err) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                callback();
            }
        });

    db.close();
};

Database.modifyProposal = function (proposal, callback, callbackErr) {
    let db = getDatabase();

    db.run(`UPDATE proposals SET title=${proposal.title}, description= , goals=${proposal.goals.join('|')}, keywords=${proposal.keywords.join('|')}, state=${proposal.state}, proposer=${proposal.proposer}, subscriber=${proposal.subscriber}, created_at=${Date.now()} WHERE id=${proposal.id} `,
        [],
        function (err, result) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                this.createHistoricProposal(result, proposal.id);
                callback();
            }
        });

    db.close();
};


//createInitialTables();

module.exports = Database;