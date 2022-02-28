exports.seed = function(knex) {
  return knex('categories').insert([
    { cat_name: 'Breakfast' },
    { cat_name: 'Lunch' },
    { cat_name: 'Dinner' }
  ]);
};
