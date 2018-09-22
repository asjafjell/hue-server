const expect = require('chai').expect;
const connector = require('./connector.js');

describe("Bridge connection", () => {
       it("Can get bridge ip correctly", async () => {
           expect(connector.isBridgeConfigured()).to.be.false;

           await connector.configureBridge();

           expect(connector.isBridgeConfigured()).to.be.true;
       });

       it("Get lights will make sure bridge set up correctly", async () => {
           const lights = await connector.getLights();

           expect(lights.lights.length).to.be.at.least(3);
       });
});

describe("Get groups", () => {
    it("Can get kitchen group", async () => {
        const kitchen = await connector.getGroup({groupName: "Kitchen"});

        expect(kitchen.lights.length).to.be.at.least(3);

    })
});