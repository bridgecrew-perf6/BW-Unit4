// Imports
const router = require('express').Router();
const Recipes = require('./recipes-model');

// Endpoints
router.get('/', (req, res, next) => {
	Recipes.get()
		.then(recipes => {
			res.json(recipes);
		})
		.catch(next);
});

router.get('/:id', (req, res, next) => {
	Recipes.getById(req.params.id)
		.then(recipe => {
			res.json(recipe);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	Recipes.add(req.body)
		.then(recipe => {
			res.status(201).json(recipe);
		})
		.catch(next);
});

router.put('/:id', (req, res, next) => {
	Recipes.update(req.params.id, req.body)
		.then(recipe => {
			res.json(recipe);
		})
		.catch(next);
});

router.delete('/:id', (req, res, next) => {
	Recipes.remove(req.params.id)
		.then(recipe => {
			res.json(recipe);
		})
		.catch(next);
});

// Exports
module.exports = router;