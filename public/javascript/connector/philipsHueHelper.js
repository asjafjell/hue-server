const moment = require('moment');
const axios = require('axios');

function convertToMoment({rawPhilipsHueDate}) {
    if (rawPhilipsHueDate === 'none') {
        return moment().subtract(2018, 'years');
    }
    return moment(rawPhilipsHueDate).add(moment().utcOffset(), 'minutes');
}

function convertObjectChildrenToList({object}) {
    const resourceArray = [];
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            resourceArray.push({key: key, value: object[key]})
        }
    }

    return resourceArray;
}

async function getDirectlyFromApi({bridgeInternalIpAddress, bridgeUsername, endpoint}) {
    const url = 'http://' + bridgeInternalIpAddress + '/api/' + bridgeUsername + '/' + endpoint;

    return (await axios.get(url)).data;
}

module.exports = {
    convertToMoment,
    convertObjectChildrenToList,
    getDirectlyFromApi
};