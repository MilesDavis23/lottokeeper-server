const express = require('express');
const { updateGame } = require('../../dal/game');
const router = express.Router();

/* ROUTE: update the game table with the game data: */
router.post('/', async(req, res) => {
    const { gameData } = req.body;

    try {
        await updateGame(gameData.prize,  gameData.ticketsSold, gameData.isActive, gameData.gameId);
        res.status(200).send(`Gamedata updated for ${gameData.gameId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error during updating gamedata.');
    }
});

module.exports = router;
