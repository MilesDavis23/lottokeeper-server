const pool = require('../db/database');

const playNumbersForGame = async (userId,  gameId, numbers) => {
    try {
        const win = 0;
        const is_active = 1; /* fake numbers? amikor az admin general szamokat, akkor mi lesz? userid = 0? */
        const is_real = 1;
        
        const registerNumbersQuery = 'INSERT INTO tickets (userId, gameId, numbers, win, is_active, is_real) values (?, ?, ?, ?, ?, ?)';
        await pool.query(registerNumbersQuery, [userId, gameId, numbers, win, is_active, is_real]);

        return {
            message: `${numbers} registered for the game!`
        };

    } catch (error) {
        console.error(`Database error during registering numbers:`,  error);
        throw error;
    };
};

module.exports = playNumbersForGame;