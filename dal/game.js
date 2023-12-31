const pool = require('../db/database')

/* DAL: insert a new active game, and return its data: */
const createNewGame = async () => {
    try {
        //has to change for how much is the price, and handling the admin id:
        const insertQuery = 'INSERT INTO games (prize, createdAt, is_active) VALUES (1, NOW(), 1)';
        const [insertResults] = await pool.query(insertQuery);
        const selectQuery = 'SELECT * FROM games WHERE id = ?';
        const [selectResults] = await pool.query(selectQuery, [insertResults.insertId]);        
        return selectResults;
    } catch (error) {
        console.error(`Database error during creating a new lotto game:`, error);
        throw error;
    };
};

/* DAL: check for Active game in db: */
const checkForActiveGame = async () => {
    try {
        const searchActiveGameQuery = 'SELECT * FROM games WHERE is_active = 1';
        const [results] = await pool.query(searchActiveGameQuery);
        return results[0];
    } catch (error) {
        console.error(`Database error during searching for active lotto game:`, error);
        throw error;
    };
}; 

/* DAL: update the gamedata with the updated gameinstance from the client. */
const updateGame = async (prize, tickets, isActive,  gameId) => {
    try {
        const updateGameQuery = 'UPDATE games SET prize = ?, tickets_sold = ?, is_active = ? WHERE id = ?';
        const [result] = await pool.query(updateGameQuery,[prize, tickets, isActive,  gameId]);

        if (result.affectedRows === 0) {
            throw new Error(`Game not found with id: ${gameId}`);
        };
        return { message: `Game data updated for game: ${gameId}`};
    } catch (error) {
        console.error('Database error during updating game data:', error);
        throw error;
    };
};

/* DAL: get winning userId, based on ticket ids:  */
const getWinners = async (winners) => {

    try {
        let winningUserIds = {
            fiveHit: [],
            fourHit: [],
            threeHit: [],
            twoHit: [],
            noHit: []
        };

        for (const tier in winners) {
            if (winners[tier].length > 0) {
                const query = 'SELECT userId FROM tickets WHERE id IN (?)';
                const [results] = await pool.query(query, [winners[tier]]);
                /* we should add the ticket ID here too. ???????? maybe not/ */
                winningUserIds[tier] = results.map(row => row.userId);
            };
        };

        return winningUserIds;
        
    } catch (error){
        console.error('Database error during fetching winning user data:', error);
        throw error;
    };
};

/* DAL: update the current game  */
const setGameIsActive = async (gameId) => {
    try {
        const updateGameQuery = 'UPDATE games SET is_active = 0 WHERE id = ?';
        const [result] = await pool.query(updateGameQuery, [gameId]);

        if (result.affectedRows === 0) {
            throw new Error(`Not able to update the game for: ${gameId}`)
        };

        return { message: `Game status set to inactive for game: ${gameId}`};
    } catch (error) {
        console.error('Database error during updating game data.', error);
        throw error;
    };
};


module.exports = {
    createNewGame,
    checkForActiveGame,
    updateGame, 
    getWinners,
    setGameIsActive
};

