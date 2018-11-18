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
                    proposal.keywords.splice( proposal.keywords.indexOf(''), 1 );
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
                if (rows) rows.keywords === "" ? callback([]) : callback(rows.keywords.split('|'));
                else callback([]);
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
    proposal.state = 'proposed';
    let fields = [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
        proposal.state, proposal.proposer, proposal.subscriber, Date.now().toString()];
    // let values = fields.map((field) => '(?)').join(',');

    let proposal_id = null;

    let sql = `INSERT INTO proposals(title, description, goals, keywords, state, proposer, subscriber, created_at) VALUES ('` + fields.join("','") + "');";
    console.log(sql);
    db.run(sql, [],
        function (err) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                proposal_id = this.lastID;

                fields = [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
                    proposal.state, proposal.proposer, proposal.subscriber, proposal_id, Date.now().toString(), proposal.proposer];
                sql = `INSERT INTO historical_proposals(title, description, goals, keywords, state, proposer, subscriber, id_proposal, created_at, user) VALUES ('` + fields.join("','") + "');";
                db.run(sql, [],
                    function (err) {
                        if (err) {
                            console.log(err.message);
                            callbackErr();
                        } else {
                            callback();
                        }
                    });
            }
        });


    db.close();
};

Database.createHistoricProposal = function (proposal_id, proposal,user, callback, callbackErr) {
    let db = getDatabase();
    let fields = [proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
        proposal.state, proposal.proposer, proposal.subscriber, proposal_id, Date.now().toString(),user];
    let sql = `INSERT INTO historical_proposals(title, description, goals, keywords, state, proposer, subscriber, id_proposal, created_at, user) VALUES ('` + fields.join("','") + "');";
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

Database.modifyProposal = function (proposal_id, proposal, user, callback, callbackErr) {
    let db = getDatabase();
    db.run(`UPDATE proposals SET title='${proposal.title}', description='${proposal.description}' , goals='${proposal.goals.join('|')}', keywords='${proposal.keywords.join('|')}', state='modified', proposer='${proposal.proposer}', subscriber='${proposal.subscriber}', created_at='${Date.now()}' WHERE id=${proposal_id} `,
        [],
        function (err) {
            if (err) {
                console.log(err.message);
                callbackErr();
            } else {
                Database.createHistoricProposal(proposal_id, proposal, user, callback, callbackErr);
                callback();
            }
        });

    db.close();
};

Database.updateUserKeywords = function (userEmail, keywords, callback) {
    let db = getDatabase();
    db.run(`UPDATE users SET keywords='${keywords.join('|')}' WHERE email='${userEmail}'`,
        [],
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


//createInitialTables();

module.exports = Database;