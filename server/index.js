
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');


const app = express();
app.use(cors())
//Connect Database
connectDB();

app.use(
    '/graphql',
    graphqlHTTP({
        schema: require('./schema/schema'),
        graphiql: process.env.NODE_ENV === 'development',
    }),
);



const port = process.env.PORT || 8000;
app.listen(port, console.log(`Server is running on port ${port}`));