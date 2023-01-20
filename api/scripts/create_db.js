const SQLite = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const usage = `
USAGE
	node create_db.js /path/to/filename.db /path/to/migration.sql
`

const dbPath = process.argv[2]
const migrationPath = process.argv[3]

if (!dbPath) {
	console.log("Error: db file not specified")
	console.log(usage)
	process.exit(1)
}

if (!migrationPath) {
	console.log("Error: migration file not specified")
	console.log(usage)
	process.exit(1)
}

if (!fs.existsSync(migrationPath)) {
	console.log("Error: migration file doesn't exist:", migrationPath)
	process.exit(1)
}

if (fs.existsSync(dbPath)) {
	console.log("Skip creating the database: file already exists:", dbPath)
	process.exit(0) // it's okay though
}

const db = new SQLite(dbPath)

db.transaction(() => {
	db.exec(fs.readFileSync(migrationPath, 'utf8'))
})()

db.close()

console.log("Database created:", dbPath)