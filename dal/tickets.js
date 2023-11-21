const pool = require('../db/database');

/* DAL: Saving tickets to database: */
const saveTicketsToDatabase = async (userId,  gameId, numbers) => {
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

/* DAL: Fetching tickets from database: */
//this is for corse could be modified for admin use too:
const getTicketsFromDatabase = async (userId, gameId) => {
    try {

        const saveTicketsListQuery = 'SELECT * FROM tickets WHERE userId = ? AND gameId = ? AND is_real = 1';
        const [rows] = await pool.query(saveTicketsListQuery, [userId, gameId]);
        

        if (rows.length > 0) {
            const userTickets = rows;
            return userTickets
        } else {
            return { message: `Can't find tickets for user: ${userId} / game: ${gameId} `}
        };
        
    } catch (error) {

        console.error(`Database error during getting tickets: `,  error);
        throw error;
    };
};

module.exports = {
    saveTicketsToDatabase,
    getTicketsFromDatabase
};