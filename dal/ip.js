const pool = require('../db/database');

/* 
    This function is checking userIp if exists in the database.
    If not, creates a new user. 
*/

const checkAndRegisterIP = async (ipAddress) => {
    try {
        const checkIp =  'SELECT name FROM users WHERE ipAddress = ?';
        const [existingUsers] = await pool.query(checkIp, [ipAddress]);

        if ( existingUsers.length > 0) {

            return { 
                message: `Welcome back, ${existingUsers[0].name}.`,
                userData: existingUsers[0]
            };

        } else {

            const insertIp = 'INSERT INTO users (ipAddress) VALUES (?)';
            await pool.query(insertIp, [ipAddress]);
            return { message: 'New user registered.'}
            
        };

    } catch (error) {

        console.error('Database error:', error)
        throw error;
        
    };
};

module.exports = checkAndRegisterIP;