const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Set up session and passport
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/freecodecamp', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up user model
const User = require('./models/User');

// Configure passport strategies and serialization

// Set up routes
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
