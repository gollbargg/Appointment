/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('buyers').del();
  // Inserts seed entries
  await knex('buyers').insert([
    { id: 1, name: 'Buyer A', company_name: 'Company A' },
    { id: 2, name: 'Buyer B', company_name: 'Company B' },
    { id: 3, name: 'Buyer C', company_name: 'Company C' },
  ]);
};
