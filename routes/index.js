const express = require('express');
const router = express.Router();
const scheduler = require('node-cron');
const moment = require('moment');
const connector = require('../public/javascript/connector/connector')


async function extracted({baseRoomName, roomToAdjustName}) {
    const baseRoomBrightness = await connector.getLightBrightness({groupName: baseRoomName});

    const currentRoomToAdjustBrightness = await connector.getLightBrightness({groupName: roomToAdjustName});
    const futureRoomToAdjustBrightness = Math.min(100, baseRoomBrightness + 20);

    console.log('Got ' + baseRoomName + ' brightness of ' + baseRoomBrightness +
        '% and adjusting ' + roomToAdjustName + ' from ' + currentRoomToAdjustBrightness + '% to ' + futureRoomToAdjustBrightness +
        '%.');

    await connector.setLightBrightnessByGroupName({groupName: roomToAdjustName, percentage: futureRoomToAdjustBrightness});

    return futureRoomToAdjustBrightness;
}

// Schedule automatic adjustment
scheduler.schedule('0-59/10 * * * * *', async function () {
    console.log('Running recurring light adjustment at ' + moment().toISOString());

    ////////////////////////////////////////////////////////////
    //           Adjust kitchen based on livingroom           //
    ////////////////////////////////////////////////////////////
    extracted({baseRoomName: "Livingroom", roomToAdjustName: "Kitchen"});


    ////////////////////////////////////////////////////////////
    //           Adjust bathroom based on livingroom          //
    ////////////////////////////////////////////////////////////


});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
