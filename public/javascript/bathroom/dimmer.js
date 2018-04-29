const moment = require('moment');

const PHILIPS_HUE_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const USED_RECENTLY_MINUTES = 30;

module.exports = {

    isButtonUsedRecently: function (button, currentTime) {
        const triggeredAt = toMoment(button.lasttriggered);
        const diff = moment.duration(currentTime.diff(triggeredAt));

        return diff.asMinutes() < Math.abs(USED_RECENTLY_MINUTES);

    },

    areButtonsUsedRecently: function (buttons, currentTime) {
        for (const i in buttons) {
            if (module.exports.isButtonUsedRecently(buttons[i], currentTime)) {
                return true;
            }
        }
        return false;
    }
}

function toMoment(rawDate) {
    return moment.utc(rawDate, PHILIPS_HUE_DATE_FORMAT)
}