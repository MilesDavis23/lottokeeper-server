const express = require('express');
const router = express.Router();
const checkAndRegisterIP = require('../../dal/ip');

/* check user: */
router.get('/', async (req, res) => {
    const ipAddress = req.ip;
    const isAdmin = req.query.isAdmin === 'true';


    try {
        const response =  await checkAndRegisterIP(ipAddress, isAdmin);
        res.json(response);

    } catch (error) {
        res.status(500).send('An error happened during checking user ip.')
    };
});

module.exports = router;

