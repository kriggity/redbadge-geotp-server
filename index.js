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
// Keeping these exposed for initial testing
app.use('/api/users', user);
app.use('/api/locations', location);
app.use('/api/comments', comment);

/****************************************************
 * Protected Routes
****************************************************/
// Keeping this commented out for initial testing
// app.use(require('./middleware/validate-session'));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));