const connector = require('../connector/connector');
const daylight = require('../connector/daylight');
const moment = require('moment');

const MINUTES_TO_MAKE_RULES_ABORT_ADJUSTMENT = 30;

async function abortAdjustment({rulesThatAbort}) {
    if (rulesThatAbort === undefined) {
        return false;
    }

    const rulesTriggered = await connector.getRulesTriggered({timespanInMinutes: MINUTES_TO_MAKE_RULES_ABORT_ADJUSTMENT});
    const filtered = rulesTriggered.filter(r => rulesThatAbort.includes(parseInt(r.key)));

    if (filtered.length > 0) {
        console.log('   -> No adjustments, Manual override with rules ' + filtered.map(rule => rule.key).toString());
        return true;
    }

    return false;
}

async function setLightPercentForGroup({groupName, rulesTriggeredAbortingAdjustment}) {

    const currentBrightness = await connector.getLightBrightness({groupName});

    const naturalLight = await daylight.calculateDaylightInPercent({now: moment()});
    const baseLight = await connector.getLightBrightness({groupName: 'Livingroom'});

    console.log(groupName + ': Natural light: ' + naturalLight + '%, baseLight: ' + baseLight + '%.');
    console.log('   Current brightness: ' + currentBrightness + '%.');

    const manualOverride = await abortAdjustment({rulesThatAbort: rulesTriggeredAbortingAdjustment});
    if (manualOverride) {
        return;
    }

    const minimumValue = 15;
    let nextBrightness = Math.max(naturalLight, baseLight, minimumValue);

    const noBrightnessChanges = currentBrightness === nextBrightness;
    if (noBrightnessChanges) {
        console.log('   -> No adjustments. Current brightness is same as new. ');
        return;
    }

    console.log('   -> Adjusting to ' + nextBrightness + '%');

    await connector.setLightBrightnessByGroupName({
            groupName: groupName,
            percentage: nextBrightness
        }
    );


}

module.exports = {
    setLightPercentForGroup,
};