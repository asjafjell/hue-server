const express = require('express');
const router = express.Router();
const scheduler = require('node-cron');
const moment = require('moment');


// Schedule automatic adjustment
scheduler.schedule('0-59/10 * * * * *', function () {
    console.log('Running recurring light adjustment at ' + moment().toISOString());
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
