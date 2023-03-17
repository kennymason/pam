const { Sengled } = require('@callmekory/sengled-api')

const controlDevice = async (creds) => {
  // Login to sengled via username and password
  try {
    const sengled = new Sengled()

    await sengled.login(creds.user, creds.pass);

    // Get devices
    const devices = await sengled.getDevices();

    /**
    Device {
      deviceUuid: 'xxxxx',
      gatewayUuid: 'xxxx',
      deviceName: 'desk lamp',
      brightness: 0,
      colortemperature: 0,
      onoff: 0,
      signalQuality: 1,
      signalValue: 0,
      activeHours: 8274,
      isOnline: 0,
      power: '0',
      onCount: 62,
      powerConsumptionTime: '0',
      productCode: 'E11-G13',
      attributeIds: '0,1,3,4',
      rgbColorR: 144,
      rgbColorG: 255,
      rgbColorB: 255
      }
  */

    // Find device by name
    const myDevice = devices.find((device) => device.deviceName === 'Little')

    // Turn device on
    await myDevice.on()

    // Set brightness to 50%
    await myDevice.setBrightness(50)
  }
  catch (e) {
    console.log(e);
  }
}

async function run () {
  
}

module.exports = {
  controlDevice: controlDevice,
  run: run
}
