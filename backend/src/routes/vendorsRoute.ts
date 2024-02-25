import { Router } from 'express';

const knex = require('../../db/knex');
const router = Router();

// Get all vendors
router.get('/vendors', async (req, res) => {
    try {
        const vendors = await knex('vendors').select('*');
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vendors', details: error });
    }
});



export default router;
