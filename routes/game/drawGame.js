const express = require('express');
const { updateAdminBalance, updatePlayerBalance } = require('../../dal/balance');
const { getWinners } = require('../../dal/game');
const router = express.Router();

/* */
router.post('/', async (req, res) => {
    const { winners, prizes, prizeSum } = req.body;
    console.log(winners, prizes, prizeSum);

    try {
        /* update the admin balnce: */
        let prizeSumForAdminBalance = -prizeSum; /* 60% is distributted amoung, 40% az admine  */
        console.log('prizeSum:', prizeSumForAdminBalance);
        await updateAdminBalance(null, prizeSumForAdminBalance);

        let winnerUserIds = await getWinners(winners);
        console.log('winner ids:',winnerUserIds)
        for (const tier in winnerUserIds) {
            const userIds = winnerUserIds[tier];
            const prizeAmount = prizes[tier];
            for (const userId of userIds) {
                await updatePlayerBalance(userId, prizeAmount, true);
            };
        };
        res.json({
            message: 'Data for admin and winning users updated.',
            data: winnerUserIds
        });
    } catch (error) {
        console.error('Database error during fetching winning user data:', error);
        res.status(500).json({ error: "Database error" });
    };
});

module.exports = router;