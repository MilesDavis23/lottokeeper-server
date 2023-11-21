const express = require('express');
const { getTicketsFromDatabase } = require('../../dal/tickets');
const router = express.Router();

/* get the tickets based on userId */
// this could be modified to take if admin wants ticket: it has to be iDless in that case. (all admin for all games.)
router.post('/', async (req, res) => {
    const userId = req.body.userId;
    const gameId = 4; 

    try {
        const respone = await getTicketsFromDatabase(userId, gameId);
        res.json(respone);
    } catch (error) {
        console.error('error fetching tickets:', error);
        res.status(500).send('Error happened during getting tickets. ')
    }

});

module.exports = router;