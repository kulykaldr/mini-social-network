const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).then(() => {
    console.log('Mongo DB connected')
});

mongoose.connection.on('error', error => {
    console.log(`Mongo DB connection error: ${error}`)
});

// routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// return to user apiDocs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(403).json({
                error: err
            })
        }
        const docs = JSON.parse(data);
        res.json(docs);
    })
});

// middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(authRoutes);
app.use(postRoutes);
app.use(userRoutes);
app.use(function (err, req, res) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized!');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Node.js API listening on port: ${port}`);
});