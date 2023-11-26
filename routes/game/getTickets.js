const express = require('express');
const { getTicketsFromDatabase, getAllTicketsForAGame } = require('../../dal/tickets');
const router = express.Router();

/* get the tickets based on userId */
// this could be modified to take if admin wants ticket: it has to be iDless in that case. (all admin for all games.)
router.post('/', async (req, res) => {
    const { userId, gameId} = req.body;

    try {
        let response = await getTicketsFromDatabase(userId, gameId);
        if (userId === null) { /* itt boolean check */
            response = await getAllTicketsForAGame(gameId);
        }
        res.json(response);
    } catch (error) {
        console.error('error fetching tickets:', error);
        res.status(500).send('Error happened during getting tickets. ')
    }

});

module.exports = router;