const express = require('express');
const router = express.Router();
const { saveTicketsToDatabase } = require('../../dal/tickets');

/* create tickets for user: */
router.post('/', async(req, res) => {
    const { userData, numbers } = req.body;
    const isAdmin = userData.is_admin;
    const gameId = 4;

    try {
        let response;
        if (isAdmin) {
            response = ''; //itt fogjuk csinalni az admin fele ticket creationt.
        } else {
            let userId = userData.id;
            response = await saveTicketsToDatabase(userId, gameId, numbers);
        };
        res.json(response);

    } catch (error) { 
        res.status(500).send('An error happened during getting tickets for user.')
    };

});

module.exports = router;