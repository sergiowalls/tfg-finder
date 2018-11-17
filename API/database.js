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

Database.getAllProposals = function(callback) {
	let sql = `SELECT * FROM proposals`;
	returnAllRows(sql, (rows)=>{
		var proposals = rows.map((row) => {
			return {
				id:row.id,
				title:row.title,
				description:row.description,
				goals:row.goals.split('|'),
				keywords:row.keywords.split('|'),
				state:row.state,
				proposer:row.proposer,
                subscriber:row.subscriber
			}
		});
        callback(proposals)
	});
};

Database.getAllUsers = function(callback) {
	let sql = `SELECT * FROM users`;
 	returnAllRows(sql, callback);
};

Database.getProposal = function(proposal_id, callback, callbackErr) {
    let db = getDatabase();
    db.get(`SELECT  * FROM proposals WHERE id=${proposal_id};`,
        function(err, rows) {
            if (err) {
                console.log(err.message);
                callbackErr();
            }
            else{
            	if (rows) callback(rows);
            	else callback({});
            }
        });
    db.close();
};

Database.getProposalHistoric = function(proposal_id, callback, callbackErr) {
    let db = getDatabase();
    db.get(`SELECT  * FROM historical_proposals WHERE id_proposal=${proposal_id};`,
        function(err, rows) {
            if (err) {
                console.log(err.message);
                callbackErr();
            }
            else{
                if (rows) callback(rows);
                else callback({});
            }
        });
    db.close();
};

Database.createProposal = function(proposal, callback, callbackErr) {
	let db = getDatabase();
	db.run(`INSERT INTO proposals(proposal) VALUES(?)`,
		[proposal.title, proposal.description, proposal.goals.join('|'), proposal.keywords.join('|'),
			proposal.state, proposal.proposer, proposal.subscriber, Date.now(),],
		function(err) {
			if (err) {
			   console.log(err.message);
			   callbackErr();
			}
			else{
				callback();
			}
  	});

  	db.close();
};

//createInitialTables();

module.exports = Database;