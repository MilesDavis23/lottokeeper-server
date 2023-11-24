const pool = require('../db/database');

/* DAL: This function is checking userIp if exists in the database, and return its data. If not, creates a new user and return their data.*/
// Maybe this could be separated?
const checkAndRegisterIP = async (ipAddress, isAdmin) => {
    try {
        const checkIpQuery = 'SELECT * FROM users WHERE user_ip = ? AND is_admin = ?';
        const [rows] = await pool.query(checkIpQuery, [ipAddress, isAdmin ? 1 : 0]);

        /* check if theres alrady sold tickets: */
        const checkIfTheresActiveGameQuery = 'SELECT * FROM games WHERE is_active = 1';
        const [gameRows] = await pool.query(checkIfTheresActiveGameQuery)
        const alradySoldAmount = gameRows.length > 0 ? gameRows[0].tickets_sold * 500 : 0;

        /* check the balance of other admins:  (might delete) */
        const checkGeneralAdminBalance = 'SELECT * FROM users WHERE is_admin = 1';
        const [adminRows] = await pool.query(checkGeneralAdminBalance);
        const generalAdminBalance = adminRows.length > 0 ? adminRows[0].balance : alradySoldAmount;
        

        if (rows.length > 0) {
            const existingUser = rows[0];
            return existingUser
        } else {
            const name = isAdmin ? 'admin' : 'unknown'
            const insertIpQuery = 'INSERT INTO users (user_ip, name, balance, is_admin) VALUES (?, ?, ?, ?)';
            await pool.query(insertIpQuery, [ipAddress, name, isAdmin ? generalAdminBalance : 10000, isAdmin ? 1 : 0]);            
            return { message: `New ${isAdmin ? 'admin' : 'user'} registered.`};
        };

    } catch (error) {

        console.error('Database error checking user:', error);
        throw error;
        
    };
};

module.exports = checkAndRegisterIP