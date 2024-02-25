/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('appointments', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('type');
    table.string('location');
    table.integer('host_id').references('id').inTable('vendors');
    table.integer('client_id').references('id').inTable('buyers');
    table.dateTime('startTime');
    table.dateTime('endTime');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('appointments');
};
