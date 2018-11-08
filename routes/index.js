const express = require('express');
const router = express.Router();
const scheduler = require('node-cron');
const moment = require('moment');
const connector = require('../public/javascript/connector/connector');
const lights = require('../public/javascript/lights/lights');

// Schedule automatic adjustment
scheduler.schedule('0-59/10 * * * * *', async function () {
    console.log('Running recurring light adjustment at ' + moment().toISOString());

    await lights.setLightPercentForGroup({groupName: "Kitchen",});
    await lights.setLightPercentForGroup({groupName: "Hallway closet"});
    await lights.setLightPercentForGroup({
        groupName: "Bathroom",
        rulesTriggeredAbortingAdjustment: [34, 39, 42, 45, 46, 110]
    })
});

// Get rules triggered the last minute
scheduler.schedule('0-59/10 * * * * *', async function () {
    const rulesTriggered = await connector.getRulesTriggered({timespanInMinutes: 1});

    if (rulesTriggered.length > 0) {
        console.log('Found rules triggered ' + rulesTriggered.map(rule => rule.key).toString());
    } else {
    }
});


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
