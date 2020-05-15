exports.up = function (knex) {
  return knex.schema.createTable("recipes", function (t) {
    t.increments();
    t.string("name").notNullable();
    t.text("description").nullable();
    t.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("recipes");
};
