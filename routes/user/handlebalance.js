const express = require('express');
const router = express.Router();
const { updatePlayerBalance } = require('../../dal/balance');
const { updateAdminBalance } = require('../../dal/balance');

router.post('/', async(req, res) => {
    const { userData, amount} = req.body;
    const userId = userData.id;

    try {        
        await updatePlayerBalance(userId, amount);
        await updateAdminBalance(userId, null);

        res.json({ message: 'Users balance successfully updated.' });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error during updating the users balance.');
    }
});

module.exports = router;