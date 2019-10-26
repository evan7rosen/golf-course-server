exports.up = function(knex) {
  return knex.schema.createTable("tee_times_customers", function(table) {
    table.increments();
    table
      .integer("customer_id")
      .references("id")
      .inTable("customers")
      .onDelete("CASCADE");
    table
      .integer("tee_time_id")
      .references("id")
      .inTable("tee_times")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex, Promise) {};
