const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

// Init App
const app = express();

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Définition d'un middleware qui logue les informations de la requête
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

// Utilisation du middleware pour toutes les requêtes
app.use(logRequest);

// Simple Route (Http Methods (Or Verbs))
app.get('/', (req, res) => {
  res.send('Welcome to your new application');
})

// user routes
app.use('/users', require('./user/routes/userRoutes'));

// Set Port, Listen For Requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });