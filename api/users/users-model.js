// Imports
const db = require('../data/db-config');

// Data Access Models
function get() {
	return db('users');
};

function getBy(filter) {
	return db('users').where(filter).first();
};

async function add(user) {
	const [newUser] = await db('users').insert(user, ['user_id', 'username', 'password']);
	return newUser;
}

// Exports
module.exports = {
	get,
	getBy,
	add
};