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

describe("Manipulate groups", () => {
    it("Can get kitchen group and change light percentage", async () => {
        const oldBrightness = await connector.getLightBrightness({groupName: 'Kitchen'});
        const newBrightnessPercentage = 50;


        await connector.setLightBrightnessByGroupName( {groupName: 'Kitchen', percentage: newBrightnessPercentage});

        const actualBrightness = await connector.getLightBrightness({groupName: 'Kitchen'});

        expect(actualBrightness).to.equal(newBrightnessPercentage);

        await connector.setLightBrightnessByGroupName( {groupName: 'Kitchen', percentage: oldBrightness});

    });
});

describe("Get remotes", () => {
    it("Get all buttons", async () => {

        const bathroomSwitch = await connector.getSwitch({name: "Badet switch"});

        expect(bathroomSwitch).to.not.be.null;

    });
});

describe("Get resource links", () => {
    it("For a switch", async () => {

        const bathroomSwitchRules = await connector.getResourceLinks({name: "Badet switch"});

        expect(bathroomSwitchRules.value.name).to.equal("Badet switch");

    });

    it("Get rules triggered just now", async () => {
        const rulesTriggered = await connector.getRulesTriggered({timespanInMinutes: 1});

        rulesTriggered.every(rule => console.log(rule.key));

    });
});



