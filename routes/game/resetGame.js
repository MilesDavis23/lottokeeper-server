const express = require('express');
const { setGameIsActive, checkForActiveGame, createNewGame } = require('../../dal/game');
const router = express.Router();

/* Separate game for setting the game to inactvie, based on gameId */
router.post('/', async(req, res) => {
    const { gameData } = req.body;

    try {
        const activeGame = await checkForActiveGame();
        if (activeGame) {
            await setGameIsActive(gameData);
        };
        const newGame = await createNewGame();
        res.json({ message: `Game:${gameData.id} has been reseted, new game has been intialized with game id: ${newGame.id}` });
    } catch (error) {
        console.log('Error during updating game status.', error); // ezt lehet kiszedni / profobban log boolean 
        res.status(500).send('Error during updating game status.');
    };
});

module.exports = router;