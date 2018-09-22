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

    return await api.lights();
}

async function getGroups() {
    await configureBridge();

    return await api.groups();
}

async function getGroup({groupName}) {
    return (await getGroups()).find(k => k.name === groupName);
}

async function setLightBrightness({ lightId, percentage,}){
    const state = hue.lightState.create().white(500, percentage);

    await api.setLightState(lightId, state);
}

async function getRules() {
    //TODO: Legg til enkel request som henter regler
}

async function getRemote() {
    //TODO: Henter ut alle regler for en bryter. Kan generalisere
    //for alle brytere etter hvert, men først bare for badet :)
}


module.exports.configureBridge = configureBridge;
module.exports.isBridgeConfigured = isBridgeConfigured;
module.exports.getLights = getLights;
module.exports.getGroups = getGroups;
module.exports.getGroup = getGroup;
module.exports.setLightBrightness = setLightBrightness;
