exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable();
      users.string('password', 200).notNullable();
      users.timestamps(false, true);
    })
    .createTable('categories', tbl => {
      tbl.increments('cat_id');
      tbl.string('cat_name', 128).notNullable().unique();
    })
    .createTable('recipes', tbl => {
      tbl.increments('recipe_id');
      tbl.string('recipe_title', 128).notNullable().unique();
      tbl.string('recipe_source', 128).notNullable();
      tbl.integer('cat_id')
        .unsigned()
        .notNullable()
        .references('cat_id')
        .inTable('categories');
    })
    .createTable('steps', tbl => {
      tbl.increments('step_id');
      tbl.integer('step_number').notNullable();
      tbl.string('step_instructions', 128).notNullable();
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes');
    })
    .createTable('ingredients', tbl => {
      tbl.increments('ingredient_id');
      tbl.string('ingredient_name', 128).notNullable();
    })
    .createTable('recipe_ingredients', tbl => {
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes');
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients');
      tbl.string('quantity', 128).notNullable();
      tbl.primary(['recipe_id', 'ingredient_id']);
    });
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
    .dropTableIfExists('users');
}
