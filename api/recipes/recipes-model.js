// Imports
const db = require('../data/db-config');

// Data Access Models
async function get() {
	return db('recipes');
};

async function getById(recipe_id) {
	return db('recipes').where({ recipe_id }).first();
};

async function add(recipe) {
	const [id] = await db('recipes').insert(recipe);
	return getById(id);
};

// Exports
module.exports = {
	get,
	getById,
	add
};