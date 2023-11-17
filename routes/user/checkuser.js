const express = require('express');
const router = express.Router();
const checkAndRegisterIP = require('../../dal/ip');

/* check user: */
router.get('/', async (req, res) => {

    try {

        const ipAddress = req.ip;
        const response =  await checkAndRegisterIP(ipAddress);
        res.json(response);

    } catch (error) {

        res.status(500).send('An error happened during checking user ip.')

    };

});

module.exports = router;

