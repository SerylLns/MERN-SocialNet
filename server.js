const express = require('express');
const userRoutes = require('./routes/user.routes');
const bodyParser = require("body-parser");
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/user', userRoutes);


// Server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})