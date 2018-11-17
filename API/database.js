const sqlite3 = require('sqlite3').verbose();
Database = {};

function getDatabase() {
	// open the database with Foreign Key Support
	let db = new sqlite3.Database('./sqlite3.db');
	db.get('PRAGMA foreign_keys = ON;');
	return db;
}

function createInitialTables() {
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

Database.getAllPosts = function(callback) {
	let sql = `SELECT * FROM posts`;
	returnAllRows(sql, callback);
}

Database.getAllAuthors = function(callback) {
	let sql = `SELECT * FROM authors`;
 	returnAllRows(sql, callback);
}

Database.createAuthor = function(username) {

	db = getDatabase();

	db.run(`INSERT INTO authors(username) VALUES(?)`, [username], function(err) {
	    if (err) {
	      return console.log(err.message);
	    }
  	});

  	db.close();
};

createInitialTables();

module.exports = Database;