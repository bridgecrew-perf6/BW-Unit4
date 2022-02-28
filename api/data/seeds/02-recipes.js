exports.seed = function(knex) {
  return knex('recipes').insert([
    { recipe_name: 'Chicken Noodle Soup' },
    { recipe_name: 'Roast Beef' },
    { recipe_name: 'Jambalaya' }
  ]);
};
