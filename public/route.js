const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Display sign-in form
router.get('/signin', (req, res) => {
  res.sendFile('signin.html', { root: './public' });
});

// Handle sign-in form submission
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/course',
  failureRedirect: '/auth/signin'
}));

// Local strategy setup
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Email not found' });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return done(err);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = router;
