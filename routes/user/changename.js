const express = require('express');
const changeUsername = require('../../dal/name');
const router = express.Router();

/* change username */
router.post('/', async (req, res) => {
    const userData = req.body.userData; //using userId to query, and change the username
    const newUserName = req.body.newUserName;

    try {
         let userId = userData.id; 
         const response = await changeUsername(userId, newUserName);
         res.json(response);

    } catch (error) {
        res.status(500).send('An error happened during checking ')
    };
});

module.exports = router;