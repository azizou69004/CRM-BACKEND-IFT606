`use strict`;

const squel = require(`squel`);
const promise = require(`bluebird`);
const options = {promiseLib: promise};

const pgp = require(`pg-promise`)(options);
const connectionString =
	`postgres://` +
	process.env.user +
	`:` +
	process.env.password +
	`@` +
	process.env.host +
	`:` +
	process.env.database_port +
	`/` +
	process.env.database;

const db = pgp(connectionString);

db.query(squel.select()
    .field(`NOW()`)
    .toString())
    .then(res => {
        console.log(`time is`, res[0].now);
    })
    .catch(e => {
        console.error(`query error`, e.message, e.stack);
    })
    .catch(err => {
        console.error(`Unable to connect to the database:`, err);
    });

module.exports = db;
