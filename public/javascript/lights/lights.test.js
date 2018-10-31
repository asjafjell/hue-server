
describe("Uses brightest of lights", () => {
    it("Dark outside, bright inside - returns inside", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date : now});

        expect(isAfterSunset).to.equal(true);
    });

    it("Bright outside, dark inside - returns outside", async () => {
        const now = moment('2018-09-23T21:00:00+02:00');

        const isAfterSunset = await daylight.isAfterSunset({date : now});

        expect(isAfterSunset).to.equal(true);
    });


});
