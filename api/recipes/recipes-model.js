// Imports
const db = require('../data/db-config');

// Data Access Models
async function get() {
	return db('recipes');
};

function getById(recipe_id) {
	return db('recipes').where({ recipe_id }).first();
};

async function add(recipe) {
	const [newRecipe] = await db('recipes').insert(recipe, ['recipe_id', 'recipe_title']);
	return newRecipe;
};

async function update(recipe_id, updates) {
	const updatedRecipe = await db('recipes').where({ recipe_id }).update(updates);
	return getById(updatedRecipe);
}

async function remove(recipe_id) {
	const recipe = await getById(recipe_id);
	await db('recipes').where({ recipe_id }).del();
	return recipe;
};

// Exports
module.exports = {
	get,
	getById,
	add,
	update,
	remove
};