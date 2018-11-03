const expect = require('chai').expect;
const daylight = require('./daylight.js');
const moment = require('moment');

//
// moment().toISOString(true) gir nåtid med korrekt tidssone
// Fint sted å se sol per dato: https://www.timeanddate.com/sun/norway/oslo?month=9&year=2018
//

describe("Next Sunrise", () => {
    it("Sunrise today if before todays sunrise", async () => {
        const now = moment('2018-09-23T03:00:00+02:00');

        const next = daylight.nextSunrise({now: now});

        expect(next.date()).to.equal(23);
    });

    it("Sunrise tomorrow if after todays sunrise", async () => {
        const now = moment('2018-09-23T12:00:00+02:00');

        const next = daylight.nextSunrise({now: now});

        expect(next.date()).to.equal(24);

    });
});


describe("Next Sunset", () => {
    it("Sunset today if before todays sunset", async () => {
        const now = moment('2018-09-23T18:00:00+02:00');

        const next = daylight.nextSunset({now: now});

        expect(next.date()).to.equal(23);
    });

    it("Sunset tomorrow if after todays sunset", async () => {
        const now = moment('2018-09-23T22:00:00+02:00');

        const next = daylight.nextSunset({now: now});

        expect(next.date()).to.equal(24);

    });
});


describe("Is after sunrise", () => {
    it("After sunrise returns true", async () => {
        const now = moment('2018-09-23T09:00:00+02:00');

        const isAfterSunrise = await daylight.isAfterSunrise({date: now});

        expect(isAfterSunrise).to.equal(true);
    });

    it("Before sunrise returns false", async () => {
        const now = moment('2018-09-23T05:00:00+02:00');

        const isAfterSunrise = await daylight.isAfterSunrise({date: now});

        expect(isAfterSunrise).to.equal(false);
    });

});

describe("Is after sunset", () => {
    it("After sunset returns true", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date: now});

        expect(isAfterSunset).to.equal(true);
    });

    it("Before sunset returns false", async () => {
        const now = moment('2018-09-23T15:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date: now});

        expect(isAfterSunset).to.equal(false);
    });

});

describe("Light in percent calculation", () => {
    it("Just before sunrise is darkest", async () => {
        const now = moment('2018-09-23T05:00:00+02:00');

        const daylightPercent = await daylight.calculateDaylightInPercent({now: now});

        expect(daylightPercent).to.equal(0);
    });

    it("Just after sunset is darkest", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const daylightPercent = await daylight.calculateDaylightInPercent({now: now});

        expect(daylightPercent).to.equal(0);
    });

    it("Between sunrise and solar noon is 50 percent light", async () => {
        const sunrise = moment('2018-10-02T07:25:22.696+02:00');
        const solarNoon = moment('2018-10-02T13:07:37.336+02:00');
        const difference = solarNoon.diff(sunrise);
        const middle = sunrise.add(difference / 2, 'milliseconds');

        const daylightPercent = await daylight.calculateDaylightInPercent({now: middle});

        expect(daylightPercent).to.equal(50);
    });

    it("Between solar noon and sunset is 50 percent light", async () => {
        const solarNoon = moment('2018-10-02T13:07:37.336+02:00');
        const sunset = moment('2018-10-02T18:49:51.976+02:00');
        const difference = sunset.diff(solarNoon);
        const middle = solarNoon.add(difference / 2, 'milliseconds');

        const daylightPercent = await daylight.calculateDaylightInPercent({now: middle});

        expect(daylightPercent).to.equal(50);
    });

    it("Brightest time of day is 100 percent", async () => {
        const now = moment('2018-11-03T12:01:48+01:00');

        const daylightPercent = await daylight.calculateDaylightInPercent({now: now});

        expect(daylightPercent).to.equal(100);
    });
});

