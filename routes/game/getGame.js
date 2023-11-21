const express = require('express');
const { checkForActiveGame, createNewGame } = require('../../dal/game');
const router = express.Router();
/* ROUTE: return the current game data:
   if theres no current game data, create the new game data. */
router.post('/', async(req, res) => {
    let currentGame;
    try {
        const activeGame = await checkForActiveGame();
        if(!activeGame) {
            const newGame = await createNewGame();
            currentGame = newGame;
        } else if (activeGame) {
            currentGame = activeGame;
        };
        res.json(currentGame);
    } catch (error) {
        res.status(500).send('An error happened during checking game data.')
    }
});

module.exports = router;