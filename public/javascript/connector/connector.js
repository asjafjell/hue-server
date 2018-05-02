const hue = require("node-hue-api")
const HueApi = require("node-hue-api").HueApi;

let api;

let bridgeInternalIpAddress = null;
const bridgeUsername = 'cwmUjck9rRqejZFL0Lot43CecLkfhpCKomR3YDZF';


isBridgeConfigured = () => {
    return bridgeInternalIpAddress !== null;
};

function fetchAndSetBridgeIp(bridge) {
    console.log('Hue Bridges Found: ' + JSON.stringify(bridge));
    bridgeInternalIpAddress = bridge[0].ipaddress;
}

async function configureBridge (){

    if (!isBridgeConfigured()) {
        const res = await hue.nupnpSearch();
        fetchAndSetBridgeIp(res);
    }

    api = new HueApi(bridgeInternalIpAddress, bridgeUsername);
};

async function getLights(){
    await configureBridge();

    const allLights = await api.lights();

    return allLights;
}

module.exports.configureBridge = configureBridge;
module.exports.isBridgeConfigured = isBridgeConfigured;
module.exports.getLights = getLights;
