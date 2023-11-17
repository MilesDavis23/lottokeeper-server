const express = require('express');
const router = express.Router();
const checkAndRegisterIP = require('../../dal/ip');

/* check user: */
router.get('/', async (req, res) => {

    try {

        const ipAddress = req.ip;
        const userName = 'admin'
        const response =  await checkAndRegisterIP(ipAddress, userName);
        res.json(response);

    } catch (error) {

        res.status(500).send('An error happened during checking user ip.')

    };

});

module.exports = router;

