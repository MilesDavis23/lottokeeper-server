const express = require('express');
const changeUsername = require('../../dal/name');
const router = express.Router();

/* register the new username */
router.post('/', async (req, res) => {
    const ipAddress = req.ip;
    const newUserName = req.body.newUserName;

    try {
         const response = await changeUsername(ipAddress, newUserName);
         res.json(response);

    } catch (error) {
        res.status(500).send('An error happened during checking ')
    };
});

module.exports = router;