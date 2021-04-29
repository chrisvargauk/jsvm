// Move Register into Register
export default function () {
  const regFromOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regFromOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regFromOffsetInRegisterMemory}"`;
  }

  // const regFromValue = this.registerManager.listRegister.getUint8(regFromOffsetInRegisterMemory);
  const regFromValue = this.registerManager.getValueByAddress(regFromOffsetInRegisterMemory);

  const regToOffsetInRegisterMemory = this.getMem8BitAtIp();
  if (this.registerManager.mapRegister.length <= regToOffsetInRegisterMemory) {
    throw `Register doesn't exist "${regToOffsetInRegisterMemory}"`;
  }

  // this.registerManager.listRegister.setUint8(regToOffsetInRegisterMemory, regFromValue);
  this.registerManager.setValueByAddress( regToOffsetInRegisterMemory, regFromValue )
}