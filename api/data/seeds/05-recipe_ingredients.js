exports.seed = function(knex) {
  return knex('recipe_ingredients').insert([
    { recipe_id: 1, ingredient_id: 2, quantity: '1 pack' },
    { recipe_id: 1, ingredient_id: 1, quantity: '1 pound' },
    { recipe_id: 1, ingredient_id: 3, quantity: '6 cups' },
    { recipe_id: 2, ingredient_id: 5, quantity: '4 oz' },
    { recipe_id: 2, ingredient_id: 4, quantity: '1 pound' },
    { recipe_id: 2, ingredient_id: 6, quantity: '2 tbsp' },
    { recipe_id: 3, ingredient_id: 8, quantity: '4 cups' },
    { recipe_id: 3, ingredient_id: 9, quantity: '1 can' },
    { recipe_id: 3, ingredient_id: 7, quantity: '4 links' }
  ]);
};
