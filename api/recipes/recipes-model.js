// Imports
const db = require('../data/db-config');

// Data Access Models
async function get() {
	return db('recipes');
};

async function getById(recipe_id) {
	const getIngredients = await db('recipes as r')
		.join('recipe_ingredients as ri', 'ri.recipe_id', 'r.recipe_id')
		.join('ingredients as i', 'i.ingredient_id', 'ri.ingredient_id')
		.where('r.recipe_id', recipe_id)
		.select('r.recipe_id', 'recipe_title', 'recipe_source', 'i.ingredient_id', 'ingredient_name', 'quantity');
	
		const getSteps = await db('recipes as r')
		.join('steps as s', 's.recipe_id', 'r.recipe_id')
		.where('r.recipe_id', recipe_id)
		.select('step_id', 'step_number', 'step_instructions');

	const recipe = {
		recipe_id: getIngredients[0].recipe_id,
		recipe_title: getIngredients[0].recipe_title,
		recipe_source: getIngredients[0].recipe_source,
		ingredients: [],
		steps: []
	};

	for (let i of getIngredients) {
		recipe.ingredients.push({
			ingredient_id: i.ingredient_id,
			ingredient_name: i.ingredient_name,
			quantity: i.quantity
		});
	}
	
	for (let s of getSteps) {
		recipe.steps.push({
			step_id: s.step_id,
			step_number: s.step_number,
			step_instructions: s.step_instructions
		});
	}

	return recipe;
};

async function add(recipe) {
	const [newRecipe] = await db('recipes').insert(recipe, ['recipe_id', 'recipe_title']);
	return newRecipe;
};

async function update(recipe_id, updates) {
	await db('recipes').where({ recipe_id }).update(updates);
	return getById(recipe_id);
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