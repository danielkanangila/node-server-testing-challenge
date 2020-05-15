exports.up = function (knex) {
  return knex.schema.createTable("cooking_steps", function (t) {
    t.increments();
    t.integer("recipeId")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("recipes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    t.integer("step_number").notNullable();
    t.text("instructions");
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cooking_steps");
};
