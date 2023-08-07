const express = require('express');
const router = express.Router();

const Course = require('../models/Course');

// Display courses
router.get('/', (req, res) => {
  Course.find({}, (err, courses) => {
    if (err) {
      console.log(err);
    } else {
      res.render('courses', { courses });
    }
  });
});

module.exports = router;
