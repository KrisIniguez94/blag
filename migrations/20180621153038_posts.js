exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(table) {
    table.increments();
    table
      .string("blog")
      .notNullable()
      .defaultTo("");
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .index()
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts");
};
