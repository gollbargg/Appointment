import { Router } from 'express';

const knex = require('../../db/knex');
const router = Router();

// Get all buyers
router.get('/buyers', async (req, res) => {
    try {
        const buyers = await knex('buyers').select('*');
        res.json(buyers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching buyers', details: error });
    }
});



export default router;
