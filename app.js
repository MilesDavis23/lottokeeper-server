const express = require('express');
const cors = require('cors');
const app = express();

/* routes: */
const userRoute = require('./routes/user/checkuser');

/* using routes, defining paths */
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/checkUser', userRoute);


app.listen(3001, () => {
    console.log('Server is running on port 3001')
});