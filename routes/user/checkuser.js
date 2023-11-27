const express = require('express');
const router = express.Router();
const checkAndRegisterIP = require('../../dal/ip');
const { v4: uuidv4 } = require('uuid')

/* check user: */
router.get('/', async (req, res) => {
    let uniqueId = req.cookies.uniqueId;
    if (!uniqueId) {
        uniqueId = uuidv4();
        res.cookie('uniqueId', uniqueId, { httpOnly: true});
    }; //create the unque id for the user. 
    const isAdmin = req.query.isAdmin === 'true';

    try {
        const response =  await checkAndRegisterIP(uniqueId, isAdmin);
        res.json(response);

    } catch (error) {
        res.status(500).send('An error happened during checking user ip.')
    };
});

module.exports = router;

