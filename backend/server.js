const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const recipesRoutes = require('./routes/recipes');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
        console.log('app is running on localhost:' + process.env.PORT);
    });
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.json({hello: 'world'});
});

app.use('/api/recipes', recipesRoutes);