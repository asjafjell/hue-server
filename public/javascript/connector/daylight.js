const suncalc = require('suncalc');
const moment = require('moment');

const oslo = {lat: 59.9139, long: 10.7522};

function today() {
    return moment();
}

function tomorrow() {
    return moment() + 1;
}

async function calculateDaylightInPercent({now}) {
    //Natt:
    // Timer etter solnedgang i dette døgnet   eller
    // Timer før soloppgang i samme døgn
    // 0 % lys

    //Stigende prosent mellom soloppgang og Solar noon

    //Synkende prosent mellom Solar noon og solnedgang
}

function getTimes({date}) {
    return suncalc.getTimes(date, oslo.lat, oslo.long);
}

function nextSunrise({now}) {

    const todayTimes = getTimes({date: now});
    const tomorrowTimes = getTimes({date: now.clone().add(1, 'days')});

    const sunriseMoment = moment(todayTimes.sunrise);

    if (now < sunriseMoment) {
        return moment(todayTimes.sunrise)
    } else {
        return moment(tomorrowTimes.sunrise);
    }
}

function solarNoon() {
    return moment(times.solarNoon);
}

function nextSunset({now}) {

        const todayTimes = getTimes({date: now});
        const tomorrowTimes = getTimes({date: now.clone().add(1, 'days')});

        const sunsetMoment = moment(todayTimes.sunset);

        if (now < sunsetMoment) {
            return moment(todayTimes.sunset)
        } else {
            return moment(tomorrowTimes.sunset);
        }
}


module.exports = {
    calculateDaylightInPercent,
    getBrightestTimeOfDay: solarNoon,
    nextSunrise,
    nextSunset,
    getTimes,
}