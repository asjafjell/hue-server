const expect = require('chai').expect;
const daylight = require('./daylight.js');
const moment = require('moment');

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
    it("After sunrise retuns true", async () => {
        const now = moment('2018-09-23T09:00:00+02:00');

        const isAfterSunrise = await daylight.isAfterSunrise({date : now});

        expect(isAfterSunrise).to.equal(true);
    });

    it("Before sunrise retuns false", async () => {
        const now = moment('2018-09-23T05:00:00+02:00');

        const isAfterSunrise = await daylight.isAfterSunrise({date : now});

        expect(isAfterSunrise).to.equal(false);
    });

});

describe("Is after sunset", () => {
    it("After sunset retuns true", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date : now});

        expect(isAfterSunset).to.equal(true);
    });

    it("Before sunset retuns false", async () => {
        const now = moment('2018-09-23T15:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date : now});

        expect(isAfterSunset).to.equal(false);
    });

});

describe("Light in Percent calculation", () => {
    it("Just before sunrise is darkest", async () => {
        const now = moment('2018-09-23T05:00:00+02:00');

        const daylightPercent = await daylight.calculateDaylightInPercent({now : now});

        expect(daylightPercent).to.equal(0);
    });

    it("Just after sunset is darkest", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const daylightPercent = await daylight.calculateDaylightInPercent({now : now});

        expect(daylightPercent).to.equal(0);
    });

});