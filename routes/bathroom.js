const express = require('express');
const router = express.Router();
const axios = require("axios");
const moment = require('moment');


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

    res.send('Did do bathroom manipulation');
});

module.exports = router;
