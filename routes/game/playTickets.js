const express = require('express');
const router = express.Router();
const playNumbersForGame = require('../../dal/tickets');

/* create tickets for user: */
router.post('/', async(req, res) => {
    
    const gameId = req.body.gameId;
    const userId = req.body.userId;
    const isAdmin = req.query.isAdmin === 'true';
    const numbers = req.body.numbers;

    try {

        let response;
        if (isAdmin) {
            response = '';
        } else {
            response = await playNumbersForGame(userId, gameId, numbers);
        };
        res.json(response);

    } catch (error) { 
        res.status(500).send('An error happened during getting tickets for user.')
    };

});

module.exports = router;