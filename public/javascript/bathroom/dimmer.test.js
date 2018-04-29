const moment = require("moment");
const dimmer = require('./dimmer');
const expect = require("chai").expect;
const fs = require('fs');
const path = require('path');


describe("Recently used button(s)", function () {
    describe("Single button on dimmer - determine recently used", function () {
        it("30 minutes and 1 second ago is not recently", function () {
            const button = getButton();

            const currentTime = moment.utc('2018-04-27 09:30:01', 'YYYY-MM-DD HH:mm:ss');
            const isUsedRecently = dimmer.isButtonUsedRecently(button, currentTime);

            expect(isUsedRecently).to.be.false;
        });

        it("29 minutes and 59 seconds ago is recently", function () {
            const button = getButton();

            const currentTime = moment.utc('2018-04-27 09:29:59', 'YYYY-MM-DD HH:mm:ss');
            const isUsedRecently = dimmer.isButtonUsedRecently(button, currentTime);

            expect(isUsedRecently).to.be.true;
        })
    });

    describe("Multiple buttons on dimmer - determine recently used", function () {
        it("Dimmer not recently used if no button used last 30 minutes", function () {
            const button0 = getButton();
            button0.lasttriggered = '2018-04-27T09:00:00';

            const button1 = getButton();
            button1.lasttriggered = '2018-04-27T09:01:00';

            const button2 = getButton();
            button2.lasttriggered = '2018-04-27T09:02:00';


            const currentTime = moment.utc('2018-04-27 09:40:00', 'YYYY-MM-DD HH:mm:ss');
            const areUsedRecently = dimmer.areButtonsUsedRecently([button0, button1, button2], currentTime);

            expect(areUsedRecently).to.be.false;
        });

        it("Dimmer is recently used if one button used within last 30 minutes", function () {
            const button0 = getButton();
            button0.lasttriggered = '2018-04-27T09:00:00';

            const button1 = getButton();
            button1.lasttriggered = '2018-04-27T09:01:00';

            const buttonRecentlyTriggered = getButton();
            buttonRecentlyTriggered.lasttriggered = '2018-04-27T09:16:00';


            const currentTime = moment.utc('2018-04-27 09:40:00', 'YYYY-MM-DD HH:mm:ss');
            const areUsedRecently = dimmer.areButtonsUsedRecently([button0, button1, buttonRecentlyTriggered], currentTime);

            expect(areUsedRecently).to.be.true;
        });
    })
});

getButton = () => {
    return readTestFile('testfiles/dimmer-on-button-rule.json');
}

readTestFile = (fileName) => {
    const jsonPath = path.join(__dirname, fileName);
    const jsonString = fs.readFileSync(jsonPath, 'utf8');
    return JSON.parse(jsonString);
}