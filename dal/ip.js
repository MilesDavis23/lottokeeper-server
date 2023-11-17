const pool = require('../db/database');

/* 
    This function is checking userIp if exists in the database.
    If not, creates a new user. 
*/

const checkAndRegisterIP = async (ipAddress) => {
    try {
        const checkIpQuery = 'SELECT * FROM users WHERE user_ip = ?';
        const [rows] = await pool.query(checkIpQuery, [ipAddress]);
        console.log(rows);

        if (rows.length > 0) {
            const existingUser = rows[0];
            return { 
                message: `Welcome back, ${existingUser.name}.`,
                userData: existingUser
            };
        } else {
            const insertIpQuery = 'INSERT INTO users (user_ip) VALUES (?)';
            await pool.query(insertIpQuery, [ipAddress]);
            return { message: 'New user registered.'};
        };

    } catch (error) {

        console.error('Database error:', error)
        throw error;
        
    };
};

module.exports = checkAndRegisterIP;