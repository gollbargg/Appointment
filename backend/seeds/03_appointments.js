/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries in appointments table
  await knex('appointments').del();
  // Inserts seed entries for appointments
  await knex('appointments').insert([
    {
      id: 1,
      title: 'Initial Consultation',
      type: 'Virtual',
      location: null, // For virtual appointments, location can be null
      host_id: 1,
      client_id: 1,
      startTime: '2024-03-01 10:00:00',
      endTime: '2024-03-01 11:00:00',
    },
    {
      id: 2,
      title: 'Follow-up Meeting',
      type: 'Physical',
      location: 'Meeting Room 1',
      host_id: 2, // Referencing another vendor
      client_id: 2, // Referencing another buyer
      startTime: '2024-03-02 14:00:00',
      endTime: '2024-03-02 15:00:00',
    },
    {
      id: 3,
      title: 'Project Meeting',
      type: 'Physical',
      location: 'Meeting Room 1',
      host_id: 2,
      client_id: 2,
      startTime: '2024-03-02 14:00:00',
      endTime: '2024-03-02 15:00:00',
    },
  ]);
};
