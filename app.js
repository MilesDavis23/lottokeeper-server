const express = require('express');
const cors = require('cors');
const app = express();

/* routes: */
const userRoute = require('./routes/user/checkuser');
const updateName = require('./routes/user/changename');
const saveTickets = require('./routes/game/saveTickets');
const getTickets = require('./routes/game/getTickets');
const getGame = require('./routes/game/getGame');
const updateBalance = require('./routes/user/handlebalance');
const updateGameData = require('./routes/game/saveGame');
const handleDraw = require('./routes/game/drawGame');


app.use(express.json());
/* using routes, defining paths */
const allowedOrigins = ['http://localhost:3000', 'https://5fe0-89-134-0-253.ngrok-free.app'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true); 
        } else {
          callback(new Error('Not allowed by CORS lol')); 
        }
      }
}));
app.use('/checkUser', userRoute);
app.use('/updateUserName', updateName);
app.use('/saveTickets', saveTickets);
app.use('/getTickets', getTickets);
app.use('/getGame', getGame);
app.use('/updateBalance', updateBalance);
app.use('/updateGame', updateGameData);
app.use('/updateWinners', handleDraw);

app.listen(3001, () => {
    console.log('Server is running on port 3001')
});