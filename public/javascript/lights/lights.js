const connector = require('../connector/connector');
const daylight = require('../connector/daylight');
const moment = require('moment');

async function setLightPercentForGroup({groupName}) {
    const currentBrightness = await connector.getLightBrightness({groupName});

    const naturalLight = await daylight.calculateDaylightInPercent({now: moment()});
    const baseLight = await connector.getLightBrightness({groupName: 'Livingroom'});

    const minimumValue = 15;
    let nextBrightness = Math.max(naturalLight, baseLight, minimumValue);

    const noBrightnessChanges = currentBrightness === nextBrightness;
    if (noBrightnessChanges) {
        return;
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