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

    const isNight = isAfterSunset({date:now}) || !isAfterSunrise({date:now});
    if(isNight){
        return 0;
    }

    //Stigende prosent mellom soloppgang og Solar noon

    //Synkende prosent mellom Solar noon og solnedgang
}

function getTimes({date}) {
    const times = suncalc.getTimes(date, oslo.lat, oslo.long);

    return {
        dawn: moment(times.dawn),
        dusk: moment(times.dusk),
        goldenHour: moment(times.goldenHour),
        goldenHourEnd: moment(times.goldenHourEnd),
        nadir: moment(times.nadir),
        nauticalDawn: moment(times.nauticalDawn),
        nauticalDusk: moment(times.nauticalDusk),
        night: moment(times.night),
        nightEnd: moment(times.nightEnd),
        solarNoon: moment(times.solarNoon),
        sunrise: moment(times.sunrise),
        sunriseEnd: moment(times.sunriseEnd),
        sunset: moment(times.sunset),
        sunsetStart: moment(times.sunsetStart),
    };
}

function isAfterSunset({date}){
    return date.hours() > getTimes({date}).sunset.hours();
}

function isAfterSunrise({date}){
    return date.hours() > getTimes({date}).sunrise.hours();
}

function nextSunrise({now}) {

    const todayTimes = getTimes({date: now});
    const tomorrowTimes = getTimes({date: now.clone().add(1, 'days')});

    const sunriseMoment = todayTimes.sunrise;

    if (now < sunriseMoment) {
        return todayTimes.sunrise
    } else {
        return tomorrowTimes.sunrise;
    }
}

function nextSunset({now}) {

        const todayTimes = getTimes({date: now});
        const tomorrowTimes = getTimes({date: now.clone().add(1, 'days')});

        const sunsetMoment = moment(todayTimes.sunset);

        if (now < sunsetMoment) {
            return todayTimes.sunset
        } else {
            return tomorrowTimes.sunset;
        }
}


module.exports = {
    calculateDaylightInPercent,
    nextSunrise,
    nextSunset,
    isAfterSunset,
    isAfterSunrise,
    getTimes,
    today,
    tomorrow
}