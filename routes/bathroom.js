const express = require('express');
const router = express.Router();
const axios = require("axios");
const moment = require('moment');

const username = 'cwmUjck9rRqejZFL0Lot43CecLkfhpCKomR3YDZF'
const hueHost = '192.168.1.64';
const apiPath = 'http://' + hueHost + '/api/' + username + '/'


function isDimmerUsedRecently({onButton, offButton, moreLightsButton, lessLightsButton}) {

    return (isButtonUsedRecently(onButton) ||
        isButtonUsedRecently(offButton) ||
        isButtonUsedRecently(moreLightsButton) ||
        isButtonUsedRecently(lessLightsButton)
    );
}

function isButtonUsedRecently(buttonUrl) {
    axios
        .get(buttonUrl)
        .then(response => {
            const onClickTriggered = toMoment(response.data.lasttriggered);
            console.log('Did get button click ' + buttonUrl + ' with success. Clicked at ' + onClickTriggered.toISOString());
        })
        .catch(error => {
            console.log(error);
        });
}

function toMoment(rawDate) {
    return moment(Math.floor(new Date(rawDate) / 1000));
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    //Create user here
    console.log(req.body);


    console.log("Hallaballa");

    const bathroomDimmerSwitch = {
        onButton: apiPath + 'rules/34/',
        offButton: apiPath + 'rules/35',
        moreLightsButton: apiPath + 'rules/42',
        lessLightsButton: apiPath + 'rules/43'
    };

    isDimmerUsedRecently(bathroomDimmerSwitch);


    res.send('Did do bathroom manipulation');
});

module.exports = router;
