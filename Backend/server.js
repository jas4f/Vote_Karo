const express = require('express')
const app = express();
const db = require('./db');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;
app.use(cors());

// OR enable CORS for specific origin
// app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const { jwtAuthMiddleware } = require('./jwt');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate',jwtAuthMiddleware, candidateRoutes);


app.listen(PORT, () => {
    console.log('listening on port 3000');
})