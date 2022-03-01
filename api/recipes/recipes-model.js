// Imports
const db = require('../data/db-config');

// Data Access Models
async function get() {
	const getRecipes = await db('recipes');

	const recipes = [];

	for (let r of getRecipes) {
		const recipe = await getById(r.recipe_id);
		recipes.push(recipe);
	}

	return recipes;
};

async function getById(recipe_id) {
	
	const getRecipe = await db('recipes as r')
		.join('categories as c', 'c.cat_id', 'r.cat_id')
		.where('r.recipe_id', recipe_id)
		.select('r.recipe_id', 'recipe_title', 'recipe_source', 'cat_name');
	
	const recipe = {
		recipe_id: getRecipe[0].recipe_id,
		title: getRecipe[0].recipe_title,
		source: getRecipe[0].recipe_source,
		category: getRecipe[0].cat_name,
		ingredients: [],
		instructions: []
	};

	const getIngredients = await db('recipes as r')
		.join('recipe_ingredients as ri', 'ri.recipe_id', 'r.recipe_id')
		.join('ingredients as i', 'i.ingredient_id', 'ri.ingredient_id')
		.where('r.recipe_id', recipe_id)
		.select('i.ingredient_id', 'ingredient_name', 'quantity');
	
	if (getIngredients[0]) {
		let ingredients = [];
		for (let i of getIngredients) {
			ingredients.push({
				ingredient: i.ingredient_name,
				quantity: i.quantity
			});
		}
		recipe.ingredients = ingredients;
	}

	const getSteps = await db('recipes as r')
		.join('steps as s', 's.recipe_id', 'r.recipe_id')
		.where('r.recipe_id', recipe_id)
		.select('step_id', 'step_number', 'step_instructions');

	if (getSteps[0]) {
		let instructions = [];
		for (let s of getSteps) {
			instructions.push({
				step: s.step_number,
				instructions: s.step_instructions
			});
		}
		recipe.instructions = instructions;
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