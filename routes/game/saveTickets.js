const express = require('express');
const router = express.Router();
const { saveTicketsToDatabase } = require('../../dal/tickets');

/* create tickets for user: */
router.post('/', async(req, res) => {
    const { userData, gameId, numbers } = req.body;
    const isAdmin = userData.is_admin;

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
        console.log(error);
        res.status(500).send('An error happened during getting tickets for user.')
    };

});

module.exports = router;