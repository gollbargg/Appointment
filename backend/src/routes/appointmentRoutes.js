"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import knex from '../../db/knex'; 
const knex = require('../../db/knex');
const router = (0, express_1.Router)();
// Route to get all appointments
router.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield knex('appointments').select('*');
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching appointments', details: error });
    }
}));
// Route to get a single appointment by id
router.get('/appointments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield knex('appointments').where('id', id).first();
        if (appointment) {
            res.json(appointment);
        }
        else {
            res.status(404).json({ message: `Appointment with id ${id} not found` });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching appointment', details: error });
    }
}));
// Route to create a new appointment
router.post('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [id] = yield knex('appointments').insert(req.body).returning('id');
        const newAppointment = yield knex('appointments').where('id', id).first();
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating appointment', details: error });
    }
}));
// Route to update an existing appointment
router.put('/appointments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield knex('appointments').where('id', id).update(req.body);
        const updatedAppointment = yield knex('appointments').where('id', id).first();
        res.json(updatedAppointment);
    }
    catch (error) {
        res.status(500).json({ error: `Error updating appointment with id ${id}`, details: error });
    }
}));
// Route to delete an appointment
router.delete('/appointments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield knex('appointments').where('id', id).del();
        res.status(204).send(); // No content to send back
    }
    catch (error) {
        res.status(500).json({ error: `Error deleting appointment with id ${id}`, details: error });
    }
}));
exports.default = router;
