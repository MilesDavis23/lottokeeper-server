const pool = require('../db/database');

/* DAL: Changes the name of the user (player). */
//this could be change to doing it based on userId, no need for ip I think..
const changeUsername = async (userId, newName) => {
    try {

        const updateNameQuery = 'UPDATE users SET name = ? WHERE id = ? AND is_admin = 0';
        await pool.query(updateNameQuery, [newName, userId]);

        return { message: 'Username updated.'};

    } catch (error) {
        console.error('Database error, during usernam update:', error)
        throw error;
    };
};

module.exports = changeUsername;