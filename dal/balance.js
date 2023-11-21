const pool = require('../db/database');

/* DAL: update player balance: */
const updatePlayerBalance = async (userId, amount) => {
    try {
        const updateUserBalanceQuery = 'UPDATE users SET balance = ? WHERE id = ? AND is_admin = 0';
        const [result] = await pool.query(updateUserBalanceQuery, [amount, userId]);
        console.log(result);
        if (result.affectedRows === 0) {
            throw new Error(`User not found or user is an admin: ${userId}`);
        };
        return { message: `User balance updated for user ${userId}` };
    } catch (error) {
        console.error('Database error during updating player balance:', error);
        throw error;
    }
};

/* DAL: update admin balance: */ //this has to be updated of corse!!!!!!: and exported to handlebalance route.
const updateAdminBalance = async (userId, amount) => {
    try {
        const updateUserBalanceQuery = 'UPDATE users SET balance = balance + ? WHERE id = ? AND is_admin = 1';
        const [result] = await pool.query(updateUserBalanceQuery, [amount, userId]);

        if (result.affectedRows === 0) {
            throw new Error(`User not found or user is a player: ${userId}`);
        }

        return { message: `Admin balance updated for user ${userId}` };
    } catch (error) {
        console.error('Database error during updating admin balance:', error);
        throw error;
    }
};

module.exports = {
    updatePlayerBalance, 
    updateAdminBalance
};