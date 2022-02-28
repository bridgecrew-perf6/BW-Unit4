exports.seed = function(knex) {
  return knex('steps').insert([
    { step_number: 1, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 1 },
    { step_number: 2, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 1 },
    { step_number: 3, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 1 },
    { step_number: 1, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 2 },
    { step_number: 2, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 2 },
    { step_number: 3, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 2 },
    { step_number: 1, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 3 },
    { step_number: 2, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 3 },
    { step_number: 3, step_instructions: 'Lorem ipsum sit dolor', recipe_id: 3 }
  ]);
};
