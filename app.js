const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log('DB connected')
});

mongoose.connection.on('error', error => {
    console.log(`DB connection error: ${error}`)
});

// routes
const postRoutes = require('./routes/post');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node.js API listening on port: ${port}`);
});