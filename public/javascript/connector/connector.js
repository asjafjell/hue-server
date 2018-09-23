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

async function setLightBrightnessByGroupName({groupName, percentage}) {
    const group = await getGroup({groupName: groupName});

    return await setLightBrightnessByGroupId({groupId: group.id, percentage});
}

async function setLightBrightnessByGroupId({groupId, percentage}) {
    const state = hue.lightState.create().white(500, percentage);

    await api.setGroupLightState(groupId, state);
}

async function getLightBrightness({groupName}) {
    const group = await getGroup({groupName: groupName});
    const maxBrightness = 254;

    return Math.ceil(group.action.bri/maxBrightness*100);
}

async function getRules() {
    //TODO: Legg til enkel request som henter regler
}

async function getRemote() {
    //TODO: Henter ut alle regler for en bryter. Kan generalisere
    //for alle brytere etter hvert, men først bare for badet :)
}

module.exports = {
    configureBridge: configureBridge,
    isBridgeConfigured: isBridgeConfigured,
    getLights: getLights,
    getGroups: getGroups,
    getGroup: getGroup,
    setLightBrightnessByGroupId: setLightBrightnessByGroupId,
    setLightBrightnessByGroupName: setLightBrightnessByGroupName,
    getLightBrightness: getLightBrightness,
};

