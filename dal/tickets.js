const pool = require('../db/database');

/* DAL: Saving tickets to database: */
const saveTicketsToDatabase = async (userId,  gameId, numbers, counter) => {
    /* the counter is sent ususally with the null value, only avaiable if the admin send the fake ticket info */
    try {
        let is_real = 1;
        const win = 0;
        const is_active = 1; /* fake numbers? amikor az admin general szamokat, akkor mi lesz? userid = 0? */

        const numbersString = JSON.stringify(numbers) //convert the inputs into a array string. 

        if (counter) {
            /* the dal receives data from the admin user, with a certain  */
            is_real = 0;
            const registerFakeTicketsQuery = 'INSERT INTO tickets (userId, gameId, numbers, win, is_active, is_real) values (?, ?, ?, ?, ?, ?)'
            console.log('this:', counter);;
            console.log('the numbers:', numbers);
            for (let i = 0; i < parseInt(counter); i++) {
                const numberSetString = JSON.stringify(numbers[i]);
                await pool.query(registerFakeTicketsQuery, [userId, gameId, numberSetString, win, is_active, is_real]);
            };
        } else {
            const registerNumbersQuery = 'INSERT INTO tickets (userId, gameId, numbers, win, is_active, is_real) values (?, ?, ?, ?, ?, ?)';
            await pool.query(registerNumbersQuery, [userId, gameId, numbersString, win, is_active, is_real]);
            console.log('this:', registerNumbersQuery )
        };

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

        const saveTicketsListQuery = 'SELECT * FROM tickets WHERE userId = ? AND gameId = ?';
        const [rows] = await pool.query(saveTicketsListQuery, [userId, gameId]);
        console.log('this is rows in route:', rows);
        

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

const getAllTicketsForAGame = async (gameId) => {
    try {
        const getAllTicketsQuery = 'SELECT * FROM tickets WHERE gameId = ?';
        const [rows] = await pool.query(getAllTicketsQuery, gameId);

        if (rows.length > 0) {
            const allTickets = rows;
            return allTickets;
        } else { 
            return  { message: `Can't find tickets for game: ${gameId}`}
        }
    } catch (error) {
        console.error('Database error getting all tickets for game.', error);
        throw (error);
    }
}

module.exports = {
    saveTicketsToDatabase,
    getTicketsFromDatabase,
    getAllTicketsForAGame
};