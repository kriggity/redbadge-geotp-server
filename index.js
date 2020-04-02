/****************************************************
 * .env Config
****************************************************/
require('dotenv').config();

/****************************************************
 * Express
****************************************************/
const express = require('express');
const app = express();

/****************************************************
 * Controller Imports
****************************************************/
const user = require('./controllers/usercontroller');
const location = require('./controllers/locationcontroller');
const comment = require('./controllers/commentcontroller');

const user_exposed = require('./controllers/user_exposed');
const location_exposed = require('./controllers/location_exposed');
const comment_exposed = require('./controllers/comment_exposed');

/****************************************************
 * DB Import and Sync
****************************************************/
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());

/****************************************************
 * Middleware
****************************************************/
app.use(require('./middleware/headers'));

/****************************************************
 * Exposed Routes
****************************************************/
app.use('/api/users', user_exposed);
app.use('/api/locations', location_exposed);
app.use('/api/comments', comment_exposed);

/****************************************************
 * Protected Routes
 ****************************************************/
app.use(require('./middleware/validate-session'));
app.use('/api/users', user);
app.use('/api/locations', location);
app.use('/api/comments', comment);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));