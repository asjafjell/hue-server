const connector = require('../connector/connector');
const daylight = require('../connector/daylight');
const moment = require('moment');

async function setLightPercentForGroup({groupName}) {
    const currentBrightness = await connector.getLightBrightness({groupName});

    const naturalLight = await daylight.calculateDaylightInPercent({now: moment()});
    const baseLight = await connector.getLightBrightness({groupName: 'Livingroom'});

    let nextBrightness = Math.max(naturalLight, baseLight);

    const noBrightnessChanges = currentBrightness === nextBrightness;
    if(noBrightnessChanges){
        return;
    }

    if(nextBrightness === 0){
        nextBrightness = 15;
    }

    await connector.setLightBrightnessByGroupName({
            groupName: groupName,
            percentage: nextBrightness
        }
    );

    console.log(groupName + ': Natural light: ' + naturalLight + '%, baseLight: ' + baseLight + '%');
    console.log(groupName + ': Adjusting to ' + nextBrightness + '%')

}

module.exports = {
    setLightPercentForGroup,
};