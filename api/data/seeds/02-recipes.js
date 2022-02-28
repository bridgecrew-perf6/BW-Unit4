exports.seed = function(knex) {
  return knex('recipes').insert([
    { recipe_title: 'Chicken Noodle Soup', recipe_source: 'Grandma', cat_id: 2 },
    { recipe_title: 'Roast Beef', recipe_source: 'Grandma', cat_id: 3 },
    { recipe_title: 'Jambalaya', recipe_source: 'Grandma', cat_id: 3 }
  ]);
};
