import { Router } from 'express';
// import knex from '../../db/knex'; 

const knex = require('../../db/knex');
const router = Router();

// Route to get all appointments
router.get('/appointments', async (req, res) => {
  try {
      const appointments = await knex('appointments').select('*');
      res.json(appointments);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching appointments', details: error });
  }
});

// Route to get a single appointment by id
router.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const appointment = await knex('appointments').where('id', id).first();
      if (appointment) {
          res.json(appointment);
      } else {
          res.status(404).json({ message: `Appointment with id ${id} not found` });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error fetching appointment', details: error });
  }
});

// Route to create a new appointment
router.post('/appointments', async (req, res) => {
  try {
      const [id] = await knex('appointments').insert(req.body).returning('id');
      const newAppointment = await knex('appointments').where('id', id).first();
      res.status(201).json(newAppointment);
  } catch (error) {
      res.status(500).json({ error: 'Error creating appointment', details: error });
  }
});

// Route to update an existing appointment
router.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await knex('appointments').where('id', id).update(req.body);
      const updatedAppointment = await knex('appointments').where('id', id).first();
      res.json(updatedAppointment);
  } catch (error) {
      res.status(500).json({ error: `Error updating appointment with id ${id}`, details: error });
  }
});

// Route to delete an appointment
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await knex('appointments').where('id', id).del();
      res.status(204).send(); // No content to send back
  } catch (error) {
      res.status(500).json({ error: `Error deleting appointment with id ${id}`, details: error });
  }
});

export default router;
