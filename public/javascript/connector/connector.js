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
}

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

async function getSensors() {
    //1:  Finn brytere som eksisterer - søk etter node med følgende:
    // "type": "ZLLSwitch"
    //2:  Finn en resourcelink i "resourcelinks" med samme navn som en bryter
    //3:  "links" i resourcelinken har link til alle regler knyttet til en bryter.
    await configureBridge();

    return await api.sensors();
}

async function getSwitch({name}) {
    return (await getSensors()).sensors
        .find(sensor =>
            sensor.name === name
            && sensor.type === "ZLLSwitch"
        );
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
    getSwitch: getSwitch,
};

