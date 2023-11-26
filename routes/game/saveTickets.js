const express = require('express');
const router = express.Router();
const { saveTicketsToDatabase } = require('../../dal/tickets');
const { updateAdminBalance } = require('../../dal/balance');

/* create tickets for user: */
router.post('/', async(req, res) => {
    const { userData, gameId, numbers, counter } = req.body;
    const isAdmin = userData.is_admin;
    console.log(userData, gameId, numbers, counter);

    try {
        let response;
        if (isAdmin) {
            let userId = userData.id;
            response = await saveTicketsToDatabase(userId, gameId, numbers, counter);
            /* also update the admins balance at the save time: */
            console.log('this is the counter:', counter);
            for (let i = 0; i < parseInt(counter); i++) {
                /* call the dal for times, so it will update the balance with the ticket prices: */
                await updateAdminBalance(userId, null);
            };
        } else {
            let userId = userData.id;
            /* counter should be null here: */
            response = await saveTicketsToDatabase(userId, gameId, numbers, counter); 
        };

        res.json(response);

    } catch (error) { 
        console.log(error);
        res.status(500).send('An error happened during getting tickets for user.')
    };

});

module.exports = router;