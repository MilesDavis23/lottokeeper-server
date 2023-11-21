const express = require('express');
const router = express.Router();
const { updatePlayerBalance } = require('../../dal/balance');
const { updateAdminBalance } = require('../../dal/balance');

router.post('/', async(req, res) => {
    const { userData, amount} = req.body;

    try {
        const userId = userData.id;
        await updatePlayerBalance(userId, amount);

        // has to be here, update the admin balance:

        
        res.status(200).send('Plater balance sccesfully updated.');
    } catch (error) {
        res.status(500).send('An error during updating the users balance.');
    }
});

module.exports = router;