exports.seed = function(knex) {
  return knex('ingredients').insert([
    { ingredient_name: 'Chicken' },
    { ingredient_name: 'Noodles' },
    { ingredient_name: 'Broth' },
    { ingredient_name: 'Beef' },
    { ingredient_name: 'Onions' },
    { ingredient_name: 'Garlic' },
    { ingredient_name: 'Sausage' },
    { ingredient_name: 'Rice' },
    { ingredient_name: 'Red Beans' }
  ]);
};
